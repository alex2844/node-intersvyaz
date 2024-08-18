module.exports = function(RED) {
	function Invite(config) {
		RED.nodes.createNode(this, config);
		const settings = RED.nodes.getNode(config.settings);
		this.status({
			fill: 'yellow',
			shape: 'ring',
			text: 'Connecting...'
		});
		settings.getClient().then(client => {
			client.start().then(({ sip }) => {
				let uuid;
				client.on('sip:invite', ({ req }) => {
					if (uuid != req.headers.uuid) {
						uuid = req.headers.uuid;
						this.send({ payload: req });
					}
					sip.send(sip.makeResponse(req, 180, 'Ringing'));
					sip.send(sip.makeResponse(req, 486, 'Busy Here'));
				});
				client.on('sip:register', ({ res, error, ok }) => {
					console.log(new Date().toLocaleString(), '[intersvyaz] req', 'method', res?.headers?.cseq?.method, ok);
					if (ok)
						this.status({
							fill: 'green',
							shape: 'dot',
							text: 'Connected'
						});
					else
						this.status({
							fill: 'red',
							shape: 'ring',
							text: `Connection error: ${error || res.reason}`,
						});
				});
				this.on('close', async (removed, done) => {
					this.status({
						fill: 'red',
						shape: 'ring',
						text: 'Disconnected'
					});
					client.stop();
					done();
				});
			});
		});
	};
	RED.nodes.registerType('intersvyaz-invite', Invite);
}
