module.exports.run = async (client) => {
    console.log(`${client.user.tag} Ready!`.yellow)
    client.noprefix = await client.qdb.get(`noprefix.mems${message.guild.id}`)
}