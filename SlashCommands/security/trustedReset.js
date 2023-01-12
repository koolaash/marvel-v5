const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'trusted_reset',
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

        db.delete(`${interaction.guild.id}_trusted`);
        return interaction.reply({
            embeds: [
                new MessageEmbed({
                    description: `${client.emoji.success} | Reset successful for trusted users of the server!`,
                    color: client.embed.cm
                })
            ]
        });
    },
};