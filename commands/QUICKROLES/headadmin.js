const { MessageEmbed } = require("discord.js"),
    db = require("quick.db"),
    nam = "headadmin";

module.exports = {
    name: nam, //"staff",
    aliases: [nam + "s", "hadmin"],
    category: "QUICKROLES",
    usage: nam + " <role @role | @user>",
    description: `set ${nam} role to quick add/remove ${nam} role to users`,
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["EMBED_LINKS", "MANAGE_ROLES"],
    modRole: true,

    async run(client, message, args) {
        if (!args[0]) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: fail,
                        description: `${cross}| Missed the argument <role | show | reset | @user>`,
                    })
                ]
            });
        }
        const fail = client.embed.cf,
            success = client.embed.cr,
            main = client.embed.cm,
            cross = client.emoji.fail,
            tick = client.emoji.success,
            arrow = client.emoji.ar,
            arg = args[0].toLowerCase();

        if (!arg[0]) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: fail,
                        description: `${cross}| Missed the argument <role | show | reset | @user>`,
                    })
                ]
            });
        }
        if (arg[0] === "role" || arg[0] === "set") {
            let ro = message.mentions.roles.first() ||
                message.guild.roles.cache.get(args[1]);

            if (!ro) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: fail,
                            description: `${cross}| You forgot to mention the role or provide role_id!`,
                        })
                    ]
                });
            }
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

            db.set(nam + message.guild.id, ro.id);
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: success,
                        description: `${tick}| Set ${nam} role to <@&${ro.id}>`,
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
                        description: `${cross}| You haven't set any role for ${nam}!`,
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
                        description: `${cross}| You haven't set any role for ${nam}!`,
                    })
                ]
            });
        }
        if (arg[0] === "show") {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: main,
                        description: `${arrow}| <@&${rol}> Is set as current ${nam} role!`,
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


        if (arg[0]) {
            let target = message.mentions.members.first() ||
                message.guild.members.cache.get(args[0]);
            if (!target) {
                target = await message.guild.members.fetch(args[0]).catch(() => null);
            }
            if (!target) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: fail,
                            description: `${cross}| Unable to find this user!`,
                        })
                    ]
                });
            }

            if (message.guild.me.roles.highest.position <= role.position) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: fail,
                            description: `${cross}| My role is below the <@${role.id}>!`,
                        })
                    ]
                });
            }

            if (target) {
                if (!target.roles.cache.has(role.id)) {
                    target.roles.add(role, message.author.tag);
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                color: success,
                                description: `${tick}| Gave <@&${role.id}> to <@${target.user.id}>!`,
                            })
                        ]
                    });
                } else if (target.roles.cache.has(role.id)) {
                    target.roles.remove(role, message.author.tag);
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                color: fail,
                                description: `${cross}| Removed <@&${role.id}> from <@${target.user.id}>!`,
                            })
                        ]
                    });
                }
            }
        }
    },
};
