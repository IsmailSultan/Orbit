
const fs = require('node:fs');
const path = require('node:path');

const { Client, Intents, Interaction } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

const commands = []
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const FilePath = path.join(commandsPath, file)
    const command = require(FilePath)

    commands.push(command.data.toJSON())
}

for (const file of commandFiles) {
    const FilePath = path.join(eventsPath, file)
    const event = require(FilePath)
    if(event.once){
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}

client.once('ready', () => {
	console.log('Ready!') 
}) 

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return 

	const command = client.command.get(interaction.commandName)
    
    if(!command) return

    try {
        await command.execute(interaction)
    } catch(error) {
        console.error(error)
        await interaction.reply({content: "there was an error while executing this command", ephemeral: true})
    }
})

client.login(token) 