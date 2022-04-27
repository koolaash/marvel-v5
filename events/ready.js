module.exports.run = async (client) => {
    console.log(`[APPLICATION] => ${client.user.tag} IS READY TO BE USED`.yellow)
    client.noprefix = await client.qdb.get(`noprefix.mem`)
    client.partner = await client.qdb.get(`partner.mem`)
}