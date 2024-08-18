#!/usr/bin/env node

import EventEmitter from 'events';
import sip from 'sip';
import digest from 'sip/digest.js';

export class Intersvyaz extends EventEmitter {
	constructor(credentials={}) {
		super();
		this.credentials = credentials;
	};
	start(options={}) {
		return this.sip.then(uri => {
			this._sip = null;
			sip.start(options, req => {
				const method = req.method.toLowerCase();
				console.log(new Date().toLocaleString(), '[intersvyaz] req', 'method', method, 'to', req.headers?.to?.uri, 'uuid', req.headers?.uuid);
				if (this._events['sip:'+method])
					this.emit('sip:'+method, { req });
				else
					sip.send(sip.makeResponse(req, 405, 'Method Not Allowed'));
			});
			if ((options.register === undefined) || options.register)
				this.register(uri, options.expires, options.keepalive);
			return { uri, sip, digest };
		});
	};
	stop() {
		if (this._sip)
			clearTimeout(this._sip);
		delete this._sip;
		sip.stop();
	};
	register(uri, expires=3600, keepalive=60, method='REGISTER') {
		this.send({
			uri, method,
			headers: method === 'REGISTER' ? { expires } : {}
		}).then(({ res, req }) => {
			const ok = true;
			this.emit('sip:register', { res, req, ok });
			return ok;
		}).catch(({ res, req, error }) => {
			const ok = false;
			this.emit('sip:register', { res, req, error, ok });
			return ok;
		}).then(ok => {
			if (this._sip !== undefined)
				this._sip = setTimeout(() => this.register(uri, expires, keepalive, (ok ? 'OPTIONS' : 'REGISTER')), keepalive * 1000);
		});
	};
	async send({ uri, method, headers={}, content='' }) {
		const tag = Math.floor(Math.random() * 1e6).toString();
		const seq = Math.floor(Math.random() * 1e5).toString();
		const req = {
			uri, method, content,
			headers: Object.assign({
				to: { uri },
				from: {
					uri,
					params: { tag }
				},
				cseq: { method, seq },
				contact: [{ uri }],
				'call-id': tag,
				'max-forwards': 70 
			}, headers)
		};
		return new Promise((resolve, reject) => {
			sip.send(req, res => {
				try {
					if (res.status === 401 && res.headers['www-authenticate'] && !headers?.authorization) {
						const credentials = sip.parseUri(uri);
						if (credentials.user && credentials.password) {
							digest.signRequest({}, req, res, credentials);
							return this.send(req).then(resolve).catch(reject);
						}
					}
					if ((res.status >= 300) || (res.status < 200))
						reject({ res, req });
					else
						resolve({ res, req });
				} catch (error) {
					reject({ res, req, error });
				}
			});
		});
	};
	get accessToken() {
		if (((this.credentials.atExpiredTime||0) > Date.now()) && this.credentials.accessToken)
			return Promise.resolve(this.credentials.accessToken);
		return fetch('https://api.is74.ru/auth/mobile', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				username: this.credentials.username,
				password: this.credentials.password
			})
		}).then(res => res.json()).then(json => {
			if (!json.TOKEN)
				throw new Error('Login failed');
			this.credentials.accessToken = json.TOKEN;
			this.credentials.atExpiredTime = new Date(json.ACCESS_END).getTime();
			this.emit('auth', this.credentials);
			return this.credentials.accessToken;
		});
	};
	get lkToken() {
		if (((this.credentials.ltExpiredTime||0) > Date.now()) && this.credentials.lkToken)
			return Promise.resolve(this.credentials.lkToken);
		return this.accessToken.then(accessToken => {
			return fetch('https://td-crm.is74.ru/api/auth-lk', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					buyerId: 1,
					token: accessToken
				})
			}).then(res => res.json()).then(json => {
				if (!json.TOKEN)
					throw new Error('Login failed');
				this.credentials.lkToken = json.TOKEN;
				this.credentials.ltExpiredTime = new Date(json.ACCESS_END).getTime();
				this.emit('auth', this.credentials);
				return this.credentials.lkToken;
			});
		});
	};
	get sip() {
		if (this.credentials.sip)
			return Promise.resolve(this.credentials.sip);
		return this.lkToken.then(lkToken => {
			return fetch('https://td-crm.is74.ru/api/sip-account', {
				headers: {
					authorization: 'Bearer '+lkToken
				}
			}).then(e => e.json()).then(json => {
				if (!json[0])
					throw new Error('Login failed');
				this.credentials.sip = `sip:${json[0].LOGIN}:${json[0].PASSWORD}@${json[0].DOMAIN}:${json[0].PORT}`;
				this.emit('auth', this.credentials);
				return this.credentials.sip;
			});
		});
	};
	toDate(string) {
		let [ day, month, yearTime ] = string.split('.');
		let [ year, time ] = yearTime.split(' ');
		let [ hours, minutes ] = time.split(':');
		return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
	};
	toParams(json, prefix='?') {
		return !json ? '' : prefix+(decodeURIComponent(new URLSearchParams(json).toString()));
	};
	async getStatus() {
		return fetch('https://api.is74.ru/user/service/status', {
			headers: {
				authorization: 'Bearer '+(await this.accessToken)
			}
		}).then(e => e.json());
	};
	async getUser() {
		return fetch('https://api.is74.ru/user/user', {
			headers: {
				authorization: 'Bearer '+(await this.accessToken)
			}
		}).then(e => e.json());
	};
	async getAddress() {
		return fetch('https://api.is74.ru/user/address', {
			headers: {
				authorization: 'Bearer '+(await this.accessToken)
			}
		}).then(e => e.json());
	};
	async getBalance() {
		return fetch('https://api.is74.ru/user/balance', {
			headers: {
				authorization: 'Bearer '+(await this.accessToken)
			}
		}).then(e => e.json());
	};
	async getDomofon(relayId) {
		return fetch('https://api.is74.ru/domofon/relays'+(relayId ? '/'+relayId : ''), {
			headers: {
				authorization: 'Bearer '+(await this.accessToken)
			}
		}).then(e => e.json()).then(json => {
			if (json.message)
				return Promise.reject({
					message: json.message,
					code: json.status
				});
			return json;
		});
	};
	async getCams(entranceUid) {
		return fetch('https://cams.is74.ru/api/limited-info-by-uuid', {
			method: 'POST',
			headers: {
				authorization: 'Bearer '+(await this.accessToken),
				'content-type': 'application/x-www-form-urlencoded'
			},
			body: 'CAMERA_UUIDS[]='+entranceUid
		}).then(e => e.json()).then(arr => {
			if (arr.error)
				throw new Error(arr.error);
			return Object.values(arr).map(json => {
				if (json.ARCHIVE?.START_TIME && json.ARCHIVE?.STOP_TIME && json.MEDIA?.HLS.ARCHIVE)
					json.MEDIA.HLS.ARCHIVE += this.toParams({
						'start-date': this.toDate(json.ARCHIVE.START_TIME).toISOString(),
						'stop-date': this.toDate(json.ARCHIVE.STOP_TIME).toISOString()
					}, '&');
				return json;
			});
		});
	};
	async openDomofon(relayId) {
		if (!relayId)
			throw new Error('relayId empty');
		return fetch('https://api.is74.ru/domofon/relays/'+relayId+'/open', {
			method: 'POST',
			headers: {
				authorization: 'Bearer '+(await this.accessToken)
			}
		}).then(e => e.json()).then(json => {
			if (json.message)
				return Promise.reject({
					message: json.message,
					code: json.status
				});
			return json;
		});
	};
	async getHistory(filter) {
		return fetch('https://td-crm.is74.ru/api/user/history'+this.toParams(filter), {
			headers: {
				authorization: 'Bearer '+(await this.lkToken)
			}
		}).then(e => e.json());
	};
};
export default Intersvyaz;
