module.exports = {
    name: "say",
    aliases: ["reply"],
    desciption: "say command",
    category: "EMBED",
    usage: "say <message>",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: [],

    async run(client, message, args) {
        msg = args.join(" ");
        if (!msg) {
            return message.reply(`${client.emoji.fail}| Where's The Messages`);
        }
        message.delete();
        return message.reply({ content: msg });
    }
};