const { MessageEmbed } = require("discord.js"),
    db = require("quick.db"),
    nam = "modrole";

module.exports = {
    name: nam, //"staff",
    category: "usefuf",
    usage: nam + " <set @role | show>",
    description: "see or change " + nam + " settings",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["EMBED_LINKS", "MANAGE_ROLES"],

    async run(client, message, args) {
        const fail = client.embed.cf,
            success = client.embed.cr,
            main = client.embed.cm,
            cross = client.emoji.fail,
            tick = client.emoji.success,
            arrow = client.emoji.ar,
            arg = args[0].toLowerCase();

        if (!client.config.bowner.includes(message.author.id)) {
            if (message.guild.owner !== message.member) {
                if (
                    message.member.roles.highest.position <=
                    message.guild.me.roles.highest.position
                ) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                color: fail,
                                description:
                                    cross + "| You need a higher role than me to use this command",
                            })
                        ]
                    });
                }
            }
        }

        if (!arg[0]) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: fail,
                        description: cross + "| Missed the argument <set | show>",
                    })
                ]
            });
        }
        if (arg[0] === "set") {
            let ro = message.mentions.roles.first() ||
                message.guild.roles.cache.get(args[1]);

            if (!ro) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: fail,
                            description:
                                cross + "| You forgot to mention the role or provide role_id!",
                        })
                    ]
                });
            }
            db.set(nam + message.guild.id, ro.id);
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: success,
                        description: tick + "| Set " + nam + " role to <@&" + ro.id + ">",
                    })
                ]
            });
        }
        const rol = db.get(nam + message.guild.id);
        if (!rol) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: fail,
                        description: cross + "| You haven't set any role for " + nam + "!",
                    })
                ]
            });
        }

        const role = message.guild.roles.cache.get(rol);
        if (!role) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: fail,
                        description: cross + "| You haven't set any role for " + nam + "!",
                    })
                ]
            });
        }
        if (arg[0] === "show") {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: main,
                        description:
                            `${arrow}| <@&${rol}> Is set as current ${nam} role!`,
                    })
                ]
            });
        }
        if (arg[0] === "delete" || arg[0] === "remove" || arg[0] === "reset") {
            let rol = db.delete(nam + message.guild.id),
                ro = message.guild.roles.cache.get(rol)
            if (ro) {

                if (message.guild.me.roles.highest.position <= ro.position) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                color: fail,
                                description: `${cross}| My role is below the <@&${ro.id}>!`,
                            })
                        ]
                    });
                }
            }
            db.delete(nam + message.guild.id);
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: success,
                        description: `${tick}| Removed the the role which was set for ${nam}`,
                    })
                ]
            });
        }
    },
};
