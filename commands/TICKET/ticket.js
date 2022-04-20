const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js"),
    db = require("quick.db");

module.exports = {
    name: "ticket",
    description: "Gives List Of Servers",
    usage: "ticket <channel | role | config>",
    category: "TICKETING",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["MANAGE_ROLES", "EMBED_LINKS", "MANAGE_CHANNELS"],
    vote: true,

    async run(client, message, args) {
        let mer = args.join(" "),
            arg = mer.toLowerCase().split(/ +/g);

        if (!args[0]) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: client.embed.cf,
                        description: `${client.emoji.fail}| Argument <channel | role>`,
                    })
                ]
            });
        } else if (arg[0] === "channel") {
            const prevchan = db.get("ticketChannel" + message.guild.id),
                prevmsg = db.get("ticketMessage" + message.guild.id),
                chann = message.guild.channels.cache.get(prevchan);

            if (chann) {
                msgg = await chann.messages.fetch(prevmsg).catch(() => null);
                if (msgg) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                color: client.embed.cf,
                                description:
                                    `${client.emoji.fail}| Already set in <#${chann.id}>`
                            })
                        ]
                    });
                }
            }

            if (!args[1]) {
                return message.reply(
                    new MessageEmbed({
                        color: client.embed.cf,
                        description: `${client.emoji.fail}| Missed an argument <#channel | channel_id>`,
                    })
                );
            }

            const chan = message.mentions.channels.first() ||
                message.guild.channels.cache.get(args[1]);

            if (!chan) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cf,
                            description: `${client.emoji.fail}| Cannot find the channel`,
                        })
                    ]
                });
            }

            let embed = new MessageEmbed({
                description: `Click The ${client.emoji.dm} Button To Create A Ticket`,
                color: client.embed.cm,
            })
                .setFooter({
                    text: "Marvel - Ticketing Without Clutter",
                    iconURL: client.user.displayAvatarURL()
                })
                .setTitle("Tickets"),
                ticket = new MessageButton()
                    .setStyle("SUCCESS")
                    .setEmoji(client.emoji.dm_id)
                    .setLabel("Create Ticket")
                    .setCustomId("marvel_gen")
                    .setDisabled(false),
                row = new MessageActionRow()
                    .addComponents(ticket);

            message.react(client.emoji.success)
            let m = await chan.send({
                embeds: [embed],
                components: [row],
            });
            db.set(m.id + message.guild.id, true);
            db.set("ticket-no" + chan.id, 1);
            db.set("ticketChannel" + message.guild.id, chan.id);
            db.set("ticketMessage" + message.guild.id, m.id);
        } else if (arg[0] === "role") {
            if (!args[1]) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cf,
                            description: `${client.emoji.fail}| Missed an argument <@role | role_id>`,
                        })
                    ]
                });
            }
            const prevrole = db.get("ticketRole" + message.guild.id),
                rool = message.guild.roles.cache.get(prevrole);
            if (!rool || !prevrole) {
                const modRole = message.mentions.roles.first() ||
                    message.guild.roles.cache.get(args[1]);
                if (!modRole) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                color: client.embed.cf,
                                description:
                                    `${client.emoji.fail}| Unable to find this role!`,
                            })
                        ]
                    });
                }
                db.set("ticketRole" + message.guild.id, modRole.id);
                message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cr,
                            description: `${client.emoji.success}| Set ticket mod role to <@&${modRole.id}>`,
                        })
                    ]
                });
            } else {
                const modRole = message.mentions.roles.first() ||
                    message.guild.roles.cache.get(args[1]);
                if (!modRole) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                color: client.embed.cf,
                                description: "Unable to find this role!",
                            })
                        ]
                    });
                }
                db.set("ticketRole" + message.guild.id, modRole.id);
                message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cr,
                            description:
                                `${client.emoji.success}| Changed ticket mod role to <@&${modRole.id}>`,
                        })
                    ]
                });
            }
        } else if (arg[0] === "details" || arg[0] === "detail" || arg[0] === "config") {
            const prevrole = db.get("ticketRole" + message.guild.id),
                prevchan = db.get("ticketChannel" + message.guild.id);

            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: client.embed.cm,
                        description: `${client.emoji.ar}| Channel <#${prevchan}> Role <@&${prevrole}>`,
                    })
                ]
            });
        }
    },
};