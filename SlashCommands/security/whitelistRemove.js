const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'whitelist_remove',
    description: 'To remove somone into the whitelisted list of the bot antinuke',
    userPermissions: [''],
    options: [{
        type: "USER",
        name: "target",
        description: "WHOME YOU WANNA REMOVE FROM WHITELISTED",
        required: true
    }],

    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */

    run: async (client, interaction) => {

        const user = interaction.options.getUser('target'),
            db = client.qdb,
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

        let wl = await db.get(`${interaction.guild.id}_whitelisted`);

        if (wl.whitelisted !== null) {
            if (!wl.whitelisted.includes(user.id)) {
                return interaction.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail} | ${user} is not in whitelisted list!`,
                            color: client.embed.cf
                        })
                    ]
                });
            };
        };

        await db.pull(`${interaction.guild.id}_whitelisted.whitelisted`, user.id);
        return interaction.reply({
            embeds: [
                new MessageEmbed({
                    description: `${client.emoji.success} | Removed ${user} from whitelisted users of the server!`,
                    color: client.embed.cr
                })
            ]
        });
    },
};