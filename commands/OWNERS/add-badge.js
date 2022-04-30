const { MessageEmbed } = require("discord.js"),
    db = require("quick.db");

module.exports = {
    name: "abg",
    category: "OWNERS",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        setTimeout(() => message.delete().catch(() => null), 2000)
        if (!client.config.bowner.includes(message.author.id)) return;
        if (!args[0]) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: client.embed.cf,
                        description: "Target user not mentioned!",
                    })
                ]
            }).then(m => setTimeout(() => m.delete().catch(() => null), 2000));
        }
        const target = message.mentions.members.first()
        if (!target) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: client.embed.cf,
                        description: "Target user not mentioned!",
                    })
                ]
            }).then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
        }

        if (!args[1]) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: client.embed.cf,
                        description: "Which badge you wanna add\nTeam\nPartner\nSupporter\nSpecial\nCodev (Co Develpoer)\nhadmin\hmod" +
                            "\nDeveloper\nOwner\nCo Owner\nBug (Bug Hunter)\nEarly ( early supporter )\nOne ( the one and only )\nSuper ( Most special )\nBeta",
                    })
                ]
            }).then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
        } else if (args[1] === "early") {
            if (args[2] === "remove") {
                db.delete("early-" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("early-" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "admin") {
            if (args[2] === "remove") {
                db.delete("admin-" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("admin-" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "mod") {
            if (args[2] === "remove") {
                db.delete("mod-" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("mod-" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "one") {
            if (args[2] === "remove") {
                db.delete("one-" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("one-" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "team") {
            if (args[2] === "remove") {
                db.delete("team-" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("team-" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "partner") {
            if (args[2] === "remove") {
                db.delete("partner-" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("partner-" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "supporter") {
            if (args[2] === "remove") {
                db.delete("supporter-" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("supporter-" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "special") {
            if (args[2] === "remove") {
                db.delete("special-" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("special-" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "codev") {
            if (args[2] === "remove") {
                db.delete("codev-" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("codev-" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "dev" || args[1] === "developer") {
            if (args[2] === "remove") {
                db.delete("developer-" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("developer-" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "owner") {
            if (args[2] === "remove") {
                db.delete("owner-" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("owner-" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "vip") {
            if (args[2] === "remove") {
                db.delete("vip-" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("vip-" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "coowner") {
            if (args[2] === "remove") {
                db.delete("coowner-" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("coowner-" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "bug") {
            if (args[2] === "remove") {
                db.delete("bug-" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("bug-" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "super") {
            if (args[2] === "remove") {
                db.delete("super-" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("super-" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "beta") {
            if (args[2] === "remove") {
                db.delete(`beta-${target.id}`);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set(`beta-${target.id}`, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "staff") {
            if (args[2] === "remove") {
                db.delete(`staff-${target.id}`);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set(`staff-${target.id}`, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "hadmin") {
            if (args[2] === "remove") {
                db.delete(`hadmin-${target.id}`);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set(`hadmin-${target.id}`, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "hmod") {
            if (args[2] === "remove") {
                db.delete(`hmod-${target.id}`);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set(`hmod-${target.id}`, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === 'reset') {
            db.delete(`team-${target.id}`)
            db.delete(`partner-${target.id}`)
            db.delete(`supporter-${target.id}`)
            db.delete(`special-${target.id}`)
            db.delete(`codev-${target.id}`)
            db.delete(`developer-${target.id}`)
            db.delete(`owner-${target.id}`)
            db.delete(`coowner-${target.id}`)
            db.delete(`bug-${target.id}`)
            db.delete(`one-${target.id}`)
            db.delete(`early-${target.id}`)
            db.delete(`admin-${target.id}`)
            db.delete(`mod-${target.id}`)
            db.delete(`vip-${target.id}`)
            db.delete(`super-${target.id}`)
            db.delete(`beta-${target.id}`)
            db.delete(`staff-${target.id}`)
            db.delete(`hadmin-${target.id}`)
            db.delete(`hmod-${target.id}`)
            client.qdb.delete(`voted${target.id}`);
            return message.reply(client.emoji.success)
                .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
        } else if (args[1]) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: client.embed.cf,
                        description: "Which badge you wanna add\nTeam\nPartner\nSupporter\nSpecial\nCodev (Co Develpoer)\nhadmin\hmod" +
                            "\nDeveloper\nOwner\nCo Owner\nBug (Bug Hunter)\nEarly ( early supporter )\nOne ( the one and only )\nSuper ( Most special )",
                    })
                ]
            }).then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
        }
    },
};
