module.exports = async function(RED) {
	const { Intersvyaz } = await import('../main.mjs');
	function Config(config) {
		RED.nodes.createNode(this, config);
		this.getClient = async function() {
			const client = new Intersvyaz(this.credentials);
			client.on('auth', credentials => RED.nodes.addCredentials(this.id, credentials));
			return client;
		};
	};
	RED.nodes.registerType('intersvyaz-config', Config, {
		credentials: {
			username: { type: 'text' },
			password: { type: 'password' },
			sip: { type: 'password' },
			accessToken: { type: 'password' },
			lkToken: { type: 'password' },
			atExpiredTime: { type: 'text' },
			ltExpiredTime: { type: 'text' }
		}
	});
}
