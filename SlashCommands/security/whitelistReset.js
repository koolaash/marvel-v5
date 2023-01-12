const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'whitelist_reset',
    description: 'To reset trusted list of the bot antinuke',
    userPermissions: [''],

    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */

    run: async (client, interaction) => {
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
    },
};