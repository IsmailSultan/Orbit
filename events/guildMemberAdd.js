module.exports = {
    name: 'guildMemberAdd',
    execute(member, bot) {
        //Log the newly joined member to console
        console.log('User ' + member.user.tag + ' has joined the server!');

        //Find a channel named welcome and send a Welcome message
        const Channel = member.guild.channels.cache.find(c => c.id === '975309613308190720')
        const Embed = {
            title: "You have been summoned to the world of Irguendo.",
            description: `Welcome ${member}, to the world of Irguendo. Great adventures await you, but before that read the rules in the rules channel and get the react roles. Also check the booster perks, to see if you be interested in supporting the server. Hope you have a lot of fun and get along well with everyone in here. Come say Hi in general.`,
            thumbnail: {
                url: "https://images-ext-2.discordapp.net/external/2ulPelc6EcPVZCdLkbv5KNhyGhi1PDang6QysEaoK20/https/cdn-longterm.mee6.xyz/plugins/commands/images/876732508107046934/c2bd336afacadfdb94dafce9fee26819de3787df2392de58486dd37550e1a6d7.jpeg?width=885&height=498"
            }

        }
        Channel.send({embeds: [Embed]})
        // member.guild.channels.cache.find(c => c.name === "welcome").channel.send('Welcome '+ member.user.username)
    }
}