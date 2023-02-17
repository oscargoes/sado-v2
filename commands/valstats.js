const { 
    SlashCommandBuilder, 
    EmbedBuilder, 
    AttachmentBuilder 
} = require("discord.js");
const { execute } = require("./rank");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("val-stats")
    .setDescription("Displays a users Valorant stats")
    .addSubcommand(subcommand =>
        subcommand
            .setName("User Option")
            .setDescription("Valorant stats of a user")
            .addUserOption((option) =>
                option
                    .setName("user")
                    .setDescription("Get stats of user")
                    .setRequired(true)
            ))
    .addSubcommand(subcommand =>
        subcommand
            .setName("IGN + tag Option")
            .setDescription("Valorant stats of a player")
            .addStringOption((option) =>
                option
                    .setName("name")
                    .setDescription("Users ign")
                    .setRequired(true)
            )
            .addStringOption((option) =>
                option
                    .setName("tag")
                    .setDescription("Users tag without the #")
                    .setRequired(true)
            )),
    async execute(interaction) {

    }
}