const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'policy',
    description: 'Shows bots privacy policy details',
    userPermissions: [''],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const embed = new MessageEmbed()
            .setTitle(
                `${client.emoji.bot}| MARVEL PRIVACY POLICY`
            )
            .addFields(
                {
                    name: `${client.emoji.ar}| What Data Stored`,
                    value: "1. Server id is stored for customizable prefix and welcome channels including channel ids's.\n2. When the bot is removed form the server it does not delete the id's.\n3. Deleted messages are saved for few minutes that is used in snipe command."
                },
                {
                    name: `${client.emoji.ar}| Data Security`,
                    value: "1. We do not use anyone personal data for ourselves.\n2. We do not share your data with 3rd party.\n3. We do not store anyone's data without permission."
                },
                {
                    name: `${client.emoji.ar}| FAQ or Concerns`,
                    value: "If you have any issue regarding anything join support server link given below."
                },
                {
                    name: `${client.emoji.ar}| NOTE`,
                    value: "We hold all the rights to change the privacy policy anytime."
                },
                {
                    name: `${client.emoji.support}| Support Server`,
                    value: `[marvel.gg/support](${client.config.bserver})`
                }
            )
            .setColor(client.embed.cm)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setFooter({
                text: `${interaction.guild.name} | Policy Last Updated : 5th of August 2021`,
                iconURL: client.user.displayAvatarURL()
            });
        interaction.reply({ embeds: [embed], ephemeral: true });
    },
};