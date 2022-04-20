const { MessageEmbed } = require("discord.js"),
    { wordTrans, letterTrans } = require("custom-translate");

module.exports = {
    name: "font",
    description: "show help menu",
    category: "FONTS",
    usage: "font <type> <text>",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    vote: true,

    async run(client, message, args) {

        let mer = args.join(" "),
            arg = mer.toLowerCase().split(/ +/g);

        let miss = new MessageEmbed({
            description: 'Provide a message to convert first!',
            color: client.embed.cf
        })
        if (!args[0]) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: "Valid options are \n" +
                            "boldfancy(bf), bolditalic(bi), circle1(c1), circle2(c2), comic, " +
                            "double, italic, script, smallcaps(sc), ss, style," +
                            " stylebold(sb), typewriter(type)",
                        color: client.embed.cf
                    })
                ]
            });
        }
        if (arg[0] === "boldfancy" || arg[0] === "bf") {
            if (!args[1]) {
                return message.reply({ embeds: [miss] });
            }
            const abc = require("../../fonts/boldfancy.json");

            function fancy(text) {
                return letterTrans(text, abc);
            }

            let converted = fancy(args.slice(1).join(" "));
            return message.reply(converted);
        } else if (arg[0] === "italic") {
            if (!args[1]) {
                return message.reply({ embeds: [miss] });
            }
            const abc = require("../../fonts/italic.json");

            function fancy(text) {
                return letterTrans(text, abc);
            }

            let converted = fancy(args.slice(1).join(" "));
            return message.reply(converted);
        } else if (arg[0] === "bolditalic" || arg[0] === "bi") {
            if (!args[1]) {
                return message.reply({ embeds: [miss] });
            }
            const abc = require("../../fonts/bolditalic.json");

            function fancy(text) {
                return letterTrans(text, abc);
            }

            let converted = fancy(args.slice(1).join(" "));
            return message.reply(converted);
        } else if (arg[0] === "circle1" || arg[0] === "c1") {
            if (!args[1]) {
                return message.reply({ embeds: [miss] });
            }
            const abc = require("../../fonts/circle1.json");

            function fancy(text) {
                return letterTrans(text, abc);
            }

            let converted = fancy(args.slice(1).join(" "));
            return message.reply(converted);
        } else if (arg[0] === "circle2" || arg[0] === "c2") {
            if (!args[1]) {
                return message.reply({ embeds: [miss] });
            }
            const abc = require("../../fonts/circle2.json");

            function fancy(text) {
                return letterTrans(text, abc);
            }

            let converted = fancy(args.slice(1).join(" "));
            return message.reply(converted);
        } else if (arg[0] === "comic") {
            if (!args[1]) {
                return message.reply({ embeds: [miss] });
            }
            const abc = require("../../fonts/comic.json");

            function fancy(text) {
                return letterTrans(text, abc);
            }

            let converted = fancy(args.slice(1).join(" "));
            return message.reply(converted);
        } else if (arg[0] === "double") {
            if (!args[1]) {
                return message.reply({ embeds: [miss] });
            }
            const abc = require("../../fonts/double.json");

            function fancy(text) {
                return letterTrans(text, abc);
            }

            let converted = fancy(args.slice(1).join(" "));
            return message.reply(converted);
        } else if (arg[0] === "script") {
            if (!args[1]) {
                return message.reply({ embeds: [miss] });
            }
            const abc = require("../../fonts/script.json");

            function fancy(text) {
                return letterTrans(text, abc);
            }

            let converted = fancy(args.slice(1).join(" "));
            return message.reply(converted);
        } else if (arg[0] === "samllcaps" || arg[0] === "sc") {
            if (!args[1]) {
                return message.reply({ embeds: [miss] });
            }
            const abc = require("../../fonts/smallcaps.json");

            function fancy(text) {
                return letterTrans(text, abc);
            }

            let converted = fancy(args.slice(1).join(" "));
            return message.reply(converted);
        } else if (arg[0] === "ss" || arg[0] === "superscript") {
            if (!args[1]) {
                return message.reply({ embeds: [miss] });
            }
            const abc = require("../../fonts/ss.json");

            function fancy(text) {
                return letterTrans(text, abc);
            }

            let converted = fancy(args.slice(1).join(" "));
            return message.reply(converted);
        } else if (arg[0] === "stylebold" || arg[0] === "sb") {
            if (!args[1]) {
                return message.reply({ embeds: [miss] });
            }
            const abc = require("../../fonts/stylebold.json");

            function fancy(text) {
                return letterTrans(text, abc);
            }

            let converted = fancy(args.slice(1).join(" "));
            return message.reply(converted);
        } else if (arg[0] === "style") {
            if (!args[1]) {
                return message.reply({ embeds: [miss] });
            }
            const abc = require("../../fonts/style.json");

            function fancy(text) {
                return letterTrans(text, abc);
            }

            let converted = fancy(args.slice(1).join(" "));
            return message.reply(converted);
        } else if (arg[0] === "typewriter" || arg[0] === "type") {
            if (!args[1]) {
                return message.reply({ embeds: [miss] });
            }
            const abc = require("../../fonts/typewriter.json");

            function fancy(text) {
                return letterTrans(text, abc);
            }

            let converted = fancy(args.slice(1).join(" "));
            return message.reply(converted);
        } else {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: "Valid options are \n" +
                            "boldfancy(bf), bolditalic(bi), circle1(c1), circle2(c2), comic, " +
                            "double, italic, script, smallcaps(sc), ss, style," +
                            " stylebold(sb), typewriter(type)",
                        color: client.embed.cf
                    })
                ]
            });
        }
    }
}