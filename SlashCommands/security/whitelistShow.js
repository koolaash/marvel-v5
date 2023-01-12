const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const { w } = require('flip-text/lib/chars');

module.exports = {
    name: 'whitelist_show',
    description: 'To reset trusted list of the bot antinuke',
    userPermissions: [''],

    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */

    run: async (client, interaction) => {
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
    },
};