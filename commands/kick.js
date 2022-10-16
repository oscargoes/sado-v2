const { SlashCommandBuilder, PermissionFlagsBits, GuildMember } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kicks a person')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption( option =>
            option.setName('user')
            .setDescription('User to kick')
            .setRequired(true))
        .addStringOption( option =>
            option.setName('reason')
            .setDescription('Reason for kick')
            .setRequired(true)),
	async execute(interaction) {
        const target = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');
        if (!target.kickable) {
            await interaction.reply({
                content: 'You are unable to kick that person',
                ephemeral: true
            });
        }
        target.send(reason);
        target.kick(reason);

        await interaction.reply({
            content: `You successfully kicked <@${target.id}>`,
            ephemeral: true
        });
	}
};