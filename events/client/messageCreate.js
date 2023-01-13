const User = require("../../schemas/user");
const mongoose = require("mongoose");
const { EmbedBuilder } = require("discord.js");

// Message handler
module.exports = {
    name: "messageCreate",
    async execute(message) {
        //const { guild, author } = message;

        if (!message.guild || message.author.bot) return;

        let userProfile = await User.findOne({ guildId: message.guild.id, userId: message.author.id });
        if (!userProfile) {
            userProfile = await new User({
                _id: mongoose.Types.ObjectId(),
                guildId: message.guild.id,
                userId: message.author.id,
                xp: 0,
                level: 1,
            });

            await userProfile.save().catch(console.error);
            console.log(userProfile);
        } else {
            const newxp = userProfile.xp + Math.floor(Math.random() * 75) + 25;
            userProfile.xp = newxp;
            await userProfile.save().catch(console.error);
            if (newxp >= (1000 * userProfile.level) + Math.floor(Math.pow(1.2, userProfile.level))) {
                userProfile.level += 1;
                await userProfile.save().catch(console.error);
                if (!message.channel) return;

                const embed = new EmbedBuilder()
                .setColor("Random")
                .setDescription(`${message.author} has reached level ${userProfile.level}!`);

                message.channel.send({ embeds: [embed] });
            }
            console.log(userProfile);
        }
    },
};