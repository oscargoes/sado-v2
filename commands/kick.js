const { SlashCommandBuilder } = require('discord.js');
var member = message.mentions.members.first();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick' + member)
		.setDescription('Kicks a person'),
	async execute(interaction) {
        if(!message.member.roles.find("name", "Admin"))
            return;
        member.kick().then((member) => {
            // Successmessage
            message.channel.send(":wave: " + member.displayName + " has been successfully kicked :point_right: ");
        }).catch(() => {
            // Failmessage
            message.channel.send("Access Denied");
        });
	},
};