const discord = require("discord.js");

module.exports = {
    name: "snipe",
    description: "helps you see the last message which got deleted",
    category: "INFORMATION",
    usage: "snipe",
    botPermissions: ["EMBED_LINKS"],
    userPermissions: ["MANAGE_MESSAGES"],

    async run(client, message, args) {

        const msg = client.snipes.get(message.channel.id),
            embed = new discord.MessageEmbed()
                .setTitle(`Deleted Message:`)
                .setColor(client.embed.cm)
                .setFooter({
                    text: message.author.tag,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                });
        if (msg.content) {
            embed.setDescription(
                `Author : **${msg.author}**\nContent : ${msg.content || 'Content Unavailable'}`
            )
        } else if (msg.image) {
            embed.setDescription(
                `Author : **${msg.author}**\nContent : ${msg.content || 'Content Unavailable'}`
            )
            embed.setImage(msg.image);
        } else {
            return message.reply(
                `${client.emoji.fail}| Maybe There's No Deleted Message Here`
            );
        }
        return message.channel.send({ embeds: [embed] });
    }
};
