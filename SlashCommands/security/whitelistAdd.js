const { Client, CommandInteraction, MessageEmbed } = require('discord.js'),
    quick = require("quick.db");

module.exports = {
    name: 'whitelist_add',
    description: 'To add somone into the whitelisted list of the bot antinuke',
    userPermissions: ['ADMINISTRATOR'],
    options: [
        {
            type: "USER",
            name: "target",
            description: "WHOME YOU WANNA WHITELIST",
            required: true
        }
    ],

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction) => {
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
            await db.set(`${interaction.guild.id}_whitelisted`, { whitelisted: [] }) &&F
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
    },
};