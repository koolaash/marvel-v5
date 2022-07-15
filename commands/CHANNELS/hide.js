const discord = require("discord.js");

module.exports = {
    name: "hide",
    description: "Hides The Mentioned Channels for [everyone | @role | @user]",
    category: "CHANNELS",
    usage: 'hide [@role | @user]',
    userPermissions: ["MANAGE_ROLES", "MANAGE_CHANNELS", "EMBED_LINKS"],
    botPermissions: ["MANAGE_ROLES", "EMBED_LINKS"],

    async run(client, message, args) {

        if (args[0]) {
            const item = message.mentions.members.first() ||
                message.guild.members.cache.get(args[0]) ||
                message.mentions.roles.first() ||
                message.guild.roles.cache.get(args[0])

            if (!item) {
                item = await message.guild.members.fetch(args[0]).catch(() => null)
            }

            if (!item) {
                return message.reply({
                    embeds: [
                        new discord.MessageEmbed()
                            .setDescription(
                                `${client.emoji.fail}| Cannot Find This User Or Role`
                            )
                            .setColor(client.embed.cf)
                    ]
                })
            }
            const nembed = new discord.MessageEmbed()
                .setDescription(
                    `${client.emoji.success}| ${message.channel} Is Now Invisible To ${item}\`.!`
                )
                .setColor(client.embed.cr)
            return (
                message.channel.permissionOverwrites.edit(item, {
                    VIEW_CHANNEL: false
                }, message.author.tag) &&
                message.reply({ embeds: [nembed] })
            );

        } else {
            const embed = new discord.MessageEmbed()
                .setDescription(
                    `${client.emoji.success}| ${message.channel} Is Now Invisible To Everyone.!`
                )
                .setColor(client.embed.cr)
            return (
                message.channel.permissionOverwrites.edit(
                    message.channel.guild.roles.everyone,
                    {
                        VIEW_CHANNEL: false
                    },
                    message.author.tag
                ) && message.reply({ embeds: [embed] })
            );
        }
    }
};