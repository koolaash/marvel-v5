const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'membercount',
    description: 'shows how man members are in the server',
    userPermissions: [''],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const embed = new MessageEmbed({
            description: interaction.guild.memberCount,
            color: client.embed.cm,
            title: `Total Members`,
            timestamp: Date.now()
        });

        return interaction.reply({ embeds: [embed], ephemeral: true })
    },
};