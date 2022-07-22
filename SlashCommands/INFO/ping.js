const { Client, CommandInteraction } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'shows the bot ping',
    userPermissions: [''],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        return interaction.reply({ content: `${client.ws.ping}ms`, ephemeral: true });
    },
};