module.exports = function(RED) {
	function Cams(config) {
		RED.nodes.createNode(this, config);
		const settings = RED.nodes.getNode(config.settings);
		this.on('input', msg => {
			const entranceUids = RED.util.evaluateNodeProperty(config.entranceUids, config.entranceType, this, msg);
			const topic = RED.util.evaluateNodeProperty(config.topic, config.topicType, this, msg);
			settings.getClient().then(client => client.getCams(entranceUids))
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
	RED.nodes.registerType('intersvyaz-cams', Cams);
}
