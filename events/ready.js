module.exports = {
    name: 'ready',
    once: true,
    execute(client){
        console.log(`Ready! logged in as ${client.user.tag}`)
    }
}