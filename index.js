// Imports
const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  GatewayIntentBits,
  Collection,
  Partials,
} = require("discord.js");
require("dotenv/config");
const { mongoose, connection } = require("mongoose");
//const { connect } = require("node:http2");


// Client set-up
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  // partials: [
  // 	Partials.Channel,
  // 	Partials.Message,
  // 	Partials.MessageContent,
  // ]
});

// Gather available commands within a collection map
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item with command name as key and command file as value
  client.commands.set(command.data.name, command);
}

// Gather available events and initialize them
const eventsPath = path.join(__dirname, "events");
const eventFolders = fs.readdirSync(`${eventsPath}`);
for (const folder of eventFolders) {
  const eventFiles = fs
    .readdirSync(`${eventsPath}/${folder}`)
    .filter((file) => file.endsWith(".js"));
  switch (folder) {
    case "client":
      for (const file of eventFiles) {
        //const filePath = path.join(eventsPath, file);
        const event = require(`${eventsPath}/${folder}/${file}`);
        if (event.once) {
          client.once(event.name, (...args) => event.execute(...args));
        } else {
          client.on(event.name, (...args) => event.execute(...args));
        }
      }
      break;
      
    case "mongo":
      for (const file of eventFiles) {
        const event = require(`${eventsPath}/${folder}/${file}`);
        if (event.once) {
          connection.once(event.name, (...args) => event.execute(...args));
        } else {
          connection.on(event.name, (...args) => event.execute(...args));
        }
      }
      break;

    default:
      break;
  } 
}

// Client login
client.login(process.env.TOKEN);
(async () => {
  await mongoose.connect(process.env.MONGO_URI).catch(console.error);
})();

