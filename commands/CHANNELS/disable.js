const discord = require("discord.js"),
    db = require("quick.db");

module.exports = {
    name: "disable",
    //  aliases: ["ar"],
    description: "disable bots command in the channel you want",
    category: "CHANNELS",
    usage: "disable <#channel>",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {

        if (!client.config.bowner.includes(message.author.id)) {
            if (message.member !== message.guild.owner) {
                if (message.guild.me.roles.highest.position >= message.member.roles.highest.position) {
                    return message.reply({
                        embeds: [
                            new discord.MessageEmbed({
                                description: `${client.emoji.fail}| You needs a role higher than me to do that!`,
                                color: client.embed.cf
                            })
                        ]
                    });
                }
            }
        }
        if (!args[0]) {
            return require('../../function/getcmd')(client, message);
        }
        const chan = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if (!chan) {
            return message.reply({
                embeds: [
                    new discord.MessageEmbed({
                        description: `${client.emoji.fail}| Provide A Valid Channel To Disable`,
                        color: client.embed.cf
                    })
                ]
            })
        }

        return (
            db.set("disabeled" + chan.id, true) &&
            message.reply({
                embeds: [
                    new discord.MessageEmbed({
                        description: `${client.emoji.success}| Disabled ${chan} Bot Will Not Work In This Channel Now`,
                        color: client.embed.cr
                    })
                ]
            })
        )
    }
}