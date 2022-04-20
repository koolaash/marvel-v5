const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "catsay",
    // aliases: [],
    category: "Fun",
    usage: "ascii <text>",
    description: "Returns provided text in ascii format.",
    userPermissions: [],
    botPermissions: ["ATTACH_FILES"],

    run: async (client, message, args) => {
        const msg = args.join(" ");
        if (!msg) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: client.emoji.fail + "What you want the cat to say?",
                        color: client.embed.cf
                    })
                ]
            });
        }
        let im = `https://cataas.com/cat/cute/says/${msg}`;
        message.channel.sendTyping();
        message.reply({
            files: [
                {
                    attachment: im,
                    name: "catsay.png",
                },
            ]
        });
    }
}