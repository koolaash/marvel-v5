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
                db.delete("early-1" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("early-1" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "admin") {
            if (args[2] === "remove") {
                db.delete("admin-1" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("admin-1" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "mod") {
            if (args[2] === "remove") {
                db.delete("mod-1" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("mod-1" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "one") {
            if (args[2] === "remove") {
                db.delete("one-1" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("one-1" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "team") {
            if (args[2] === "remove") {
                db.delete("team-1" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("team-1" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "partner") {
            if (args[2] === "remove") {
                db.delete("partner-1" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("partner-1" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "supporter") {
            if (args[2] === "remove") {
                db.delete("supporter-1" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("supporter-1" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "special") {
            if (args[2] === "remove") {
                db.delete("special-1" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("special-1" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "codev") {
            if (args[2] === "remove") {
                db.delete("codev-1" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("codev-1" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "dev" || args[1] === "developer") {
            if (args[2] === "remove") {
                db.delete("developer-1" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("developer-1" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "owner") {
            if (args[2] === "remove") {
                db.delete("owner-1" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("owner-1" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "vip") {
            if (args[2] === "remove") {
                db.delete("vip-1" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("vip-1" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "coowner") {
            if (args[2] === "remove") {
                db.delete("coowner-1" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("coowner-1" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "bug") {
            if (args[2] === "remove") {
                db.delete("bug-1" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("bug-1" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "super") {
            if (args[2] === "remove") {
                db.delete("super-1" + target.id);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set("super-1" + target.id, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "beta") {
            if (args[2] === "remove") {
                db.delete(`beta-1${target.id}`);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set(`beta-1${target.id}`, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "staff") {
            if (args[2] === "remove") {
                db.delete(`staff-1${target.id}`);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set(`staff-1${target.id}`, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "hadmin") {
            if (args[2] === "remove") {
                db.delete(`hadmin-1${target.id}`);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set(`hadmin-1${target.id}`, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "hmod") {
            if (args[2] === "remove") {
                db.delete(`hmod-1${target.id}`);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set(`hmod-1${target.id}`, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === "fuck") {
            if (args[2] === "remove") {
                db.delete(`fuckoff-1${target.id}`);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            } else {
                db.set(`fuckoff-1${target.id}`, true);
                return message.reply(client.emoji.success)
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
            }
        } else if (args[1] === 'reset') {
            db.delete(`team-1${target.id}`);
            db.delete(`partner-1${target.id}`);
            db.delete(`supporter-1${target.id}`);
            db.delete(`special-1${target.id}`);
            db.delete(`codev-1${target.id}`);
            db.delete(`developer-1${target.id}`);
            db.delete(`owner-1${target.id}`);
            db.delete(`coowner-1${target.id}`);
            db.delete(`bug-1${target.id}`);
            db.delete(`one-1${target.id}`);
            db.delete(`early-1${target.id}`);
            db.delete(`admin-1${target.id}`);
            db.delete(`mod-1${target.id}`);
            db.delete(`vip-1${target.id}`);
            db.delete(`super-1${target.id}`);
            db.delete(`beta-1${target.id}`);
            db.delete(`staff-1${target.id}`);
            db.delete(`hadmin-1${target.id}`);
            db.delete(`hmod-1${target.id}`);
            db.delete(`fuckoff-1${target.id}`);
            client.qdb.delete(`voted${target.id}`);
            return message.reply(client.emoji.success)
                .then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
        } else if (args[1]) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: client.embed.cf,
                        description: "Which badge you wanna add\nTeam\nPartner\nSupporter\nSpecial\nCodev (Co Develpoer)\nhadmin\hmod" +
                            "\nDeveloper\nOwner\nCo Owner\nBug (Bug Hunter)\nEarly ( early supporter )\nOne ( the one and only )\nSuper ( Most special ),\nfuck",
                    })
                ]
            }).then((m) => setTimeout(() => m.delete().catch(() => null), 2000));
        }
    },
};
