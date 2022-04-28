const { MessageEmbed } = require("discord.js"),
    discord = require("discord.js");

module.exports = {
    name: "unban",
    aliases: ["ub"],
    description: "helps you ban a user",
    category: "MODERATION",
    usage: "ban <@user | username | userid> [reason]",
    userPermissions: ["BAN_MEMBERS"],
    botPermissions: ["EMBED_LINKS", "BAN_MEMBERS"],

    async run(client, message, args) {
        try {
            if (!args[0]) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| **Mention a user or provide id/name!**`,
                            color: client.embed.cf
                        })
                    ]
                });
            }
            try {
                var kickMember = await message.guild.bans.fetch(args[0]);
            } catch (e) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| **This user is not banned!**`,
                            color: client.embed.cf
                        })
                    ]
                })
            }

            if (!kickMember) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| **This user is not banned!**`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
            if (!client.config.bowner.includes(message.author.id)) {
                if (message.author.id !== message.guild.ownerId) {
                    if (message.member.roles.highest.position <= message.guild.me.roles.highest.position) {
                        return message.reply({
                            embeds: [
                                new discord.MessageEmbed({
                                    description:
                                        `${client.emoji.fail}| Your Role isn't High Enough to Unban Users`,
                                    color: client.color.cf
                                })
                            ]
                        })
                    }
                }
            }
            var av = kickMember.user.displayAvatarURL({ dynamic: true }),
                reason = args.slice(1).join(" ");

            try {
                message.guild.members.unban(args[0],
                    message.author.tag + ` ${reason || " No Reason Provided"}`
                );
            } catch (err) {
                message.guild.members.unban(args[0],
                    message.author.tag + ` ${reason || " No Reason Provided"}`
                );
            }

            var sembed = new MessageEmbed()
                .setColor(client.embed.cr)
                .setThumbnail(av)
                .setTitle("Unbanned")
                .setDescription(
                    `**${client.emoji.success}| ${kickMember.user.username}** has been unbanned for ${reason || " No Reason Provided"}`
                )
                .setFooter({
                    text: `Unbanned By : ${message.author.tag}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                });
            return message.reply({ embeds: [sembed] });
        } catch (e) {
            var sd = new MessageEmbed()
                .setColor(client.embed.cr)
                .setDescription(`**${e.message}**`)
            return message.reply({ embeds: [sd] });
        }
    }
};
