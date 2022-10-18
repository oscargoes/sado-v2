const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Puts member in timeout")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((option) =>
      option.setName("user").setDescription("User to timeout").setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("Duration of timeout in minutes")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for timeout")
        .setRequired(true)
    ),
  async execute(interaction) {
    const target = interaction.options.getMember("user");
    const time = interaction.options.getInteger("time");
    const reason = interaction.options.getString("reason");
    if (!target.manageable) {
      await interaction.reply({
        content: "You are unable to timeout that person",
        ephemeral: true,
      });
      return;
    }

    await interaction.reply({
      content: `LMAO <@${target.id}> is in timeout for ${time} minute(s).\nReason: ${reason}`,
    });

    target.timeout(time * 60000, reason);

    await interaction.folowUp({
      content: `You successfully put <@${target.id}> in timeout`,
      ephemeral: true,
    });
  },
};
