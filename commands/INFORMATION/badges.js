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

        const target = message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]) ||
            message.guild.members.cache.get(message.author.id),
            team = db.get("team" + target.user.id),
            partner = db.get("partner" + target.user.id),
            sup = db.get("supporter" + target.user.id),
            spec = db.get("special" + target.user.id),
            codev = db.get("codev" + target.user.id),
            dev = db.get("developer" + target.user.id),
            owner = db.get("owner" + target.user.id),
            coow = db.get("coowner" + target.user.id),
            bug = db.get("bug" + target.user.id),
            one = db.get("one" + target.user.id),
            early = db.get("early" + target.user.id),
            admin = db.get("admin" + target.user.id),
            mod = db.get("mod" + target.user.id),
            vip = db.get("vip" + target.user.id),
            superr = db.get("super" + target.id),
            beta = db.get('beta' + target.id);

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
            admin === null && mod === null && vip === null && beta === null
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
        if (admin === true) {
            badges.push(
                `__**${client.badge.admin} ADMIN**__`
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
        embed.setDescription(badges.join("\n"))
        return message.reply({ embeds: [embed] });
    },
};
