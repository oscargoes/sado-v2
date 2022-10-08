// Slash command interaction handler
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;
        // Fetch command called
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return;
        // If no error, execute command
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ 
                content: 'There was an error while executing this command!', 
                ephemeral: true });
        }
	},
};