const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('Timeouts a person')
        .addUserOption(option =>
            option.setName('member').setDescription('The member to timeout'))
        .addStringOption(option =>
            option.setName('reason').setDescription('The reason to kick')
        )
        .addIntegerOption(option =>
            option.setName('time').setDescription('Time for the timeout in minutes')    
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
	async execute(interaction) {
        const member = interaction.options.getUser('member');
        const reason = interaction.options.getString('reason');
        const time = interaction.options.getInteger('time');
        member.kick(time * 60 * 1000,reason)
            .then(console.log)
            .catch(console.error);
        await interaction.reply('LMAOOO ' + member + ' has been kicked!');
	},
};