const { MessageEmbed } = require("discord.js"),
    { parse } = require("twemoji-parser"),
    discord = require("discord.js");

module.exports = {
    name: "steal",
    aliases: ["addemoji"],
    description: "adds any emoji into the server you want",
    category: "MODERATION",
    usage: "steal <emoji>",
    userPermissions: ["MANAGE_EMOJIS"],
    botPermissions: ["EMBED_LINKS", "MANAGE_EMOJIS"],

    async run(client, message, args) {

        if (!args[0]) {
            return require('../../function/getcmd')(client, message);
        }
        const emoji = args[0];
        let customemoji = discord.Util.parseEmoji(emoji);

        if (customemoji.id) {
            const Link =
                `https://cdn.discordapp.com/emojis/${customemoji.id}.${customemoji.animated ? "gif" : "png"}`,
                name = args.slice(1).join(" ");
            try {
                message.reply("Please wait...").then(m => setTimeout(() => m.delete().catch(() => null), 2500));
                await message.guild.emojis.create(
                    `${Link}`,
                    `${name || customemoji.name}`
                )
            } catch (e) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cf,
                            description: `${client.emoji.fail}| ${e.message}`
                        })
                    ]
                })
            }
            let Added = new MessageEmbed()
                .setTitle(`Emoji Added`)
                .setColor(client.embed.cr)
                .setDescription(
                    client.emoji.success + `| Emoji Has Been Added! | Name: ${name ||
                    `${customemoji.name}`} | Preview: [Click Me](${Link})`
                );

            return message.reply({ embeds: [Added] });
        } else {
            let CheckEmoji = parse(emoji, { assetType: "png" });
            if (!CheckEmoji[0]) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cf,
                            description: `${client.emoji.fail}| Please Give Me A Valid Emoji!`
                        })
                    ]
                });
            }
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: client.embed.cf,
                        description: `${client.emoji.fail}| You Can Use Normal Emoji Without Adding In Server!`
                    })
                ]
            });
        }
    }
};
