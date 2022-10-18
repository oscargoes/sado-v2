const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

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
            return;
        }

        await interaction.reply({
            content: `LMAO <@${target.id}> is getting kicked from Unswallowed Committee in 10 seconds.\nReason: ${reason}`
        });

        await wait(10000);

        await interaction.followUp({
            content: `Adios <@${target.id}>`
        });
        
        target.kick(reason);

        await interaction.followUp({
            content: `You successfully kicked <@${target.id}>`,
            ephemeral: true
        });
	}
};