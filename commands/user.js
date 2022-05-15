const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("replies with user info."),
    async execute(interaction){
        await interaction.reply(`Your Tag: ${interaction.user.tag}\nYour Id: ${interaction.user.id}`)
    }
}