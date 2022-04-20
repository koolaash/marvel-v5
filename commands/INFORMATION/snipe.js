const discord = require("discord.js");

module.exports = {
    name: "snipe",
    desciption: "helps you see the last message which got deleted",
    category: "INFORMATION",
    usage: "snipe",
    botPermissions: [],
    userPermissions: ["EMBED_LINKS"],

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
                `${client.emoji.ar}| **${msg.author}**\n${msg.content}`
            )
        } else if (msg.image) {
            embed.setDescription(
                `${client.emoji.ar}| **${msg.author}**\n${msg.content || 'No Message'}`
            )
            embed.setImage(msg.image);
        } else {
            return message.lineReply(
                `${client.emoji.fail}| Maybe There's No Deleted Message Here`
            );
        }
        return message.channel.send({ embeds: [embed] });
    }
};
