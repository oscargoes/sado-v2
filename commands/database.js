const Guild = require("../schemas/guild");
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("database")
    .setDescription("Returns server info from bot database")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    let guildProfile = await Guild.findOne({ guildID: interaction.guild.id });
    if (!guildProfile) {
      guildProfile = await new Guild({
        _id: mongoose.Types.ObjectId(),
        guildId: interaction.guild.id,
        guildName: interaction.guild.name,
        guildMemberCount: interaction.guild.memberCount,
      });

      await guildProfile.save().catch(console.error);
      await interaction.reply({
        content: "Server ID, name, and member count have been saved",
      });
      console.log(guildProfile);
    } else {
      await interaction.reply({
        content: `Server Name: ${guildProfile.guildName}\nServer ID: ${guildProfile.guildId}`,
      });
      console.log(guildProfile);
    }
  },
};
