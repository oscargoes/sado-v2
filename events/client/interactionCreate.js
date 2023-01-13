//const { GuildMember } = require("discord.js");

// Interaction handler
module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    // Select menu interactions handler
    if (interaction.isSelectMenu()) {
      const customID = interaction.customId;
      const values = interaction.values;
      const member = interaction.member;

      if (customID === "auto_menu_roles") {
        const component = interaction.component;
        const removed = component.options.filter((option) => {
          return !values.includes(option.value);
        });

        for (const id of removed) {
          member.roles.remove(id.value);
        }

        for (const id of values) {
          member.roles.add(id);
        }

        await interaction.reply({
          content: "Roles updated!",
          ephemeral: true,
        });
      }
    }

    // Slash command handler
    if (interaction.isChatInputCommand()){
      // Fetch command called
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;
      // If no error, execute command
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    } 
    
    return;
  },
};
