module.exports = function(RED) {
	function IPTV(config) {
		RED.nodes.createNode(this, config);
		const settings = RED.nodes.getNode(config.settings);
		this.on('input', msg => {
			const filter = RED.util.evaluateNodeProperty(config.filter, config.filterType, this, msg);
			const format = RED.util.evaluateNodeProperty(config.format, config.formatType, this, msg);
			const topic = RED.util.evaluateNodeProperty(config.topic, config.topicType, this, msg);
			settings.getClient().then(client => client.getIPTV(filter, format))
			.then(payload => {
				msg.topic = topic;
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
	RED.nodes.registerType('intersvyaz-iptv', IPTV);
}
