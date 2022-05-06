const discord = require("discord.js"),
    moment = require("moment");

module.exports = {
    name: "userinfo",
    aliases: ["whois", "ui"],
    description: "All the details about any user",
    category: "INFORMATION",
    usage: "userinfo [@user]",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {
        let member = args[0] ? message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]) ||
            message.guild.members.cache.find(
                r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
            ) ||
            message.guild.members.cache.find(
                ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
            ) || await message.guild.members.fetch(args[0]).catch(() => null) :
            message.member,
            bot = 'No'
        if (member.user.bot === true) {
            bot = "Yes";
        }
        var hex = client.embed.cm
        var flags = member.user.flags.toArray().join(" "),
            eperms = [
                "ADMINISTRATOR", "MANAGE_CHANNELS", "MANAGE_GUILD",
                "MANAGE_ROLES", "BAN_MEMBERS", "KICK_MEMBERS",
                "MANAGE_MESSAGES", "MANAGE_EMOJIS_AND_STICKERS",
                "MENTION_EVERYONE", "MANAGE_NICKNAMES", "MANAGE_WEBHOOKS",
                "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS"
            ],
            per = []

        eperms.forEach(e => {
            if (member.permissionsIn(message.channel).has(e)) {
                per.push(e)
            }
        })
        let m = `**Tag :** ${member.user.tag}\n` +
            `**ID : **${member.user.id}\n` +
            `**Nickname : **${member.nickname !== null ? member.nickname : "None"}\n` +
            `**Bot : **${bot}\n` +
            `**Joined Server : **<t:${Math.round(moment.utc(member.joinedAt) / 1000)}:R>\n` +
            `**Joined Discord : **<t:${Math.round(member.user.createdAt / 1000)}:R>\n` +
            `**Verification : **${member.user.pending ? "Pending" : "Completed"}\n` +
            `**Bagdes : ** ${flags ? flags : "None"}`
                .replace('DISCORD_EMPLOYEE', client.badge.employee)
                .replace('PARTNERED_SERVER_OWNER', client.badge.partner)
                .replace('HYPESQUAD_EVENTS', client.badge.squad)
                .replace('BUGHUNTER_LEVEL_1', client.badge.bug1)
                .replace('HOUSE_BRAVERY', client.badge.bravery)
                .replace('HOUSE_BRILLIANCE', client.badge.brilliance)
                .replace('HOUSE_BALANCE', client.badge.balance)
                .replace('EARLY_SUPPORTER', client.badge.early)
                .replace('TEAM_USER', client.badge.team)
                .replace('EARLY_VERIFIED_BOT_DEVELOPER', client.badge.dev)
                .replace('BUGHUNTER_LEVEL_2', client.badge.bug)
                .replace('VERIFIED_BOT', client.badge.vbot)
                .replace('DISCORD_CERTIFIED_MODERATOR', client.badge.dmod)
                .replace('BOT_HTTP_INTERACTIONS', client.badge.http)
        let embed = new discord.MessageEmbed()
            .setTitle(`__About ${member.user.username}__`)
            .setFooter({
                text: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setThumbnail(
                member.user.displayAvatarURL({ dynamic: true })
            )
            .setColor(hex)
            .setDescription(m)
            .addField("__Key Permissions__", `\`${per.join(', ') || "None"}\``)
        if (member.roles.cache.size < 25) {
            embed.addField(
                `__ROLES__[${member.roles.cache.size}]`,
                `** TOTAL ROLES: **\n${member.roles.cache.map(roles => `${roles}`).join(', ')} `
            )
        } else {
            embed.addField(
                `__ROLES__[${member.roles.cache.size}]`,
                `** TOTAL ROLES: ** To many roles to show here!`
            )
        }
        return message.reply({ embeds: [embed] });
    }
};