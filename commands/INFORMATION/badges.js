const { MessageEmbed } = require("discord.js"),
    db = require("quick.db");

module.exports = {
    name: "badge",
    aliases: ["badges"],
    category: "INFORMATION",
    userPermissions: [],
    description: "shows the badges you own with this bot",
    usage: "badge",
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        if (!args[0]) {
            var target = message.guild.members.cache.get(message.author.id)
        } else {
            target = message.mentions.members.first() ||
                message.guild.members.cache.get(args[0]) ||
                message.guild.members.cache.find(
                    r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
                ) ||
                message.guild.members.cache.find(
                    ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
                )
            if (!target) {
                target = await message.guild.members.fetch(args[0]).catch(() => null)
            }
            if (!target) {
                target = message.guild.members.cache.get(message.author.id)
            }
        }
        let team = db.get(`team-1${target.user.id}`),
            partner = db.get(`partner-1${target.user.id}`),
            sup = db.get(`supporter-1${target.user.id}`),
            spec = db.get(`special-1${target.user.id}`),
            codev = db.get(`codev-1${target.user.id}`),
            dev = db.get(`developer-1${target.user.id}`),
            owner = db.get(`owner-1${target.user.id}`),
            coow = db.get(`coowner-1${target.user.id}`),
            bug = db.get(`bug-1${target.user.id}`),
            one = db.get(`one-1${target.user.id}`),
            early = db.get(`early-1${target.user.id}`),
            admin = db.get(`admin-1${target.user.id}`),
            mod = db.get(`mod-1${target.user.id}`),
            vip = db.get(`vip-1${target.user.id}`),
            superr = db.get(`super-1${target.id}`),
            beta = db.get(`beta-1${target.id}`),
            staff = db.get(`staff-1${target.id}`),
            hadmin = db.get(`hadmin-1${target.id}`),
            hmod = db.get(`hmod-1${target.id}`),
            fuckoff = db.get(`fuckoff-1${target.id}`),
            voted = await client.qdb.get(`voted${target.id}`);

        let badges = [],
            memName;
        if (target.displayName === null) {
            memName = target.user.username;
        } else {
            memName = target.displayName;
        }
        const embed = new MessageEmbed()
            .setColor(client.embed.cm)
            .setTitle(`${memName}'s Badges`)
            .setThumbnail(
                target.user.displayAvatarURL({ dynamic: true })
            );

        if (
            owner === null && spec === null && dev === null &&
            coow === null && codev === null && team === null &&
            partner === null && sup === null && bug === null &&
            superr === null && one === null && early === null &&
            admin === null && mod === null && vip === null &&
            beta === null && voted === null && staff === null &&
            hadmin === null && hmod === null && fuckoff === null
        ) {
            embed.setDescription("__**You Don't Have Any Badge Yet!**__");
            embed.addField(
                "Want A Badge For Yourself",
                `Join [Support Server](${client.config.bserver}) and try getting one!`
            );
        }
        if (owner === true) {
            badges.push(
                `__**${client.badge.owner} OWNER**__`
            );
        }
        if (hadmin === true) {
            badges.push(
                `__**${client.badge.hadmin} HEAD ADMIN**__`
            );
        }
        if (admin === true) {
            badges.push(
                `__**${client.badge.admin} ADMIN**__`
            );
        }
        if (staff === true) {
            badges.push(
                `__**${client.badge.dmod} STAFF**__`
            );
        }
        if (hmod === true) {
            badges.push(
                `__**${client.badge.hmod} HEAD MOD**__`
            );
        }
        if (mod === true) {
            badges.push(
                `__**${client.badge.mod} MOD**__`
            );
        }
        if (vip === true) {
            badges.push(
                `__**${client.badge.vip} VIP**__`
            );
        }
        if (one === true) {
            badges.push(
                `__**${client.badge.one} ONE AND ONLY**__`
            );
        }
        if (superr === true) {
            badges.push(
                `__**${client.badge.superr} MOST SPECIAL**__`
            );
        }
        if (spec === true) {
            badges.push(
                `__**${client.badge.special} SPECIAL**__`
            );
        }
        if (coow === true) {
            badges.push(
                `__**${client.badge.coow} CO-OWNER**__`
            );
        }
        if (dev === true) {
            badges.push(
                `__**${client.badge.dev} DEVELOPER**__`
            );
        }
        if (codev === true) {
            badges.push(
                `__**${client.badge.codev} CO-DEVELOPER**__`
            );
        }
        if (team === true) {
            badges.push(
                `__**${client.badge.team} TEAM**__`
            );
        }
        if (partner === true) {
            badges.push(
                `__**${client.badge.partner} PARTNER**__`
            );
        }
        if (early === true) {
            badges.push(
                `__**${client.badge.early} EARLY SUPPORTER**__`
            );
        }
        if (sup === true) {
            badges.push(
                `__**${client.badge.supporter} SUPPORTER**__`
            );
        }
        if (bug === true) {
            badges.push(
                `__**${client.badge.bug} BUG HUNTER**__`
            );
        }
        if (beta === true) {
            badges.push(
                `__**${client.emoji.marvel} BETA TESTER**__`
            )
        }
        if (voted === true) {
            badges.push(
                `__**${client.emoji.voted} VOTER**__`
            )
        }
        if (fuckoff === true) {
            badges.push(
                `__**${client.badge.fuckoff} Fuck Off **__`
            )
        }
        embed.setDescription(badges.join("\n"))
        return message.reply({ embeds: [embed] });
    },
};
