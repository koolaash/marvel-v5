const { MessageEmbed } = require("discord.js"),
    { RandomPHUB } = require('discord-phub'),
    nsfw = new RandomPHUB(unique = true),
    nam = 'phub';

module.exports = {
    name: nam,
    category: "PORN HUB",
    description: `Sends nsfw from pornhub`,
    usage: `${nam} <category> <format_type> ex : phub amateur mp4`,
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {

        if (!message.channel.nsfw) {
            return message.reply(`${client.emoji.fail}| This channel dosen't support nsfw content`);
        }

        let mer = args.join(" "),
            arg = mer.toLowerCase().split(/ +/g);

        if (!arg[0]) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail}| Valid categories are : 3d-porn, aesthetic, amateur, anal, asian, asmr, ` +
                            `\nass, bath-shower, bdsm, boobscock, cosplay, creampie, ` +
                            `\ncuckhold, cumshots, dilf, double-penetration, ` +
                            `\nebony, feet, femdom, fisting, food-play, funny, ` +
                            `\nfurry, glory-hole, goth, hands, hentai-no-loli, hentai, horror, ` +
                            `\ninterracial, joi, lactation, latin, lgbt-bisexual, ` +
                            `\nlgbt-femboy, lgbt-gay, lgbt-lesbian, lgbt-transgender, lgbt-twink, ` +
                            `\nlingerie, massage, mature, milf, naked-wrestling, oral, orgy, pegging, ` +
                            `\npetite, plus-size, pornstar, pov, public, pussy, rimming, rough, ` +
                            `\nsolo, squirting, tattoos-piercings, tease, thighs, threesomes, toys, uniform, ` +
                            `\nvintage, watersports`,
                        color: client.embed.cf
                    })
                ]
            })
        }
        if (!arg[1]) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail}| Valid formats are : jpeg, jpg, png, gif, mp4`,
                        color: client.embed.cf
                    })
                ]
            })
        }

        try {
            const img = nsfw.getRandomInCategory(args[0], args[1])
            return message.reply(img.url)
        } catch (e) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail}| ${e}`,
                        color: client.embed.cf
                    })
                ]
            })
        }
    }
};