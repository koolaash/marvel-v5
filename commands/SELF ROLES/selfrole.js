const { MessageEmbed, MessageButton, MessageActionRow, Collection, Util } = require("discord.js"),
    db = new Collection(),
    db2 = require('quick.db');

module.exports = {
    name: "selfrole",
    aliases: ['selfroles'],
    desciption: "helps you change role icon",
    category: "USEFUL",
    usage: "roleicon <@role/role_id> <emoji>",
    userPermissions: ["MANAGE_ROLES"],
    botPermissions: ["EMBED_LINKS", "MANAGE_ROLES"],

    async run(client, message, args) {
        message.reply({
            embeds: [
                new MessageEmbed({
                    description: `${client.emoji.ar}| How many roles you want to setup must be between 1 - 5`,
                    color: client.embed.cm
                })
            ]
        })
        let msg_filter = res => res.author.id === message.author.id,
            amount = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 30000
            }),
            amt = amount.first().content
        if (!amt || !amount) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        desciption: `${client.emoji.fail}| You failed to provide the amount!`,
                        color: client.embed.cf
                    })
                ]
            })
        }
        if (isNaN(amt)) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        desciption: `${client.emoji.fail}| You failed to provide the valid amount!`,
                        color: client.embed.cf
                    })
                ]
            })
        }
        if (amt > 5 || amt < 1) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        desciption: `${client.emoji.fail}| You failed to provide the valid amount it must be between 1 - 5!`,
                        color: client.embed.cf
                    })
                ]
            })
        }
        message.reply({
            embeds: [
                new MessageEmbed({
                    description:
                        `${client.emoji.ar}| Which Channel Will Be The Channel For The Self Role Setup`,
                    color: client.embed.cm
                })
            ]
        });
        let ch = await message.channel.awaitMessages({
            filter: msg_filter,
            max: 1,
            time: 30000
        }), chan;
        try {
            if (
                ch.first().content.startsWith("<#") &&
                ch.first().content.endsWith(">")
            ) {
                let ch1 = ch.first().content.slice(2, -1);
                chan = message.guild.channels.cache.get(ch1);
            } else {
                chan = message.guild.channels.cache.get(ch.first().content);
            }
        } catch (e) {
            return (
                message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| Provide a valid channel\nRestart the process`,
                            color: client.embed.cf
                        })
                    ]
                }) & db.delete("inuse" + message.guild.id)
            );
        }
        if (chan === null || chan === undefined) {
            return (
                message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| Provide a valid channel\nRestart the process`,
                            color: client.embed.cf
                        })
                    ]
                }) & db.delete("inuse" + message.guild.id)
            );
        }

        if (!message.guild.me.permissionsIn(chan).has(["EMBED_LINKS", "SEND_MESSAGES", "VIEW_CHANNELS"])) {
            return (
                r = true &&
                message.reply({
                    embeds: [
                        `${client.emoji.fail}| I NEED **\`"EMBED_LINKS", "SEND_MESSAGES", "VIEW_CHANNELS"\`** PERMISSION IN <#${chan.id}> FIRST TO EXECUTE THIS COMMAND!!`
                    ]
                })
            )
        }
        db.set('inuse' + message.guild.id)
        let embed = new MessageEmbed({
            color: client.embed.cm,
            author: {
                name: `Self Roles`,
                iconURL: client.user.displayAvatarURL()
            }
        }),
            row = new MessageActionRow(),
            msg = [],
            r1, role1, emj1, emoji1
        if (amt >= '1') {
            message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.ar}| Provide the role @role or rrole_id!`,
                        color: client.embed.cf
                    })
                ]
            })
            r1 = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 60000
            });
            try {
                if (
                    r1.first().content.startsWith("<@&") &&
                    r1.first().content.endsWith(">")
                ) {
                    let rr1 = r1.first().content.slice(3, -1);
                    role1 = message.guild.roles.cache.get(rr1);
                } else {
                    role1 = message.guild.roles.cache.get(r1.first().content);
                }
            } catch (e) {
                return (
                    message.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail}| Provide a valid role\nRestart the process`,
                                color: client.embed.cf
                            })
                        ]
                    }) & db.delete("inuse" + message.guild.id)
                );
            }
            if (role1 === null || role1 === undefined) {
                return (
                    message.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail}| Provide a valid role\nRestart the process`,
                                color: client.embed.cf
                            })
                        ]
                    }) & db.delete("inuse" + message.guild.id)
                );
            }
            message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.ar}| Provide the emoji for 1st role\**Must be from this guild**!`,
                        color: client.embed.cf
                    })
                ]
            });
            emj1 = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 60000
            });
            if (!emj1.first().content.match(/<a:.+?:\d+>|<:.+?:\d+>/g)) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| You didn't provide the valid emoji.\nMake sure not to provide default emojis!`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
            emoji1 = Util.parseEmoji(emj1.first().content)
            let em1 = message.guild.emojis.cache.get(emoji1.id)
            if (!em1) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| This emoji is not from this server!`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
            row.addComponents(
                new MessageButton()
                    .setEmoji(emoji1.id)
                    .setStyle('SECONDARY')
                    .setCustomId('selfrole1')
            )
            msg.push(`${emj1.first().content} - ${role1}`)
        }
        if (amt === `1`) {
            embed.setDescription(msg.join("\n"))
            let msgs = await chan.send({
                embeds: [embed],
                components: [row]
            })
            db2.set(`selfroles1_${message.guild.id}${msgs.id}`, role1.id)
            return;
        }
        let r2, role2, emj2, emoji2
        if (amt >= '2') {
            message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.ar}| Provide the role2 @role or rrole_id!`,
                        color: client.embed.cf
                    })
                ]
            })
            r2 = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 60000
            });
            try {
                if (
                    r2.first().content.startsWith("<@&") &&
                    r2.first().content.endsWith(">")
                ) {
                    let rr2 = r2.first().content.slice(3, -1);
                    role2 = message.guild.roles.cache.get(rr2);
                } else {
                    role2 = message.guild.roles.cache.get(r2.first().content);
                }
            } catch (e) {
                return (
                    message.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail}| Provide a valid role\nRestart the process`,
                                color: client.embed.cf
                            })
                        ]
                    }) & db.delete("inuse" + message.guild.id)
                );
            }
            if (role2 === null || role2 === undefined) {
                return (
                    message.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail}| Provide a valid role\nRestart the process`,
                                color: client.embed.cf
                            })
                        ]
                    }) & db.delete("inuse" + message.guild.id)
                );
            }
            message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.ar}| Provide the emoji for 2nd role\**Must be from this guild**!`,
                        color: client.embed.cf
                    })
                ]
            })
            emj2 = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 60000
            });
            if (!emj2.first().content.match(/<a:.+?:\d+>|<:.+?:\d+>/g)) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| You didn't provide the valid emoji.\nMake sure not to provide default emojis!`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
            emoji2 = Util.parseEmoji(emj2.first().content)
            let em2 = message.guild.emojis.cache.get(emoji2.id)
            if (!em2) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| This emoji is not from this server!`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
            row.addComponents(
                new MessageButton()
                    .setEmoji(emoji2.id)
                    .setStyle('SECONDARY')
                    .setCustomId('selfrole2')
            )
            msg.push(`${emj2.first().content} - ${role2}`)
        }
        if (amt === `2`) {
            embed.setDescription(msg.join("\n"))
            let msgs = await chan.send({
                embeds: [embed],
                components: [row]
            })
            db2.set(`selfroles1_${message.guild.id}${msgs.id}`, role1.id) &&
                db2.set(`selfroles2_${message.guild.id}${msgs.id}`, role2.id)
            return;
        }
        let r3, role3, emj3, emoji3
        if (amt >= '3') {
            message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.ar}| Provide the role3 @role or rrole_id!`,
                        color: client.embed.cf
                    })
                ]
            })
            r3 = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 60000
            });
            try {
                if (
                    r3.first().content.startsWith("<@&") &&
                    r3.first().content.endsWith(">")
                ) {
                    let rr3 = r3.first().content.slice(3, -1);
                    role3 = message.guild.roles.cache.get(rr3);
                } else {
                    role3 = message.guild.roles.cache.get(r3.first().content);
                }
            } catch (e) {
                return (
                    message.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail}| Provide a valid role\nRestart the process`,
                                color: client.embed.cf
                            })
                        ]
                    }) & db.delete("inuse" + message.guild.id)
                );
            }
            if (role3 === null || role3 === undefined) {
                return (
                    message.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail}| Provide a valid role\nRestart the process`,
                                color: client.embed.cf
                            })
                        ]
                    }) & db.delete("inuse" + message.guild.id)
                );
            }
            message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.ar}| Provide the emoji for 3rd role\**Must be from this guild**!`,
                        color: client.embed.cf
                    })
                ]
            });
            emj3 = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 60000
            });
            if (!emj3.first().content.match(/<a:.+?:\d+>|<:.+?:\d+>/g)) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| You didn't provide the valid emoji.\nMake sure not to provide default emojis!`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
            emoji3 = Util.parseEmoji(emj3.first().content)
            let em3 = message.guild.emojis.cache.get(emoji3.id)
            if (!em3) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| This emoji is not from this server!`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
            row.addComponents(
                new MessageButton()
                    .setEmoji(emoji3.id)
                    .setStyle('SECONDARY')
                    .setCustomId('selfrole3')
            )
            msg.push(`${emj3.first().content} - ${role3}`)
        }
        if (amt === `3`) {
            embed.setDescription(msg.join("\n"))
            let msgs = await chan.send({
                embeds: [embed],
                components: [row]
            })
            db2.set(`selfroles1_${message.guild.id}${msgs.id}`, role1.id) &&
                db2.set(`selfroles2_${message.guild.id}${msgs.id}`, role2.id) &&
                db2.set(`selfroles3_${message.guild.id}${msgs.id}`, role3.id)
            return;
        }
        let r4, role4, emj4, emoji4
        if (amt >= '4') {
            message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.ar}| Provide the role4 @role or rrole_id!`,
                        color: client.embed.cf
                    })
                ]
            })
            r4 = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 60000
            });
            try {
                if (
                    r4.first().content.startsWith("<@&") &&
                    r4.first().content.endsWith(">")
                ) {
                    let rr4 = r4.first().content.slice(3, -1);
                    role4 = message.guild.roles.cache.get(rr4);
                } else {
                    role4 = message.guild.roles.cache.get(r4.first().content);
                }
            } catch (e) {
                return (
                    message.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail}| Provide a valid role\nRestart the process`,
                                color: client.embed.cf
                            })
                        ]
                    }) & db.delete("inuse" + message.guild.id)
                );
            }
            if (role4 === null || role4 === undefined) {
                return (
                    message.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail}| Provide a valid role\nRestart the process`,
                                color: client.embed.cf
                            })
                        ]
                    }) & db.delete("inuse" + message.guild.id)
                );
            }
            message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.ar}| Provide the emoji for 4th role\**Must be from this guild**!`,
                        color: client.embed.cf
                    })
                ]
            });
            emj4 = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 60000
            });
            if (!emj4.first().content.match(/<a:.+?:\d+>|<:.+?:\d+>/g)) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| You didn't provide the valid emoji.\nMake sure not to provide default emojis!`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
            emoji4 = Util.parseEmoji(emj4.first().content)
            let em4 = message.guild.emojis.cache.get(emoji4.id)
            if (!em4) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| This emoji is not from this server!`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
            row.addComponents(
                new MessageButton()
                    .setEmoji(emoji4.id)
                    .setStyle('SECONDARY')
                    .setCustomId('selfrole4')
            )
            msg.push(`${emj4.first().content} - ${role4}`)
        }
        if (amt === `4`) {
            embed.setDescription(msg.join("\n"))
            let msgs = await chan.send({
                embeds: [embed],
                components: [row]
            })
            db2.set(`selfroles1_${message.guild.id}${msgs.id}`, role1.id) &&
                db2.set(`selfroles2_${message.guild.id}${msgs.id}`, role2.id) &&
                db2.set(`selfroles3_${message.guild.id}${msgs.id}`, role3.id) &&
                db2.set(`selfroles4_${message.guild.id}${msgs.id}`, role4.id)
            return;
        }
        let r5, role5, emj5, emoji5
        if (amt >= '5') {
            message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.ar}| Provide the role5 @role or rrole_id!`,
                        color: client.embed.cf
                    })
                ]
            })
            r5 = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 60000
            });
            try {
                if (
                    r5.first().content.startsWith("<@&") &&
                    r5.first().content.endsWith(">")
                ) {
                    let rr5 = r5.first().content.slice(3, -1);
                    role5 = message.guild.roles.cache.get(rr5);
                } else {
                    role5 = message.guild.roles.cache.get(r5.first().content);
                }
            } catch (e) {
                return (
                    message.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail}| Provide a valid role\nRestart the process`,
                                color: client.embed.cf
                            })
                        ]
                    }) & db.delete("inuse" + message.guild.id)
                );
            }
            if (role5 === null || role5 === undefined) {
                return (
                    message.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail}| Provide a valid role\nRestart the process`,
                                color: client.embed.cf
                            })
                        ]
                    }) & db.delete("inuse" + message.guild.id)
                );
            }
            message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.ar}| Provide the emoji for 5th role\**Must be from this guild**!`,
                        color: client.embed.cf
                    })
                ]
            });
            emj5 = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 60000
            });
            if (!emj5.first().content.match(/<a:.+?:\d+>|<:.+?:\d+>/g)) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| You didn't provide the valid emoji.\nMake sure not to provide default emojis!`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
            emoji5 = Util.parseEmoji(emj5.first().content)
            let em5 = message.guild.emojis.cache.get(emoji5.id)
            if (!em5) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| This emoji is not from this server!`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
            row.addComponents(
                new MessageButton()
                    .setEmoji(emoji5.id)
                    .setStyle('SECONDARY')
                    .setCustomId('selfrole5')
            )
            msg.push(`${emj5.first().content} - ${role5}`)
        }
        if (amt === `5`) {
            embed.setDescription(msg.join("\n"))
            let msgs = await chan.send({
                embeds: [embed],
                components: [row]
            })
            db2.set(`selfroles1_${message.guild.id}${msgs.id}`, role1.id) &&
                db2.set(`selfroles2_${message.guild.id}${msgs.id}`, role2.id) &&
                db2.set(`selfroles3_${message.guild.id}${msgs.id}`, role3.id) &&
                db2.set(`selfroles4_${message.guild.id}${msgs.id}`, role4.id) &&
                db2.set(`selfroles5_${message.guild.id}${msgs.id}`, role5.id)
            return;
        }
    }
}