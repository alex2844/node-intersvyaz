module.exports = function(RED) {
	function Balance(config) {
		RED.nodes.createNode(this, config);
		const settings = RED.nodes.getNode(config.settings);
		this.on('input', msg => {
			settings.getClient().then(client => client.getBalance())
			.then(payload => {
				msg.payload = payload;
				this.send(msg);
			})
			.catch(({ message, code }) => {
				msg.code = code;
				msg.payload = message;
				this.error(message, msg);
			});
		});
	};
	RED.nodes.registerType('intersvyaz-balance', Balance);
}
