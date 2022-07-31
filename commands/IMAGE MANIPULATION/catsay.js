const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "catsay",
    // aliases: [],
    category: "Fun",
    usage: "catsay <text>",
    description: "Returns provided text in ascii format.",
    userPermissions: [],
    botPermissions: ["ATTACH_FILES"],

    run: async (client, message, args) => {
        const msg = args.join(" ");
        if (!msg) {
            return require('../../function/getcmd')(client, message);
        }
        let im = `https://cataas.com/cat/cute/says/${msg}`;
        message.channel.sendTyping();
        message.channel.send({
            files: [
                {
                    attachment: im,
                    name: "catsay.png",
                },
            ]
        });
    }
}