const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'trusted_add',
    description: 'To add somone into the trusted list of the bot antinuke',
    userPermissions: [''],
    options: [
        {
            type: "USER",
            name: "target",
            description: "WHOME YOU WANNA ADD AS TRUSTED",
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
                            description: `${client.emoji.fail} | ${user} is already in trusted list!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };
        };

        if (trusted) {
            db.push(`${interaction.guild.id}_trusted.whitelisted`, user.id);
            return interaction.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.success} | Added ${user} in trusted users of the server!`,
                        color: client.embed.cr
                    })
                ]
            });
        } else {
            await db.push(`${interaction.guild.id}_trusted`, { whitelisted: [] });
            db.push(`${interaction.guild.id}_trusted.whitelisted`, user.id);
            return interaction.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.success} | Added ${user} in trusted users of the server!`,
                        color: client.embed.cr
                    })
                ]
            });
        };
    },
};