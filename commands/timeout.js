const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('Puts member in timeout'),
	async execute(interaction) {
        /* var member = interaction.mentions.members.first();
        if(!message.member.roles.find("name", "Admin")){
            message.channel.send("You are not able to timeout!");
            return;
        }
        member.timeout().then((member) => {
            // Successmessage
            message.channel.send("LMAOO " + member.displayName + " is in timeout");
        }).catch(() => {
            // Failmessage
            message.channel.send("Access Denied");
        }); */
	}
};