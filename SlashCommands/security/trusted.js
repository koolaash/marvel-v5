const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'trusted',
    description: 'To add somone into the trusted list of the bot antinuke',
    userPermissions: ['ADMINISTRATOR'],
    options: [
        {
            type: "SUB_COMMAND",
            name: "add",
            description: "To add somone into the trusted list of the bot antinuke",
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
            description: "To remove somone into the trusted list of the bot antinuke",
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
            description: "To reset the trusted",
        },
        {
            type: "SUB_COMMAND",
            name: "show",
            description: "To see the trusted",
        },
    ],

    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */

    run: async (client, interaction) => {
        if (arg.add) {
            const user = interaction.options.getUser('target'),
                db = client.qdb;

            if (interaction.user.id !== interaction.guild.ownerId) {
                return interaction.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail} | You are not the owner of the server`,
                            color: client.embed.cf
                        })
                    ]
                });
            };

            let trusted = await db.get(`${interaction.guild.id}_trusted.trusted`);

            if (trusted !== null) {
                if (trusted.includes(user.id)) {
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail} | ${user} is already in trusted list!`,
                                color: client.embed.cf
                            })
                        ]
                    });
                };
            };

            if (trusted) {
                db.push(`${interaction.guild.id}_trusted.trusted`, user.id);
                return interaction.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.success} | Added ${user} in trusted users of the server!`,
                            color: client.embed.cr
                        })
                    ]
                });
            } else {
                await db.push(`${interaction.guild.id}_trusted`, { trusted: [] });
                db.push(`${interaction.guild.id}_trusted.trusted`, user.id);
                return interaction.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.success} | Added ${user} in trusted users of the server!`,
                            color: client.embed.cr
                        })
                    ]
                });
            };
        } else if (args.remove) {
            const user = interaction.options.getUser('target'),
                db = client.qdb;

            if (interaction.user.id !== interaction.guild.ownerId) {
                return interaction.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail} | You are not the owner of the server`,
                            color: client.embed.cf
                        })
                    ]
                });
            };

            let trusted = await db.get(`${interaction.guild.id}_trusted.whitelisted`);

            if (trusted !== null) {
                if (trusted.includes(user.id)) {
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail} | ${user} is not in trusted list!`,
                                color: client.embed.cf
                            })
                        ]
                    });
                };
            };

            await db.pull(`${interaction.guild.id}_trusted.whitelisted`, user.id);
            return interaction.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.success} | Removed ${user} from trusted users of the server!`,
                        color: client.embed.cr
                    })
                ]
            });
        } else if (args.reset) {
            let db = client.qdb;

            if (interaction.user.id !== interaction.guild.ownerId) {
                return interaction.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail} | You are not the owner of the server`,
                            color: client.embed.cf
                        })
                    ]
                });
            };

            db.delete(`${interaction.guild.id}_trusted`);
            return interaction.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.success} | Reset successful for trusted users of the server!`,
                        color: client.embed.cm
                    })
                ]
            });
        } else if (args.show) {
            let db = client.qdb;

            if (interaction.user.id !== interaction.guild.ownerId) {
                return interaction.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail} | You are not the owner of the server`,
                            color: client.embed.cf
                        })
                    ]
                });
            };

            let trusted = await db.get(`${interaction.guild.id}_trusted.whitelisted`),
                users = "";

            if (trusted) {
                users = ` | Here are the whitelisted users!${trusted.map(t => `\n${t} - <@${t}>`)}`;
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
        }
    },
};