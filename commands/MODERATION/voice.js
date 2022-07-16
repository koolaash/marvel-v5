module.exports = {
    name: "voice",
    aliases: ["vc"],
    description: "help you quickly voice mute members",
    category: "MODERATION",
    usage: "vcmute <all | @user>",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["ADD_REACTIONS", "MODERATE_MEMBERS", "MANAGE_ROLES", "MANAGE_CHANNELS"],

    async run(client, message, args) {
        if (args[0] === 'mute') {
            if (!args[1]) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| Mention a user or provide user id first!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!user) {
                user = await message.guild.members.fetch(args[0]).catch(() => null);
            }
            if (!user) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| Unable to find this user!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };
            let vc = user.voiceChannel;

            if (!vc) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| User is not in a voice channel!`,
                            color: client.embed.cf
                        })
                    ]
                });
            }
            return user.voice.setMute(true);
        } else if (args[0] === 'muteall') {
            let vc = message.member.voiceChannel;
            if (!vc) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| You are not in a vc!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };
            return vc.members.forEach(mem => mem.voice.setMute(true));
        } else if (args[0] === 'unmute') {
            if (!args[1]) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| Mention a user or provide user id first!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!user) {
                user = await message.guild.members.fetch(args[0]).catch(() => null);
            }
            if (!user) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| Unable to find this user!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };
            return user.voice.setMute(false) && message.react(client.emoji.success);
        } else if (args[0] === 'unmuteall') {
            let vc = message.member.voiceChannel;
            if (!vc) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| You are not in a vc!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };
            return vc.members.forEach(mem => mem.voice.setMute(false)) && message.react(client.emoji.success);
        } else if (args[0] === 'deaf') {
            if (!args[1]) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| Mention a user or provide user id first!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!user) {
                user = await message.guild.members.fetch(args[0]).catch(() => null);
            }
            if (!user) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| Unable to find this user!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };
            let vc = user.voiceChannel;

            if (!vc) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| User is not in a voice channel!`,
                            color: client.embed.cf
                        })
                    ]
                });
            }
            return user.voice.setDeaf(true) && message.react(client.emoji.success);
        } else if (args[0] === 'deafall') {
            let vc = message.member.voiceChannel;
            if (!vc) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| You are not in a vc!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };
            return vc.members.forEach(mem => mem.voice.setDeaf(true)) && message.react(client.emoji.success);
        } else if (args[0] === 'undeaf') {
            if (!args[1]) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| Mention a user or provide user id first!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!user) {
                user = await message.guild.members.fetch(args[0]).catch(() => null);
            };
            if (!user) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| Unable to find this user!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };
            let vc = user.voiceChannel;

            if (!vc) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| User is not in a voice channel!`,
                            color: client.embed.cf
                        })
                    ]
                });
            }
            return user.voice.setDeaf(false) && message.react(client.emoji.success);
        } else if (args[0] === 'undeafall') {
            let vc = message.member.voiceChannel;
            if (!vc) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| You are not in a vc!`,
                            color: client.embed.cf
                        })
                    ]
                })
            };
            return vc.members.forEach(mem => mem.voice.setDeaf(false)) && message.react(client.emoji.success);
        } else if (args[0] === 'move') {
            if (!args[1]) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| Mention a user or provide user id first!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };
            if (!args[2]) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| Mention a user or provide user id first!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };

            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!user) {
                user = await message.guild.members.fetch(args[0]).catch(() => null);
            };
            if (!user) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| Unable to find this user!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };

            let vc = message.mentions.channels.first() || message.guild.channels.cache.find(channel => channel.name === args.slice(2).join(" ")) || message.guild.channels.cache.get(args[2]);

            if (!vc) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| Cannot find this vc!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };

            return user.voice.setChannel(vc) && message.react(client.emoji.success);
        } else if (args[0] === 'moveall') {

            if (!args[1]) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| Mention a channel or provide id/name first!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };

            let vc = message.mentions.channels.first() || message.guild.channels.cache.find(channel => channel.name === args.slice(1).join(" ")) || message.guild.channels.cache.get(args[1]);

            if (!vc) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| Provied channel id/name to move into!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };
            return vc.members.forEach(mem => mem.voice.setChannel(vc)) && message.react(client.emoji.success);
        } else if (args[0] === 'kickall') {
            if (!args[1]) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| Mention a cahnnel or provide id/name first!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };
            let vc = message.member.voiceChannel || message.mentions.channels.first() ||
                message.guild.channels.cache.find(channel => channel.name === args.slice(1).join(" ")) ||
                message.guild.channels.cache.get(args[1]);

            if (!vc) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| Join a vc first or provie channel id/name!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };
            return vc.members.forEach(mem => mem.voice.setChannel(null)) && message.react(client.emoji.success);
        } else if (args[0] === 'kick') {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);

            if (!user) {
                user = await message.guild.members.fetch(args[0]).catch(() => null);
            };
            if (!user) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| Unable to find this user!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };

            let vc = user.voiceChannel;

            if (!vc) {
                return message.reply({
                    embeds: [
                        new MessageEmbeds({
                            description: `${client.emoji.fail}| User is not in a voice channel!`,
                            color: client.embed.cf
                        })
                    ]
                });
            }

            return user.voice.setChannel(null) && message.react(client.emoji.success);
        } else if (args[0] === 'lock') {
            if (args[1]) {
                let item = message.mentions.members.first() || message.guild.members.cache.get(args[1]) ||
                    message.mentions.roles.first() ||
                    message.guild.roles.cache.get(args[1])

                if (!item) {
                    item = await message.guild.members.fetch(args[0]).catch(() => null);
                }

                if (!item) {
                    return message.reply({
                        embeds: [
                            new discord.MessageEmbed()
                                .setDescription(
                                    `${client.emoji.fail}| Cannot Find This User Or Role`
                                )
                                .setColor(client.embed.cf)
                        ]
                    })
                }

                let vc = message.author.voiceChannel;

                if (!vc) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail}| You are not in a voice channel!`
                            })
                        ]
                    })
                }
                return vc.permissionOverwrites.edit(item, {
                    CONNECT: false
                }, message.author.tag) && message.react(client.emoji.success)
            } else {
                return vc.permissionOverwrites.edit(message.channel.guild.roles.everyone, {
                    CONNECT: false
                }, message.author.tag) && message.react(client.emoji.success);
            }
        } else if (args[0] === 'unlock') {
            if (args[1]) {
                let item = message.mentions.members.first() || message.guild.members.cache.get(args[1]) ||
                    message.mentions.roles.first() ||
                    message.guild.roles.cache.get(args[1])

                if (!item) {
                    item = await message.guild.members.fetch(args[0]).catch(() => null);
                }

                if (!item) {
                    return message.reply({
                        embeds: [
                            new discord.MessageEmbed()
                                .setDescription(
                                    `${client.emoji.fail}| Cannot Find This User Or Role`
                                )
                                .setColor(client.embed.cf)
                        ]
                    })
                }

                let vc = message.author.voiceChannel;

                if (!vc) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail}| You are not in a voice channel!`
                            })
                        ]
                    })
                }
                return vc.permissionOverwrites.edit(item, {
                    CONNECT: true
                }, message.author.tag) && message.react(client.emoji.success)
            } else {
                return vc.permissionOverwrites.edit(message.channel.guild.roles.everyone, {
                    CONNECT: true
                }, message.author.tag) && message.react(client.emoji.success);
            }
        } else if (args[0] === 'hide') {
            if (args[1]) {
                let item = message.mentions.members.first() || message.guild.members.cache.get(args[1]) ||
                    message.mentions.roles.first() ||
                    message.guild.roles.cache.get(args[1])

                if (!item) {
                    item = await message.guild.members.fetch(args[0]).catch(() => null);
                }

                if (!item) {
                    return message.reply({
                        embeds: [
                            new discord.MessageEmbed()
                                .setDescription(
                                    `${client.emoji.fail}| Cannot Find This User Or Role`
                                )
                                .setColor(client.embed.cf)
                        ]
                    })
                }

                let vc = message.author.voiceChannel;

                if (!vc) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail}| You are not in a voice channel!`
                            })
                        ]
                    })
                }
                return vc.permissionOverwrites.edit(item, {
                    VIEW_CHANNEL: false
                }, message.author.tag) && message.react(client.emoji.success)
            } else {
                return vc.permissionOverwrites.edit(message.channel.guild.roles.everyone, {
                    VIEW_CHANNEL: false
                }, message.author.tag) && message.react(client.emoji.success);
            }
        } else if (args[0] === 'unhide') {
            if (args[1]) {
                let item = message.mentions.members.first() || message.guild.members.cache.get(args[1]) ||
                    message.mentions.roles.first() ||
                    message.guild.roles.cache.get(args[1])

                if (!item) {
                    item = await message.guild.members.fetch(args[0]).catch(() => null);
                }

                if (!item) {
                    return message.reply({
                        embeds: [
                            new discord.MessageEmbed()
                                .setDescription(
                                    `${client.emoji.fail}| Cannot Find This User Or Role`
                                )
                                .setColor(client.embed.cf)
                        ]
                    })
                }

                let vc = message.author.voiceChannel;

                if (!vc) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail}| You are not in a voice channel!`
                            })
                        ]
                    })
                }
                return vc.permissionOverwrites.edit(item, {
                    VIEW_CHANNEL: true
                }, message.author.tag) && message.react(client.emoji.success)
            } else {
                return vc.permissionOverwrites.edit(message.channel.guild.roles.everyone, {
                    VIEW_CHANNEL: true
                }, message.author.tag) && message.react(client.emoji.success);
            }
        } else if (args[0] === 'bitrate' || args[0] === 'bit') {
            let vc = message.author.voiceChannel;

            if (!vc) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| You are not in a voice channel!`,
                            color: client.embed.cf
                        })
                    ]
                })
            }

            let level = message.guild.premiumTier;
            let initBitrate = '96';

            if (level === 'NONE') {
                initBitrate = '96';
            }

            if (level === "TIER_1") {
                initBitrate = '128';
            }

            if (level === "TIER_2") {
                initBitrate = '256';
            }

            if (level === "TIER_1") {
                initBitrate = '384';
            }

            if (!args[1]) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| Provide the new bitrate you want to set!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };

            if (isNaN(args[1])) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| Provide the new bitrate you want to set in a number for example : 64, 94, 120!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };

            if (args[1] > initBitrate || args[1] < "64") {
                return message.reply({
                    embeds: [
                        new MesssageEmbed({
                            description: `${client.emoji.fail}| Minimum bitrate for this guild is 64kbps\nMaximum bitrate for this guild is ${initBitrate}kbps!`,
                            color: client.embed.cf
                        })
                    ]
                })
            };

            return vc.setBitrate(initBitrate + '000') && message.react(client.emoji.success);
        } else if (args[0] === 'limit') {
            let vc = message.author.voiceChannel;

            if (!vc) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| You are not in a voice channel!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };

            if (!args[1] || isNaN(args[1]) || args[1] > "99" || args[1] < '1') {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| Provide a valid number from 1 to 99`
                        })
                    ]
                });
            };
            return vc.setUserLimit(args[1]) && message.react(client.emoji.success);
        } else if (!args[0]) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `Proper usages are 
                        vc mute @member
                        vc muteall
                        vc unmute @member
                        vc unmute all
                        vc deaf @member
                        vc deafall
                        vc undeaff @member
                        vc undeaf all
                        vc move @member #channel/channel name or id
                        vc moveall #channel/channel name or id
                        vc kick @member
                        vc kick all
                        vc lock
                        vc unlock
                        vc hide
                        vc unhide
                        vc bitrate <amount>
                        vc limit <amount>`
                    })
                ]
            });
        };
    },
};