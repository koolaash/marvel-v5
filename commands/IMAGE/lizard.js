const Discord = require("discord.js");

module.exports = {
    name: "lizard",
    category: "Image",
    description: "Sends a random image of a lizard",
    usage: "lizard",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        let NEKO = require('nekos.life'),
            { sfw } = new NEKO();
        await sfw.lizard().then(response => {
            const lewdembed = new Discord.MessageEmbed()
                .setTitle("Random Lizard")
                .setImage(response.url)
                .setColor(client.embed.cm)
                .setFooter({
                    text: message.author.tag,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .setURL(response.url);
            message.reply({ embeds: [lewdembed] });
        });
    }
};