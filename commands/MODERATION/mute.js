const { MessageEmbed } = require("discord.js"),
    ms = require('ms');

module.exports = {
    name: "mute",
    aliases: ["stfu", "chup-reh", "timeout", "m"],
    description: "helps you mute a user",
    category: "MODERATION",
    usage: "mute <@user | username | userid> <time> [reason]",
    userPermissions: ["MODERATE_MEMBERS"],
    botPermissions: ["EMBED_LINKS", "MODERATE_MEMBERS"],

    async run(client, message, args) {
        if (!args[0]) {
            return require('../../function/getcmd')(client, message);
        }
        let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) ||
            message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) ||
            message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());

        if (!kickMember || kickMember === undefined) {
            kickMember = await message.guild.members.fetch(args[0]).catch(() => null);
        }

        if (!kickMember) {
            return require('../../function/getcmd')(client, message);
        }

        if (kickMember.id === message.member.id) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail}| **Cannot mute yourself!**`,
                        color: client.embed.cf
                    })
                ]
            })
        }
        if (!client.config.bowner.includes(message.author.id)) {
            if (message.member !== message.guild.owner) {
                if (message.member.roles.highest.position <= kickMember.roles.highest.position) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                description:
                                    `${client.emoji.fail}| Your Role isn't High Enough to Mute **\`\`${kickMember.user.tag}\`\`**`,
                                color: client.color.cf
                            })
                        ]
                    })
                }
            }
        }
        if (
            message.guild.me.roles.highest.position <=
            kickMember.roles.highest.position
        ) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description:
                            `${client.emoji.fail}| My Role isn't High Enough to Mute **\`\`${kickMember.user.tag}\`\`**`,
                        color: client.color.cf
                    })
                ]
            })
        }
        if (client.config.bowner.includes(kickMember.id)) {
            if (message.author.id !== message.guild.ownerId) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| My Role isn't High Enough to Mute **\`\`${kickMember.user.tag}\`\`**`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
        }
        if (kickMember.permissionsIn(message.channel).has("ADMINISTRATOR")) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail}| **Cannot mute this user because he has admin permissions!**`,
                        color: client.embed.cf
                    })
                ]
            })
        }
        let time = args[1] ? ms(args[1]) : ms('4w'),
            t = args[1] ? args[1] : '4 weeks';

        let reason = 'No Reason';

        if (args[2]) {
            reason = args.slice(2).join(' ');
        }

        try {
            await kickMember.timeout(time, `${message.author.tag} - ${reason}`)
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.success}| Muted ${kickMember} for ${t} time and for : ${reason}`,
                        color: client.embed.cr
                    })
                ]
            })
        } catch (e) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail} | ${e}!`,
                        color: client.embed.cf
                    })
                ]
            })
        }
    }
};
