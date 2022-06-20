const discord = require("discord.js"),
    db = require(`quick.db`);

module.exports = {
    name: "snipe",
    description: "helps you see the last message which got deleted",
    category: "INFORMATION",
    usage: "snipe",
    botPermissions: ["EMBED_LINKS"],
    userPermissions: ["MANAGE_MESSAGES"],

    async run(client, message, args) {

        const msg = {
            content: db.get(`content${message.channel.id}`),
            author: db.get(`author${message.channel.id}`),
            image: db.get(`image${message.channel.id}`)
        },
            embed = new discord.MessageEmbed()
                .setTitle(`Deleted Message:`)
                .setColor(client.embed.cm)
                .setFooter({
                    text: message.author.tag,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                });
        if (msg.content) {
            embed.setDescription(`Author : **<@${msg.author}>**\nContent : ${msg.content || 'Content Unavailable'}`)
        } else {
            embed.setDescription(`Author : **<@${msg.author}>**`)
        }
        if (msg.image !== null) { embed.setImage(msg.image); }
        if (!msg.content && !msg.image) {
            return message.reply(`${client.emoji.fail}| Maybe There's No Deleted Message Here`);
        }
        return message.channel.send({ embeds: [embed] });
    }
};
