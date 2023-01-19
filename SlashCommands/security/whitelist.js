const { Client, CommandInteraction, MessageEmbed } = require('discord.js'),
    quick = require("quick.db");

module.exports = {
    name: 'whitelist',
    description: 'all the whitelist commands of bot',
    userPermissions: ['ADMINISTRATOR'],
    options: [
        {
            type: "SUB_COMMAND",
            name: "add",
            description: "To add somone into the whitelisted list of the bot antinuke",
            options: [
                {
                    type: "USER",
                    name: "target",
                    description: "WHOME YOU WANNA ADD",
                    required: true
                }
            ]
        },
        {
            type: "SUB_COMMAND",
            name: "remove",
            description: "To remove somone into the whitelisted list of the bot antinuke",
            options: [
                {
                    type: "USER",
                    name: "target",
                    description: "WHOME YOU WANNA REMOVE",
                    required: true
                }
            ],
        },
        {
            type: "SUB_COMMAND",
            name: "reset",
            description: "To reset the whitelist",
        },
        {
            type: "SUB_COMMAND",
            name: "show",
            description: "To see the whitelist",
        },
    ],

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        if (args.add) {
            const user = interaction.options.getUser('target'),
                db = client.qdb,
                trusted = await db.get(`${interaction.guild.id}_trusted`);

            if (trusted) { } else { trusted = ["1"] };

            if (interaction.user.id !== interaction.guild.ownerId) {
                try {
                    if (!trusted.includes(interaction.user.id)) {
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed({
                                    description: `${client.emoji.fail} | You are not trusted by the server`,
                                    color: client.embed.cf
                                })
                            ]
                        });
                    };
                } catch (e) {
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail} | You are not trusted by the server!`,
                                color: client.embed.cf
                            })
                        ]
                    });
                };
            };

            let whitelisted = await db.get(`${interaction.guild.id}_whitelisted.whitelisted`);

            if (whitelisted !== null) {
                if (whitelisted.includes(user.id)) {
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail} | ${user} is already in whitelisted list!`,
                                color: client.embed.cf
                            })
                        ]
                    });
                };
            };

            if (trusted) {
                await db.push(`${interaction.guild.id}_whitelisted.whitelisted`, user.id);
                return interaction.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.success} | Added ${user} in whitelisted users of the server!`,
                            color: client.embed.cr
                        })
                    ]
                });
            } else {
                await db.set(`${interaction.guild.id}_whitelisted`, { whitelisted: [] }) && F
                db.push(`${interaction.guild.id}_whitelisted.whitelisted`, user.id);
                return interaction.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.success} | Added ${user} in whitelisted users of the server!`,
                            color: client.embed.cr
                        })
                    ]
                });
            };
        } else if (args.remove) {
            const user = interaction.options.getUser('target'),
                db = client.qdb,
                trusted = await db.get(`${interaction.guild.id}_trusted`);

            if (trusted) { } else { trusted = ["1"] };

            if (interaction.user.id !== interaction.guild.ownerId) {
                try {
                    if (!trusted.includes(interaction.user.id)) {
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed({
                                    description: `${client.emoji.fail} | You are not trusted by the server`,
                                    color: client.embed.cf
                                })
                            ]
                        });
                    };
                } catch (e) {
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail} | You are not trusted by the server!`,
                                color: client.embed.cf
                            })
                        ]
                    });
                };
            };

            let wl = await db.get(`${interaction.guild.id}_whitelisted`);

            if (wl.whitelisted !== null) {
                if (!wl.whitelisted.includes(user.id)) {
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail} | ${user} is not in whitelisted list!`,
                                color: client.embed.cf
                            })
                        ]
                    });
                };
            };

            await db.pull(`${interaction.guild.id}_whitelisted.whitelisted`, user.id);
            return interaction.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.success} | Removed ${user} from whitelisted users of the server!`,
                        color: client.embed.cr
                    })
                ]
            });
        } else if (args.reset) {
            let db = client.qdb,
                trusted = await db.get(`${interaction.guild.id}_trusted`);

            if (trusted) { } else { trusted = ["1"] };

            if (interaction.user.id !== interaction.guild.ownerId) {
                try {
                    if (!trusted.includes(interaction.user.id)) {
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed({
                                    description: `${client.emoji.fail} | You are not trusted by the server`,
                                    color: client.embed.cf
                                })
                            ]
                        });
                    };
                } catch (e) {
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail} | You are not trusted by the server!`,
                                color: client.embed.cf
                            })
                        ]
                    });
                };
            };

            db.delete(`${interaction.guild.id}_whitelisted`);
            return interaction.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.success} | Reset successful for whitelisted users of the server!`,
                        color: client.embed.cm
                    })
                ]
            });
        } else if (args.show) {
            let db = client.qdb;

            let trusted = await db.get(`${interaction.guild.id}_trusted.whitelisted`);

            if (trusted) { } else { trusted = ["1"] };

            if (interaction.user.id !== interaction.guild.ownerId) {
                try {
                    if (!trusted.includes(interaction.user.id)) {
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed({
                                    description: `${client.emoji.fail} | You are not trusted by the server`,
                                    color: client.embed.cf
                                })
                            ]
                        });
                    };
                } catch (e) {
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail} | You are not trusted by the server!`,
                                color: client.embed.cf
                            })
                        ]
                    });
                };
            };

            await db.get(`${interaction.guild.id}_whitelisted`).then(async (wl) => {
                users = "";
                if (wl) {
                    if (wl.whitelisted && wl.whitelisted !== null) {
                        users = ` | Here are the whitelisted users!${wl.whitelisted.map(t => `\n${t} - <@${t}>`)}`;
                    } else {
                        users = " | No one is trusted enough!";
                    };
                } else {
                    users = " | No one is trusted enough!";
                };

                return interaction.reply({
                    embeds: [
                        new MessageEmbed({
                            description: client.emoji.success + users,
                            color: client.embed.cr
                        })
                    ]
                });
            });
        };
    },
};