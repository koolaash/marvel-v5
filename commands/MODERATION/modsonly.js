const { MessageEmbed } = require("discord.js"),
    db = require("quick.db");

module.exports = {
    name: "modonly",
    aliases: ["modsonly", "mods-only"],
    desciption: "enables and disables modsonly for bot in your server",
    category: "MODERATION",
    usage: "modsonly <on | off>",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {
        if (!client.config.bowner.includes(message.author.id)) {
            if (message.member !== message.guild.owner) {
                if (
                    message.member.roles.highest.position <
                    message.guild.me.roles.highest.position
                ) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                desciption: `${client.emoji.fail}| Your Role isn't High Enough to change modsonly setting!`,
                                color: client.embed.cf
                            })
                        ]
                    });
                }
            }
        }
        const modonly = db.get("modOnly" + message.guild.id);
        if (args[0] === "on") {
            if (modonly === true) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            desciption: `${client.emoji.fail}| Already On`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
            return (
                db.set("modOnly" + message.guild.id, true) &&
                message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cf,
                            desciption: `${client.emoji.success}| Mods Only Is Now On`
                        })
                    ]
                })
            );
        } else if (args[0] === "off") {
            if (modonly !== true) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cf,
                            desciption: `${client.emoji.fail}| Already Off`
                        })]
                })
            }
            return (
                db.delete("modOnly" + message.guild.id) &&
                message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cf,
                            desciption: `${client.emoji.success}| Mods Only Is Now Off`
                        })]
                })
            );
        } else {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.embed.cf)
                        .setDescription("modsonly <on | off >")
                ]
            });
        }
    }
};
