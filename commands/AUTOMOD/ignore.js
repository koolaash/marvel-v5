const { MessageEmbed } = require("discord.js"),
    db = require("quick.db");

module.exports = {
    name: "ignore",
    // aliases: ["am"],
    category: "AUTOMODERATION",
    usage: "ignore <channel | role>",
    description: "ignore a channel from bots automod",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        let fail = client.embed.cf,
            success = client.embed.cr,
            main = client.embed.cm,
            semoji = `${client.emoji.success}| `,
            aemoji = `${client.emoji.ar}| `,
            femoji = `${client.emoji.fail}| `,
            mer = args.join(" "),
            arg = mer.toLowerCase().split(/ +/g);

        if (!client.config.bowner.includes(message.author.id)) {
            if (message.author.id !== message.guild.ownerId) {
                if (
                    message.member.roles.highest.position <=
                    message.guild.me.roles.highest.position
                ) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${femoji}Your role isn't higher than mine you cannot use this commamd`,
                                color: fail,
                            })
                        ]
                    })

                }
            }
        }
        if (arg[0] === "role") {
            if (!arg) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${femoji}Provide role with the command`,
                            color: fail,
                        })
                    ]
                })
            }
            let role = message.mentions.roles.first() ||
                message.guild.roles.cache.get(args.join(" ")) ||
                message.guild.roles.cache.get(arg[1]);

            if (!role) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${femoji}Unable to find this role!`,
                            color: fail,
                        })]
                })
            }
            db.set("ignoreRole_" + message.guild.id, role.id);
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description:
                            `${semoji}Now ignoring ${role} from automod!`,
                        color: success,
                    })
                ]
            })
        } else if (arg[0] === "channel") {
            if (!arg[1]) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description:
                                `${femoji}Please mention a channel or provide channel id fisrt`,
                            color: fail,
                        })
                    ]
                })
            }
            let chan = message.mentions.channels.first() ||
                message.guild.channels.cache.get(args[1]);

            if (!chan) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${femoji}Unable to find this channel`,
                            color: fail,
                        })
                    ]
                })
            }
            db.set(`ignoreChannel${message.guild.id}`, true);
            db.push(`ignoreChannel.item_${message.guild.id}`, chan.id);
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${semoji}Now ignoring ${chan} from automod!`,
                        color: success,
                    })
                ]
            })
        } else if (arg[0] === "list") {
            let ignoreRole = db.get("ignoreRole_" + message.guild.id),
                ignoreChannel = db.get("ignoreChannel.item_" + message.guild.id),
                list = new MessageEmbed()
                    .setTitle("Ignored Role And Channels")
                    .setFooter(
                        message.author.tag,
                        message.author.displayAvatarURL({ dynamic: true })
                    )
                    .setColor(main);

            if (ignoreRole !== undefined) {
                if (ignoreRole !== null) {
                    list.addField(`${aemoji}Ignored Role`, "<@&" + ignoreRole + ">");
                } else {
                    list.addField(`${aemoji}Ignored Role`, "NONE");
                }
            } else {
                list.addField(`${aemoji}Ignored Role`, "NONE");
            }
            if (ignoreChannel !== undefined) {
                if (ignoreChannel !== null) {
                    list.addField(
                        `${aemoji}Ignored Role`,
                        `<#${ignoreChannel.join("> , <#")}`
                    );
                } else {
                    list.addField(`${aemoji}Ignored Channel`, "NONE");
                }
            } else {
                list.addField(`${aemoji}Ignored Channel`, "NONE");
            }
            return message.reply({ embeds: [list] })
        } else if (arg[0] || !arg[0]) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${femoji}ignore <role | channel | list>`,
                        color: fail,
                    })
                ]
            })

        }
    },
};
