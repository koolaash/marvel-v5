const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "setnick",
    aliases: ["nick"],
    category: "MODERATION",
    description: "changes the niockname of any user",
    usage: `\`setnick <@User> [Nickname]\``,
    userPermissions: ["MANAGE_NICKNAMES"],
    botPermissions: ["MANAGE_NICKNAMES", "EMBED_LINKS"],

    async run(client, message, args) {
        if (!args[0]) {
            return require('../../function/getcmd')(client, message);
        };

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) ||
            message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) ||
            message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());

        if (!member || member === undefined) {
            member = await message.guild.members.fetch(args[0]).catch(() => null);
        }

        if (!member) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: client.color.cf,
                        description: `${client.emoji.fail}| Unable to find this user!`
                    })
                ]
            });
        };

        if (message.guild.me.roles.highest.position <= member.roles.highest.position) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: client.color.cf,
                        description: `${client.emoji.fail}| My Role isn't High Enough to Change The Nickname! ${member}`
                    })
                ]
            });
        }
        if (message.author.id !== message.guild.ownerId) {
            if (message.member.roles.highest.position <= member.roles.highest.position) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: client.color.cf,
                            description: `${client.emoji.fail}| Your Role isn't High Enough to Change The Nickname! ${member}`
                        })
                    ]
                });
            }
        }
        if (!args[1]) {
            member.setNickname(member.user.username, message.authormtag);
            message.reply({
                embeds: [
                    new MessageEmbed({
                        color: client.color.cf,
                        description: `${client.emoji.success}| Changed Nickname of **${member.user.tag}** to **\`\`\`${member.user.username}\`\`\`**`
                    })
                ]
            });
        } else if (args[1]) {
            const nick = args.join(" ").slice(22);
            member.setNickname(nick, message.author.tag);
            message.reply({
                embeds: [
                    new MessageEmbed({
                        color: client.color.cf,
                        description: `${client.emoji.success}| Changed Nickname of ${member.user.username} to **\`\`\`${nick}\`\`\`**`
                    })
                ]
            });
        }
    }
};
