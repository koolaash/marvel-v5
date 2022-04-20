const NEKO = require('nekos.life'),
    { sfw } = new NEKO(),
    Discord = require("discord.js");

module.exports = {
    name: "wallpaper",
    category: "Image",
    description: "Sends a random image of a wallpaper",
    usage: "wallpaper",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        await sfw.wallpaper().then(response => {
            const lewdembed = new Discord.MessageEmbed()
                .setTitle("Random wallpaper")
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