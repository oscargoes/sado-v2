const { 
    SlashCommandBuilder, 
    EmbedBuilder, 
    AttachmentBuilder 
} = require("discord.js");
const User = require("../schemas/user");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Displays the servers xp leaderboard"),
    async execute(interaction) {

        let text = "";

        const embed = new EmbedBuilder()
        .setColor("Random")
        .setDescription("No one has made it on the leaderboard yet");

        let userProfile = await User.find({ guildId: interaction.guild.id })
        .sort({
            xp: -1,
            level: -1
        })
        .limit(10);
        
        if (!userProfile) {
            return await interaction.reply({ embeds: [embed]} );
        }

        await interaction.deferReply();

        for (let counter = 0; counter < userProfile.length; ++counter) {
            let { userId, xp, level } = userProfile[counter];

            const value = await interaction.client.users.fetch(userId) || "Unkown Member";

            const member = value.tag;

            text += `${counter + 1}. ${member} | Total XP: ${xp} | Level: ${level} \n`;

            const embedLB = new EmbedBuilder()
            .setTitle(`${interaction.guild.name}'s Leaderboard:`)
            .setDescription(`\`\`\`${text}\`\`\``)
            .setTimestamp()
            .setFooter({ text: "XP Leaderboard" });

            interaction.editReply({ embeds: [embedLB] });
        }
    }
}