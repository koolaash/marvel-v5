module.exports = {
    name: "reply",
    //  aliases: [""],
    description: "reply command",
    category: "EMBED",
    usage: "reply <message>",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: [],

    async run(client, message, args) {
        msg = args.join(" ");
        if (!msg) {
            return message.reply(`${client.emoji.fail}| Where's The Messages`);
        }
        let m = await message.channel.messages.fetch(message.reference.messageID).catch(() => null)
        if (!m) return message.reply("You need to reply to a message while using this command!")
        message.delete();
        return m.reply({ content: msg });
    }
};