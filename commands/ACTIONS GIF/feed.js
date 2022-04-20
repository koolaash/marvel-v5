const Discord = require("discord.js"),
    nam = 'feed'

module.exports = {
    name: nam,
    category: "Image",
    description: "Sends a random " + nam,
    usage: nam + " @user",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {

        let NEKO = require('nekos.life'),
            { sfw } = new NEKO(),
            target = message.mentions.members.first()

        if (!target) {
            return message.reply({
                embeds: [
                    new Discord.MessageEmbed({
                        description: `${client.emoji.fail}| You forgot to mention your target!`,
                        color: client.embed.cf
                    })
                ]
            })
        }
        await sfw.feed().then(response => {
            const lewdembed = new Discord.MessageEmbed()
                .setDescription(`${message.author} ${nam}s ${target}`)
                .setImage(response.url)
                .setColor(client.embed.cm)
                .setFooter({
                    text: message.author.tag,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                });
            message.reply({ embeds: [lewdembed] });
        });
    }
};