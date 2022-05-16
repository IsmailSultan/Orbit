// const { json } = require('body-parser');
const https = require('https');
const pl = require("pluralize")

exports.run = async(bot, message, args) => {
    const apiUrl = "https://api.otakugifs.xyz/gif?reaction="
    const ImageUrl = `${apiUrl}${args[0]}`

    https.get(ImageUrl, (response) => {
        response.on("data", (data) => {
            const image = JSON.parse(data)
            // const mentionId = args[1].replace(/[\\<>@#&!]/g, "")
            const user = message.mentions.users.first()
            if(user === undefined){
                const gifEmbed = {
                    color: '#000000',
                    author: {
                        name: `Orbit ${pl(args[0])} you!`,
                        icon_url: message.author.avatarURL(),
                        url: image.url,
                    },
                    image: {url:image.url}
                }
                message.channel.send({embeds: [gifEmbed]})
            }else{
                const gifEmbed = {
                    color: '#000000',
                    author: {
                        name: `${message.author.username} ${pl(args[0])} ${user.username}!`,
                        icon_url: message.author.avatarURL(),
                        url: image.url,
                    },
                    image: {url:image.url}
                }
                message.channel.send({embeds: [gifEmbed]})
            }
            
        })
    })
}

exports.help = {
    name:"gif",
    description: "This command can fetch anime gifs for the following topics : airkiss, angrystare, bite, bleh, blush, brofist, celebrate, cheers, clap, confused, cool, cry, cuddle, dance, drool, evillaugh, facepalm, handhold, happy, headbang, hug, kiss, laugh, lick, love, mad, nervous, no, nom, nosebleed, nuzzle, pat, peek, pinch, poke, pout, punch, roll, run, sad, scared, shrug, shy, sigh, sip, slap, sleep, slowclap, smack, smile, smug, sneeze, sorry, stare, stop, surprised, sweat, thumbsup, tickle, tired, wave, wink, woah, yawn, yay, yes."
}