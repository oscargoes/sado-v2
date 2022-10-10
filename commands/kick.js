const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kicks a person')
        .addUserOption(option =>
            option.setName('member').setDescription('The member to kick'))
        .addStringOption(option =>
            option.setName('reason').setDescription('The reason to kick')
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
	async execute(interaction) {
        const member = interaction.options.getUser('member');
        const reason = interaction.options.getString('reason');
        member.kick(reason)
            .then(console.log)
            .catch(console.error);
        await interaction.reply('LMAOOO ' + member + ' has been kicked!');
	},
};