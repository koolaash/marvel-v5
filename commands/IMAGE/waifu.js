const Discord = require("discord.js");

module.exports = {
    name: "waifu",
    category: "Image",
    description: "Sends a random image of a waifu",
    usage: "waifu",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {

        let NEKO = require('nekos.life'),
            { sfw } = new NEKO();
        await sfw.waifu().then(response => {
            const lewdembed = new Discord.MessageEmbed()
                .setTitle("Random waifu")
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