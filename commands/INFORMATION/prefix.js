const { MessageEmbed } = require("discord.js")

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
        let defprefix = client.config.prefix,
            nprefix = await client.qdb.get(`guildPrefix_${message.guild.id}`);
        if (nprefix !== null) {
            defprefix = nprefix;
        }
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
            return (
                client.qdb.delete(`guildPrefix_${message.guild.id}`) &&
                message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(client.embed.cr)
                            .setDescription(
                                `${client.emoji.success}| New Prefix For This Guild Is Now **\`${pprefix}\`**`
                            )
                    ]
                })
            )
        } else {
            return (
                client.qdb.set(`guildPrefix_${message.guild.id}`, args[0]) &&
                message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(client.embed.cr)
                            .setDescription(
                                `${client.emoji.success}| New Prefix For This Guild Is Now **\`${args[0]}\`**`
                            )
                    ]
                })
            );
        }
    }
};