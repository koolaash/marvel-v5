const Discord = require("discord.js");

module.exports = {
    name: "howgay",
    category: "FUN",
    description: "Sends a random image of a cat",
    usage: "howgay <@user>",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        if (!args[0]) {
            return message.reply({
                embeds: [
                    new Discord.MessageEmbed({
                        description: `${client.emoji.fail}| Woah.... Slow Down!! Who's gaytest are we doing..??`,
                        color: client.embed.cf
                    })
                ]
            });
        }
        let target = message.mentions.members.first();

        if (!target) {
            return message.reply({
                embeds: [
                    new Discord.MessageEmbed({
                        description: `${client.emoji.fail}| Woah.... Slow Down!! Mention an actual member!`,
                        color: client.embed.cf
                    })
                ]
            });
        }
        if (!client.config.bowner.includes(target.user.id)) {
            var rng = Math.floor(Math.random() * 101);
        } else {
            rng = 0
        }
        const howgayembed = new Discord.MessageEmbed()
            .setTitle(`Gay Machine Calculator`)
            .setDescription(`${target.user.username} is ${rng}% Gay🌈`)
            .setColor(client.embed.cm);
        message.reply({ embeds: [howgayembed] });
    }
};