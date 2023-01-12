const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'trusted_show',
    description: 'To reset trusted list of the bot antinuke',
    userPermissions: [''],

    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */

    run: async (client, interaction) => {
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
    },
};