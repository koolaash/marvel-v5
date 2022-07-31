const discord = require("discord.js"),
    db = require("quick.db");

module.exports = {
    name: "enable",
    //  aliases: ["ar"],
    description: "say command",
    category: "CHANNELS",
    usage: "say <message> or say <message>",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {

        if (!client.config.bowner.includes(message.author.id)) {
            if (message.member !== message.guild.owner) {
                if (message.guild.me.roles.highest.position >= message.member.roles.highest.position) {
                    return message.reply({
                        embeds: [
                            new discord.MessageEmbed({
                                description:
                                    `${client.emoji.fail}| You needs a role higher than me to do that!`,
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
                        description:
                            `${client.emoji.fail}| Provide A Valid Channel To Enable`,
                        color: client.embed.cf
                    })
                ]
            })
        }

        return (
            db.add("dttl" + message.guild.id, -1) &&
            db.delete("disabeled" + chan.id) &&
            message.reply({
                embeds: [
                    new discord.MessageEmbed({
                        description: `${client.emoji.success}| Enabled ${chan} Bot Will Work In This Channel Now`,
                        color: client.embed.cr
                    })
                ]
            })
        )
    }
}