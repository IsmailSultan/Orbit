
const fs = require("fs");
const { slice } = require("lodash");
const _ = require('lodash');
exports.run = async(bot, message, args) => {
    const fieldArray = []
    
    // message.channel.send({embeds: [helpEmbed]})
    const commandFiles = fs.readdirSync('./commands/').filter(f => f.endsWith('.js'))
    console.log(commandFiles)
    for (const file of commandFiles) {
        const props = require(__dirname+`\\${file}`)
        // console.log(`${file} loaded`)
        if(_.size(props.help.description)>50){var desc = props.help.description.slice(0, 52)}else{var desc = props.help.description}
        let arrayAppend = {name:props.help.name, value:desc}
        fieldArray.push(arrayAppend)
    }
    let helpEmbed = {
        title: "Help",
        color: "#000000",
        author: {
            name: `${message.author.username}`,
            icon_url: message.author.avatarURL(),
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
        fields : fieldArray
    }
    message.channel.send({embeds: [helpEmbed]})
    
}

exports.help = {
    name:"help",
    description:"a help command."
}