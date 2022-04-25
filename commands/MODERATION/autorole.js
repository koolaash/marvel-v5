const discord = require("discord.js"),
    db = require("quick.db");

module.exports = {
    name: "autorole",
    aliases: ["ar"],
    description: "sets your server autorole",
    category: "MODERATION",
    usage: "autorole <set @role | reset | show>",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["MANAGE_ROLES", "EMBED_LINKS"],
    vote: true,

    async run(client, message, args) {

        if (!client.config.bowner.includes(message.author.id)) {
            if (message.author.id !== message.guild.ownerId) {
                if (message.guild.me.roles.highest.position >= message.member.roles.highest.position) {
                    return message.reply({
                        embeds: [
                            new discord.MessageEmbed({
                                description: `${client.emoji.fail}| You needs a role higher than me to execute this command!`,
                                color: client.embed.cf
                            })
                        ]
                    });
                }
            }
        }
        if (args[0] === "set") {
            if (!args[1]) {
                return message.reply({
                    content: `${client.emoji.fail}| Usage: \`autorole set @role/role-id\``
                })
            }
            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            if (!role) {
                return message.reply({
                    embeds: [
                        new discord.MessageEmbed({
                            description:
                                client.emoji.fail + "| Your Role isn't High Enough!",
                            color: client.color.cf
                        })
                    ]
                })
            }
            if (message.guild.me.roles.highest.position <= role.position) {
                return message.reply({
                    embeds: [
                        new discord.MessageEmbed({
                            description:
                                client.emoji.fail +
                                "| I needs a role higher than **`" +
                                role.name + "**` to do that!",
                            color: client.color.cf
                        })
                    ]
                })
            }

            return (db.set("autorole" + message.guild.id, role.id) &&
                message.reply({
                    embeds: [
                        new discord.MessageEmbed({
                            description:
                                client.emoji.success +
                                "| Set The autorole to <@&" +
                                role.id +
                                ">\n**`If this role have any extra permissions that" +
                                " a public role should not have it won't assisn the" +
                                " role to new members!`**",
                            color: client.embed.cm
                        })
                    ]
                })
            )

        } else if (args[0] === "reset") {
            return db.delete("autorole" + message.guild.id) &&
                message.reply({
                    embeds: [
                        new discord.MessageEmbed({
                            description:
                                client.emoji.success +
                                "| Deleted current autorole settings",
                            color: client.embed.cm
                        })
                    ]
                })
        } else if (args[0] === "show" || args[0] === "details") {
            const rrr = db.get("autorole" + message.guild.id)
            if (!rrr) {
                return message.reply({
                    embeds: [
                        new discord.MessageEmbed({
                            description:
                                client.emoji.success +
                                "| No autorole is set yet!",
                            color: client.embed.cm
                        })
                    ]
                })
            }
            const arole = message.guild.roles.cache.get(rrr)
            if (!arole) {
                return message.reply({
                    embeds: [
                        new discord.MessageEmbed({
                            description: client.emoji.fail +
                                "| The role you previously set cannot " +
                                "be fetched by me try assigning a new one!",
                            color: client.embed.cf
                        })
                    ]
                })
            }
            return message.reply({
                embeds: [
                    new discord.MessageEmbed({
                        description: client.emoji.ar +
                            "| Your current autorole is <@&" +
                            arole.id +
                            ">",
                        color: client.embed.cm
                    })
                ]
            })
        } else {
            return message.reply({
                embeds: [
                    new discord.MessageEmbed({
                        description:
                            client.emoji.ar +
                            "| All features listed below\n" +
                            "`set` to set the autorole\n`reset` to delete current" +
                            " autorole setings\n`show` to get details of current autorole settings",
                        color: client.embed.cm
                    })
                ]
            })
        }


    }
}