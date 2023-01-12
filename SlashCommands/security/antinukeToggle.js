const { Client, CommandInteraction, MessageEmbed } = require('discord.js'),
    quick = require("quick.db");

module.exports = {
    name: 'antinuketoggle',
    description: 'Turn on or off the antinuke function of the bot',
    userPermissions: ['ADMINISTRATOR'],

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {

        let db = client.qdb,
            trusted = await db.get(`${interaction.guild.id}_trusted`);

        if (trusted) { } else { trusted = ["1"] };

        if (interaction.user.id !== interaction.guild.ownerId) {
            try {
                if (!trusted.includes(interaction.user.id)) {
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed({
                                description: `${client.emoji.fail} | You are not trusted of the server`,
                                color: client.embed.cf
                            })
                        ]
                    });
                };
            } catch (e) {
                return interaction.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail} | You are not trusted of the server`,
                            color: client.embed.cf
                        })
                    ]
                });
            }
        };

        let Antinuke = quick.get(`${interaction.guild.id}_antinuke`),
            Toggle = "";

        if (Antinuke !== true) {
            quick.set(`${interaction.guild.id}_antinuke`, true);
            Toggle = `ON \nBy ${interaction.user.tag} - ${interaction.user.id} - ${interaction.user}`
        } else {
            quick.delete(`${interaction.guild.id}_antinuke`);
            Toggle = `OFF \nBy ${interaction.user.tag} - ${interaction.user.id} - ${interaction.user}`
        };

        let embed = new MessageEmbed({
            description: `**Antinuke has been turned ${Toggle}**`,
            color: client.color.cf,
            author: {
                name: interaction.guild.name,
                iconURL: interaction.guild.iconURL({ dynamic: true })
            },
            footer: {
                text: client.user.username,
                iconURL: client.user.displayAvatarURL({ dynamic: true })
            },
        })
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        let owner = await interaction.guild.members.fetch(interaction.guild.ownerId);
        return interaction.reply({ embeds: [embed], ephemeral: true }) &&
            owner.send({ embeds: [embed] }).catch(() => null);
    },
};