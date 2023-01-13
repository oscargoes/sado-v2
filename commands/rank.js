const { 
    SlashCommandBuilder, 
    EmbedBuilder, 
    AttachmentBuilder 
} = require("discord.js");
const User = require("../schemas/user");
const Canvacord = require("canvacord");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Displays a user's rank")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to check the rank of").setRequired(false)
    ),
    async execute(interaction) {
        const target = interaction.options.getMember("user") || interaction.member;

        const userProfile = await User.findOne({ guildId: interaction.guild.id, userId: target.id });

        const embed = new EmbedBuilder()
        .setColor("Random")
        .setDescription(`:x: ${target} has not gained any XP yet on this server`);

        if (!userProfile) {
            return await interaction.reply({ embeds: [embed] });
        }

        await interaction.deferReply();

        const nextRankXP = ((1000 * userProfile.level) + Math.floor(Math.pow(1.2, userProfile.level))) -
        ((1000 * (userProfile.level - 1)) + Math.floor(Math.pow(1.2, (userProfile.level - 1))));
        const reqXP = nextRankXP - userProfile.xp;

        const rank = new Canvacord.Rank()
        .setAvatar(target.displayAvatarURL({ forceStatic: true }))
        .setCurrentXP(userProfile.xp - ((1000 * (userProfile.level - 1)) + Math.floor(Math.pow(1.2, (userProfile.level - 1)))) + 1)
        .setRequiredXP(nextRankXP)
        .setRank(1, "Rank", false)
        .setLevel(userProfile.level, "Level")
        .setUsername(target.user.username)
        .setDiscriminator(target.user.discriminator);

        const card = await rank.build();

        const attachment = new AttachmentBuilder(card, { name: "rank.png" });

        const embed2 = new EmbedBuilder()
        .setColor("Random")
        .setTitle(`${target.user.username}'s Level and Progress`)
        .setImage("attachment://rank.png");

        await interaction.editReply({ embeds: [embed2], files: [attachment] });
    }
}