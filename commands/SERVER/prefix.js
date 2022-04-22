const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "prefix",
    aliases: ["setprefix", "set-prefix"],
    category: "INFORMATION",
    usage: "prefix <new_prefix>",
    description: "helps you change the bot prefix",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["EMBED_LINKS"],
    vote: true,

    run: async (client, message, args) => {
        if (!client.config.bowner.includes(message.author.id)) {
            if (message.member !== message.guild.owner) {
                if (
                    message.member.roles.highest.position <
                    message.guild.me.roles.highest.position
                )
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor(client.embed.cf)
                                .setDescription(
                                    `${client.emoji.fail}| Your Role isn't High Enough to change Prefix`
                                )
                        ]
                    });
            }
        }
        const data = await client.prefixModel.findOne({
            GuildID: message.guild.id,
        }),
            defprefix = data ? `${data.Prefix}` : `${client.config.prefix}`;

        if (!args[0]) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.embed.cf)
                        .setDescription(
                            `${client.emoji.fail}| prefix <new-prefix>\nprefix reset\nCurrentPrefix is ${defprefix}`
                        )
                ]
            });
        }
        if (args[0].length > 3 && args[0] !== "reset") {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.embed.cf)
                        .setDescription(
                            `${client.emoji.fail}| Provided prefix length cannot be more than 3 alphabet`
                        )
                ]
            });
        }
        if (args[0] === "reset") {
            if (data) {
                await client.prefixModel.findOneAndRemove({
                    GuildID: message.guild.id,
                })
            }
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.embed.cr)
                        .setDescription(
                            `${client.emoji.success}| New Prefix For This Guild Is Now **\`${client.config.prefix}\`**`
                        )
                ]
            })
        } else {
            if (data) {
                await client.prefixModel.findOneAndRemove({
                    GuildID: message.guild.id,
                })
            }
            let newData = new client.prefixModel({
                Prefix: args[0],
                GuildID: message.guild.id,
            });
            newData.save();
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.embed.cr)
                        .setDescription(
                            `${client.emoji.success}| New Prefix For This Guild Is Now **\`${args[0]}\`**`
                        )
                ]
            })

        }
    }
};