const {
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("send")
    .setDescription("Sends a message to edit for role handling")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Channel ID to print to")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("text").setDescription("Text to print").setRequired(true)
    ),
  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");
    const text = interaction.options.getString("text");
    channel
      .send(text)
      .then(console.log({ channel, text }))
      .catch(console.error);

    await interaction.reply({
      content: "Message sent",
      ephemeral: true,
    });
  },
};
