const Discord = require("discord.js");

module.exports = {
    name: "foxgirl",
    category: "Image",
    description: "Sends a random image of a foxgirl",
    usage: "foxgirl",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {

        let NEKO = require('nekos.life'),
            { sfw } = new NEKO();
        await sfw.foxGirl().then(response => {
            const lewdembed = new Discord.MessageEmbed()
                .setTitle("Random Foxgirl")
                .setImage(response.url)
                .setColor(client.embed.cm)
                .setFooter({
                    text: `Foxgirl Here Give me a kiss!`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .setURL(response.url);
            message.reply({ embeds: [lewdembed] });
        });
    }
};