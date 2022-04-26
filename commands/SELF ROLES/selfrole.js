const { MessageEmbed, MessageButton, MessageActionRow, Collection, Util } = require("discord.js"),
    db = new Collection(),
    db2 = require('quick.db');

module.exports = {
    name: "selfrole",
    aliases: ['selfroles'],
    description: "helps you change role icon",
    category: "MODERATION",
    usage: "selfrole",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["EMBED_LINKS", "MANAGE_ROLES"],
    vote: true,

    async run(client, message, args) {
        message.reply({
            embeds: [
                new MessageEmbed({
                    description: `${client.emoji.ar}| How many roles you want to setup must be between 1 - 10`,
                    color: client.embed.cm
                })
            ]
        })
        let msg_filter = res => res.author.id === message.author.id,
            amount = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 30000
            }), amt = amount.first().content
        if (!amount || !amt) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail}| You failed to provide the amount!`,
                        color: client.embed.cf
                    })
                ]
            })
        }
        if (isNaN(amt)) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail}| You failed to provide the valid amount!`,
                        color: client.embed.cf
                    })
                ]
            })
        }
        if (amt >= 11 || amt <= 0) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail}| You failed to provide the valid amount it must be between 1 - 10!`,
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
            },
            footer: {
                text: `Powered By Marvel`,
                iconURL: message.guild.iconURL({ dynamic: true })
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
                        description: `${client.emoji.ar}| Provide the emoji for 1st role\n**Must be from this guild**!`,
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
            msg.push(`> ${emj1.first().content} => ${role1}`)
        }
        if (amt === `1`) {
            embed.setDescription(`Cick on the button(s) below to get the corresponding role(s)\n${msg.join("\n")}`)
            let msgs = await chan.send({
                embeds: [embed],
                components: [row]
            })
            db2.set(`selfroles1_${message.guild.id}${msgs.id}`, role1.id) &&
                message.reply({ content: `${client.emoji.success}| Setup done in ${chan}` })
            return;
        }
        let r2, role2, emj2, emoji2
        if (amt >= '2' || amt === '10') {
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
                        description: `${client.emoji.ar}| Provide the emoji for 2nd role\n**Must be from this guild**!`,
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
            msg.push(`> ${emj2.first().content} => ${role2}`)
        }
        if (amt === `2`) {
            embed.setDescription(`Cick on the button(s) below to get the corresponding role(s)\n${msg.join("\n")}`)
            let msgs = await chan.send({
                embeds: [embed],
                components: [row]
            })
            db2.set(`selfroles1_${message.guild.id}${msgs.id}`, role1.id) &&
                db2.set(`selfroles2_${message.guild.id}${msgs.id}`, role2.id) &&
                message.reply({ content: `${client.emoji.success}| Setup done in ${chan}` })
            return;
        }
        let r3, role3, emj3, emoji3
        if (amt >= '3' || amt === '10') {
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
                        description: `${client.emoji.ar}| Provide the emoji for 3rd role\n**Must be from this guild**!`,
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
            msg.push(`> ${emj3.first().content} => ${role3}`)
        }
        if (amt === `3`) {
            embed.setDescription(`Cick on the button(s) below to get the corresponding role(s)\n${msg.join("\n")}`)
            let msgs = await chan.send({
                embeds: [embed],
                components: [row]
            })
            db2.set(`selfroles1_${message.guild.id}${msgs.id}`, role1.id) &&
                db2.set(`selfroles2_${message.guild.id}${msgs.id}`, role2.id) &&
                db2.set(`selfroles3_${message.guild.id}${msgs.id}`, role3.id) &&
                message.reply({ content: `${client.emoji.success}| Setup done in ${chan}` })
            return;
        }
        let r4, role4, emj4, emoji4
        if (amt >= '4' || amt === '10') {
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
                        description: `${client.emoji.ar}| Provide the emoji for 4th role\n**Must be from this guild**!`,
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
            msg.push(`> ${emj4.first().content} => ${role4}`)
        }
        if (amt === `4`) {
            embed.setDescription(`Cick on the button(s) below to get the corresponding role(s)\n${msg.join("\n")}`)
            let msgs = await chan.send({
                embeds: [embed],
                components: [row]
            })
            db2.set(`selfroles1_${message.guild.id}${msgs.id}`, role1.id) &&
                db2.set(`selfroles2_${message.guild.id}${msgs.id}`, role2.id) &&
                db2.set(`selfroles3_${message.guild.id}${msgs.id}`, role3.id) &&
                db2.set(`selfroles4_${message.guild.id}${msgs.id}`, role4.id) &&
                message.reply({ content: `${client.emoji.success}| Setup done in ${chan}` })
            return;
        }
        let r5, role5, emj5, emoji5
        if (amt >= '5' || amt === '10') {
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
                        description: `${client.emoji.ar}| Provide the emoji for 5th role\n**Must be from this guild**!`,
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
            msg.push(`> ${emj5.first().content} => ${role5}`)
        }
        if (amt === `5`) {
            embed.setDescription(`Cick on the button(s) below to get the corresponding role(s)\n${msg.join("\n")}`)
            let msgs = await chan.send({
                embeds: [embed],
                components: [row]
            })
            db2.set(`selfroles1_${message.guild.id}${msgs.id}`, role1.id) &&
                db2.set(`selfroles2_${message.guild.id}${msgs.id}`, role2.id) &&
                db2.set(`selfroles3_${message.guild.id}${msgs.id}`, role3.id) &&
                db2.set(`selfroles4_${message.guild.id}${msgs.id}`, role4.id) &&
                db2.set(`selfroles5_${message.guild.id}${msgs.id}`, role5.id) &&
                message.reply({ content: `${client.emoji.success}| Setup done in ${chan}` })
            return;
        }
        let r6, role6, emj6, emoji6, row2 = new MessageActionRow()
        if (amt >= '6' || amt === '10') {
            message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.ar}| Provide the role6 @role or rrole_id!`,
                        color: client.embed.cf
                    })
                ]
            })
            r6 = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 60000
            });
            try {
                if (
                    r6.first().content.startsWith("<@&") &&
                    r6.first().content.endsWith(">")
                ) {
                    let rr6 = r6.first().content.slice(3, -1);
                    role6 = message.guild.roles.cache.get(rr6);
                } else {
                    role6 = message.guild.roles.cache.get(r6.first().content);
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
            if (role6 === null || role6 === undefined) {
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
                        description: `${client.emoji.ar}| Provide the emoji for 6th role\n**Must be from this guild**!`,
                        color: client.embed.cf
                    })
                ]
            });
            emj6 = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 60000
            });
            if (!emj6.first().content.match(/<a:.+?:\d+>|<:.+?:\d+>/g)) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| You didn't provide the valid emoji.\nMake sure not to provide default emojis!`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
            emoji6 = Util.parseEmoji(emj6.first().content)
            let em6 = message.guild.emojis.cache.get(emoji6.id)
            if (!em6) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| This emoji is not from this server!`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
            row2.addComponents(
                new MessageButton()
                    .setEmoji(emoji6.id)
                    .setStyle('SECONDARY')
                    .setCustomId('selfrole6')
            )
            msg.push(`> ${emj6.first().content} => ${role6}`)
        }
        if (amt === `6`) {
            embed.setDescription(`Cick on the button(s) below to get the corresponding role(s)\n${msg.join("\n")}`)
            let msgs = await chan.send({
                embeds: [embed],
                components: [row, row2]
            })
            db2.set(`selfroles1_${message.guild.id}${msgs.id}`, role1.id) &&
                db2.set(`selfroles2_${message.guild.id}${msgs.id}`, role2.id) &&
                db2.set(`selfroles3_${message.guild.id}${msgs.id}`, role3.id) &&
                db2.set(`selfroles4_${message.guild.id}${msgs.id}`, role4.id) &&
                db2.set(`selfroles5_${message.guild.id}${msgs.id}`, role5.id) &&
                db2.set(`selfroles6_${message.guild.id}${msgs.id}`, role6.id) &&
                message.reply({ content: `${client.emoji.success}| Setup done in ${chan}` })
            return;
        }
        let r7, role7, emj7, emoji7
        if (amt >= '7' || amt === '10') {
            message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.ar}| Provide the role 7 @role or rrole_id!`,
                        color: client.embed.cf
                    })
                ]
            })
            r7 = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 60000
            });
            try {
                if (
                    r7.first().content.startsWith("<@&") &&
                    r7.first().content.endsWith(">")
                ) {
                    let rr7 = r7.first().content.slice(3, -1);
                    role7 = message.guild.roles.cache.get(rr7);
                } else {
                    role7 = message.guild.roles.cache.get(r7.first().content);
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
            if (role7 === null || role7 === undefined) {
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
                        description: `${client.emoji.ar}| Provide the emoji for 7th role\n**Must be from this guild**!`,
                        color: client.embed.cf
                    })
                ]
            });
            emj7 = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 60000
            });
            if (!emj7.first().content.match(/<a:.+?:\d+>|<:.+?:\d+>/g)) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| You didn't provide the valid emoji.\nMake sure not to provide default emojis!`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
            emoji7 = Util.parseEmoji(emj7.first().content)
            let em7 = message.guild.emojis.cache.get(emoji7.id)
            if (!em7) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| This emoji is not from this server!`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
            row2.addComponents(
                new MessageButton()
                    .setEmoji(emoji7.id)
                    .setStyle('SECONDARY')
                    .setCustomId('selfrole7')
            )
            msg.push(`> ${emj7.first().content} => ${role7}`)
        }
        if (amt === `7`) {
            embed.setDescription(`Cick on the button(s) below to get the corresponding role(s)\n${msg.join("\n")}`)
            let msgs = await chan.send({
                embeds: [embed],
                components: [row, row2]
            })
            db2.set(`selfroles1_${message.guild.id}${msgs.id}`, role1.id) &&
                db2.set(`selfroles2_${message.guild.id}${msgs.id}`, role2.id) &&
                db2.set(`selfroles3_${message.guild.id}${msgs.id}`, role3.id) &&
                db2.set(`selfroles4_${message.guild.id}${msgs.id}`, role4.id) &&
                db2.set(`selfroles5_${message.guild.id}${msgs.id}`, role5.id) &&
                db2.set(`selfroles6_${message.guild.id}${msgs.id}`, role6.id) &&
                db2.set(`selfroles7_${message.guild.id}${msgs.id}`, role7.id) &&
                message.reply({ content: `${client.emoji.success}| Setup done in ${chan}` })
            return;
        }
        let r8, role8, emj8, emoji8
        if (amt >= '8' || amt === '10') {
            message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.ar}| Provide the role 8 @role or rrole_id!`,
                        color: client.embed.cf
                    })
                ]
            })
            r8 = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 60000
            });
            try {
                if (
                    r8.first().content.startsWith("<@&") &&
                    r8.first().content.endsWith(">")
                ) {
                    let rr8 = r8.first().content.slice(3, -1);
                    role8 = message.guild.roles.cache.get(rr8);
                } else {
                    role8 = message.guild.roles.cache.get(r8.first().content);
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
            if (role8 === null || role8 === undefined) {
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
                        description: `${client.emoji.ar}| Provide the emoji for 8th role\n**Must be from this guild**!`,
                        color: client.embed.cf
                    })
                ]
            });
            emj8 = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 60000
            });
            if (!emj8.first().content.match(/<a:.+?:\d+>|<:.+?:\d+>/g)) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| You didn't provide the valid emoji.\nMake sure not to provide default emojis!`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
            emoji8 = Util.parseEmoji(emj8.first().content)
            let em8 = message.guild.emojis.cache.get(emoji8.id)
            if (!em8) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| This emoji is not from this server!`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
            row2.addComponents(
                new MessageButton()
                    .setEmoji(emoji8.id)
                    .setStyle('SECONDARY')
                    .setCustomId('selfrole8')
            )
            msg.push(`> ${emj8.first().content} => ${role8}`)
        }
        if (amt === `8`) {
            embed.setDescription(`Cick on the button(s) below to get the corresponding role(s)\n${msg.join("\n")}`)
            let msgs = await chan.send({
                embeds: [embed],
                components: [row, row2]
            })
            db2.set(`selfroles1_${message.guild.id}${msgs.id}`, role1.id) &&
                db2.set(`selfroles2_${message.guild.id}${msgs.id}`, role2.id) &&
                db2.set(`selfroles3_${message.guild.id}${msgs.id}`, role3.id) &&
                db2.set(`selfroles4_${message.guild.id}${msgs.id}`, role4.id) &&
                db2.set(`selfroles5_${message.guild.id}${msgs.id}`, role5.id) &&
                db2.set(`selfroles6_${message.guild.id}${msgs.id}`, role6.id) &&
                db2.set(`selfroles7_${message.guild.id}${msgs.id}`, role7.id) &&
                db2.set(`selfroles8_${message.guild.id}${msgs.id}`, role8.id) &&
                message.reply({ content: `${client.emoji.success}| Setup done in ${chan}` })
            return;
        }
        let r9, role9, emj9, emoji9
        if (amt >= '9' || amt === '10') {
            message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.ar}| Provide the role 9 @role or rrole_id!`,
                        color: client.embed.cf
                    })
                ]
            })
            r9 = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 60000
            });
            try {
                if (
                    r9.first().content.startsWith("<@&") &&
                    r9.first().content.endsWith(">")
                ) {
                    let rr9 = r9.first().content.slice(3, -1);
                    role9 = message.guild.roles.cache.get(rr9);
                } else {
                    role9 = message.guild.roles.cache.get(r9.first().content);
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
            if (role9 === null || role9 === undefined) {
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
                        description: `${client.emoji.ar}| Provide the emoji for 9th role\n**Must be from this guild**!`,
                        color: client.embed.cf
                    })
                ]
            });
            emj9 = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 60000
            });
            if (!emj9.first().content.match(/<a:.+?:\d+>|<:.+?:\d+>/g)) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| You didn't provide the valid emoji.\nMake sure not to provide default emojis!`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
            emoji9 = Util.parseEmoji(emj9.first().content)
            let em9 = message.guild.emojis.cache.get(emoji9.id)
            if (!em9) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| This emoji is not from this server!`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
            row2.addComponents(
                new MessageButton()
                    .setEmoji(emoji9.id)
                    .setStyle('SECONDARY')
                    .setCustomId('selfrole9')
            )
            msg.push(`> ${emj9.first().content} => ${role9}`)
        }
        if (amt === `9`) {
            embed.setDescription(`Cick on the button(s) below to get the corresponding role(s)\n${msg.join("\n")}`)
            let msgs = await chan.send({
                embeds: [embed],
                components: [row, row2]
            })
            db2.set(`selfroles1_${message.guild.id}${msgs.id}`, role1.id) &&
                db2.set(`selfroles2_${message.guild.id}${msgs.id}`, role2.id) &&
                db2.set(`selfroles3_${message.guild.id}${msgs.id}`, role3.id) &&
                db2.set(`selfroles4_${message.guild.id}${msgs.id}`, role4.id) &&
                db2.set(`selfroles5_${message.guild.id}${msgs.id}`, role5.id) &&
                db2.set(`selfroles6_${message.guild.id}${msgs.id}`, role6.id) &&
                db2.set(`selfroles7_${message.guild.id}${msgs.id}`, role7.id) &&
                db2.set(`selfroles8_${message.guild.id}${msgs.id}`, role8.id) &&
                db2.set(`selfroles9_${message.guild.id}${msgs.id}`, role9.id) &&
                message.reply({ content: `${client.emoji.success}| Setup done in ${chan}` })
            return;
        }
        let r10, role10, emj10, emoji10
        if (amt >= '10') {
            message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.ar}| Provide the role 10 @role or rrole_id!`,
                        color: client.embed.cf
                    })
                ]
            })
            r10 = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 60000
            });
            try {
                if (
                    r10.first().content.startsWith("<@&") &&
                    r10.first().content.endsWith(">")
                ) {
                    let rr10 = r10.first().content.slice(3, -1);
                    role10 = message.guild.roles.cache.get(rr10);
                } else {
                    role10 = message.guild.roles.cache.get(r10.first().content);
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
            if (role10 === null || role10 === undefined) {
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
                        description: `${client.emoji.ar}| Provide the emoji for 10th role\n**Must be from this guild**!`,
                        color: client.embed.cf
                    })
                ]
            });
            emj10 = await message.channel.awaitMessages({
                filter: msg_filter,
                max: 1,
                time: 60000
            });
            if (!emj10.first().content.match(/<a:.+?:\d+>|<:.+?:\d+>/g)) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| You didn't provide the valid emoji.\nMake sure not to provide default emojis!`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
            emoji10 = Util.parseEmoji(emj10.first().content)
            let em10 = message.guild.emojis.cache.get(emoji10.id)
            if (!em10) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| This emoji is not from this server!`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
            row2.addComponents(
                new MessageButton()
                    .setEmoji(emoji10.id)
                    .setStyle('SECONDARY')
                    .setCustomId('selfrole10')
            )
            msg.push(`> ${emj10.first().content} => ${role10}`)
        }
        if (amt === `10`) {
            embed.setDescription(`Cick on the button(s) below to get the corresponding role(s)\n${msg.join("\n")}`)
            let msgs = await chan.send({
                embeds: [embed],
                components: [row, row2]
            })
            db2.set(`selfroles1_${message.guild.id}${msgs.id}`, role1.id) &&
                db2.set(`selfroles2_${message.guild.id}${msgs.id}`, role2.id) &&
                db2.set(`selfroles3_${message.guild.id}${msgs.id}`, role3.id) &&
                db2.set(`selfroles4_${message.guild.id}${msgs.id}`, role4.id) &&
                db2.set(`selfroles5_${message.guild.id}${msgs.id}`, role5.id) &&
                db2.set(`selfroles6_${message.guild.id}${msgs.id}`, role6.id) &&
                db2.set(`selfroles7_${message.guild.id}${msgs.id}`, role7.id) &&
                db2.set(`selfroles8_${message.guild.id}${msgs.id}`, role8.id) &&
                db2.set(`selfroles9_${message.guild.id}${msgs.id}`, role9.id) &&
                db2.set(`selfroles10_${message.guild.id}${msgs.id}`, role10.id) &&
                message.reply({ content: `${client.emoji.success}| Setup done in ${chan}` })
            return;
        }
    }
}