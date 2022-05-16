
const { channel } = require("diagnostics_channel");
const fs = require("fs");
const { slice } = require("lodash");
const _ = require('lodash');
exports.run = async(bot, message, args) => {
    // console.log(args.length)
    const fieldArray = []
    
    // message.channel.send({embeds: [helpEmbed]})
    const commandFiles = fs.readdirSync('./commands/').filter(f => f.endsWith('.js'))
    // // console.log(commandFiles)
    if(args.length === 0){
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
    }else{
        var found = false
        for (const file of commandFiles) {
            // console.log(`${file} loaded`)
            
            if(_.lowerCase(file.slice(0,-3)) === _.lowerCase(args[0])){
                var props = require(__dirname+`\\${file}`)
                let helpEmbed = {
                    author: {
                        name: `${message.author.username}`,
                        icon_url: message.author.avatarURL(),
                        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    fields: [
                        {
                            name : "Title",
                            value : props.help.name
                        },
                        {
                            name : "Description",
                            value : props.help.description
                        },
                        {
                            name : "Syntax",
                            value : `Usage Syntax: ${props.help.syntax}`
                        }
                    ]
                }
                // console.log(helpEmbed)
                message.channel.send({embeds: [helpEmbed]})
                var found = true
                break
            }else{
                continue
            }
        }
        if (found===false) {
            errorEmbed = {
                title : "Error 404",
                description : "Command Not Found",
                author: {
                    name: `${message.author.username}`,
                    icon_url: message.author.avatarURL(),
                    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                }
            }
            message.channel.send({embeds:[errorEmbed]})
        }
    }
    
}

exports.help = {
    name:"help",
    description:"a help command.",
    syntax: "<required> [optional]"
}