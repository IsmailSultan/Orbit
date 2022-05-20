const { token } = require("./config.json");
const dp = require('discord-prefix')

// const mongoose = require("mongoose")
// const {itemsSchema,Item} = require("./db")

const guild_id = "876732508107046934"
const { Client, Intents, Collection } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MEMBERS] });

const fs = require("fs");

// const MONGODB_URI = "mongodb://localhost/orbitDB"
// const options = {
//     family: 4 // Use IPv4, skip trying IPv6
// }
// var prefix;

// mongoose.connect(MONGODB_URI,options)
// Item.findOne({name : "prefix"}, (err,doc) => {
//     prefix = doc.value
//     // console.log(prefix)
// })
dp.setPrefix("!", guild_id)
console.log(dp.getPrefix(guild_id))


bot.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(f => f.endsWith('.js'))
for (const file of commandFiles) {
    const props = require(`./commands/${file}`)
    console.log(`${file} loaded`)
    bot.commands.set(props.help.name, props)
}

const commandSubFolders = fs.readdirSync('./commands/').filter(f => !f.endsWith('.js'))
commandSubFolders.forEach(folder => {
    const commandFiles = fs.readdirSync(`./commands/${folder}/`).filter(f => f.endsWith('.js'))
    for (const file of commandFiles) {
        const props = require(`./commands/${folder}/${file}`)
        console.log(`${file} loaded from ${folder}`)
        bot.commands.set(props.help.name, props)
    }
});

// Load Event files from events folder
const eventFiles = fs.readdirSync('./events/').filter(f => f.endsWith('.js'))

for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if(event.once) {
        bot.once(event.name, (...args) => event.execute(...args, bot))
    } else {
        bot.on(event.name, (...args) => event.execute(...args, bot))
    }
}

//Command Manager
bot.on("messageCreate", async message => {
    //Check if author is a bot or the message was sent in dms and return
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    //get prefix from config and prepare message so it can be read as a command
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    //Check for prefix
    if(!cmd.startsWith(dp.getPrefix())) return;

    //Get the command from the commands collection and then if the command is found run the command file
    let commandfile = bot.commands.get(cmd.slice(dp.getPrefix(guild_id).length));
    if(commandfile) commandfile.run(bot,message,args);

});

//Token needed in config.json
bot.login(token);
