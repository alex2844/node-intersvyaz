module.exports = function(RED) {
	function Domofon(config) {
		RED.nodes.createNode(this, config);
		const settings = RED.nodes.getNode(config.settings);
		this.on('input', msg => {
			const relayId = RED.util.evaluateNodeProperty(config.relayId, config.relayType, this, msg);
			const open = RED.util.evaluateNodeProperty(config.open, config.openType, this, msg);
			const topic = RED.util.evaluateNodeProperty(config.topic, config.topicType, this, msg);
			settings.getClient().then(client => {
				if ((topic === 'open') || open)
					return client.openDomofon(relayId);
				else if (topic === 'list')
					return client.getDomofon();
				else
					return client.getDomofon(relayId);
			})
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
	RED.nodes.registerType('intersvyaz-domofon', Domofon);
}
