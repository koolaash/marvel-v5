const discord = require("discord.js");

module.exports = {
    name: "roleicon",
    aliases: ['ricon'],
    description: "helps you change role icon",
    category: "USEFUL",
    usage: "roleicon <@role/role_id> <emoji>",
    userPermissions: ["MANAGE_ROLES"],
    botPermissions: ["EMBED_LINKS", "MANAGE_ROLES"],

    async run(client, message, args) {
        if (!args[0]) {
            return require('../../function/getcmd')(client, message);
        };

        let role = await message.mentions.roles.first() || await message.guild.roles.cache.find(r => r.id === args[0]) ||
            message.guild.roles.cache.find(r => r.name.toLowerCase() === args[0].toLocaleLowerCase());

        if (!role) {
            return require('../../function/getcmd')(client, message);
        };

        if (!args[1]) {
            return require('../../function/getcmd')(client, message);
        };

        let emoji = args[1];
        if (!emoji.match(/<a:.+?:\d+>|<:.+?:\d+>/g)) {
            return message.reply({
                embeds: [
                    new discord.MessageEmbed({
                        description: `${client.emoji.fail}| You didn't provide the valid emoji. Make sure not to provide default emojis!`,
                        color: client.embed.cf
                    })
                ]
            })
        }
        let customemoji = discord.Util.parseEmoji(emoji),
            Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${customemoji.animated ? "png" : "png"}`
        try {
            await role.setIcon(Link, message.author.tag);
        } catch (e) {
            return message.reply({
                embeds: [
                    new discord.MessageEmbed({
                        description: `${client.emoji.fail}| ${e}!`,
                        color: client.embed.cf
                    })
                ]
            })
        }
        const embed = new discord.MessageEmbed({
            color: role.hexColor || client.embed.cm,
            description: 'Successfully set your new role icon!'
        })
        return message.reply({ embeds: [embed] });
    }
};
