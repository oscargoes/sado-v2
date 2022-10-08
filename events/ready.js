// Print to log when bot is active and ready to use
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Sado is ready! Logged in as ${client.user.tag}`);
	},
};