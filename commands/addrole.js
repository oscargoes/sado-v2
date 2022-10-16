const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('Adds a role to the role handler')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption( option =>
            option.setName('channel')
            .setDescription('Channel ID to add role to')
            .setRequired(true))
        .addStringOption( option =>
            option.setName('messageid')
            .setDescription('ID of message to edit with role dropdown')
            .setRequired(true))
        .addRoleOption( option =>
            option.setName('role')
            .setDescription('Role to add')
            .setRequired(true)),
    async execute(interaction) {
        const msgchannel = interaction.options.getChannel('channel');
        const messageId = interaction.options.getString('messageid');
        const role = interaction.options.getRole('role');
        let messageToEdit = null;
        try {
            messageToEdit = await msgchannel.messages.fetch(messageId);
        } catch (error) {
            console.log(error)
            await interaction.reply({
                content: 'Incorrect channel ID or improper message ID',
                ephemeral: true
            });
            return;
        }

        if (messageToEdit.author.id !== interaction.client.user?.id) {
            await interaction.reply({
                content: `Message ID must be sent from @&${interaction.client.user?.tag}`,
                ephemeral: true
            });
        }

        let row = messageToEdit.components[0]
        if (!row) {
            row = new ActionRowBuilder();
        }

        const option = {
            label: role.name,
            value: role.id
        }

        let menu = row.components[0]
        if (menu) {
            for(const o of menu.options) {
                if (o.value === option.value) {
                    //console.log(messageToEdit.components[0].components[0])
                    await interaction.reply({
                        content: `<@&${o.value}> is already part of this menu`,
                        ephemeral: true
                    });
                    return;
                }
            }
            menu = SelectMenuBuilder.from(menu)
            menu.addOptions(option)
            menu.setMaxValues(menu.options.length)
            row.components[0] = menu;
            //console.log(menu.options.length)
            //console.log(menu)
        } else {
            row.addComponents(
                new SelectMenuBuilder()
                    .setCustomId('auto_menu_roles')
                    .setMinValues(0)
                    .setMaxValues(1)
                    .setPlaceholder('Select 1 or more roles...')
                    .addOptions(option)
            )
        }
        
        messageToEdit.edit({
            components: [row]
        })

        await interaction.reply({
            content: `Added <@&${role.id}> to roles menu`,
            allowedMentions: {
                roles: []
            },
            ephemeral: true
        });
    }
}