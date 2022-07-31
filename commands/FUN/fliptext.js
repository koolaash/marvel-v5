const { MessageEmbed } = module.require("discord.js"),
    flip = require("flip-text");

module.exports = {
    name: "fliptext",
    aliases: ["flipt", "tflip"],
    description: "Flip some text",
    usage: "fliptext <text>",
    category: 'FUN',
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    vote: true,

    run: async (client, message, args) => {
        if (args.length < 1) {
            return require('../../function/getcmd')(client, message);
        }
        if (args.length > 500) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail}| You cannot emojify more than 500 alphabets/numbers!`,
                        color: client.embed.cf
                    })
                ]
            })
        }
        args.reverse();
        var flipped = [];

        args.forEach((arg) => {
            flipped.push(flip(arg));
        });

        message.reply(flipped.join(" "));
    },
};