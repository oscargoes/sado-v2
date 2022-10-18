const mongoose = require("mongoose");
require("dotenv/config");

// Print to log when bot is active and ready to use
module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Sado is ready! Logged in as ${client.user.tag}`);
		await mongoose.connect(
			process.env.MONGO_URI,
			{
				keepAlive: true
			}
		)
	},
};