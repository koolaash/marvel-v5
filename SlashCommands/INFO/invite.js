const { Client, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Sends invitation and support links',
    userPermissions: [''],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        let embed = new MessageEmbed()

            .setTitle(
                `${client.emoji.bot}| ${client.user.username}'s Invite | Support Menu`
            )
            .setDescription(
                `${client.emoji.ar}Join Our Discord Server For Any Kind Of Help`)

            .addFields(
                {
                    name: `${client.emoji.invite}| Invite`,
                    value: `[discord.gg/invite](${client.config.binvite})`
                },
                {
                    name: `${client.emoji.discord}| Support Server`,
                    value: `[discord.gg/support](${client.config.bserver})`
                }
            )
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(client.embed.cm)
            .setFooter({
                text: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            }),
            btn1 = new MessageButton()
                .setStyle("LINK")
                .setLabel("|  SUPPORT")
                .setURL(client.config.bserver)
                .setEmoji(client.emoji.discord_id)
                .setDisabled(false),
            btn2 = new MessageButton()
                .setStyle("LINK")
                .setLabel("|  INVITE")
                .setURL(client.config.binvite)
                .setEmoji(client.emoji.invite_id)
                .setDisabled(false),
            btn3 = new MessageButton()
                .setStyle("LINK")
                .setLabel("|  WEBSITE")
                .setURL(client.config.bwebsite)
                .setEmoji(client.emoji.dm_id)
                .setDisabled(false),
            btn4 = new MessageButton()
                .setStyle("LINK")
                .setLabel("|  VOTE")
                .setURL(client.config.bvote)
                .setEmoji(client.emoji.discord_id)
                .setDisabled(false),
            row = new MessageActionRow()
                .addComponents(btn1, btn2, btn3, btn4);

        return interaction.reply({ components: [row], embeds: [embed], ephemeral: true });
    },
};