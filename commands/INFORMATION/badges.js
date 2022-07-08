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
            var target = message.guild.members.cache.get(message.author.id);
        } else {
            target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) ||
                message.guild.members.cache.find(
                    r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
                ) ||
                message.guild.members.cache.find(
                    ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
                );
            if (!target) {
                target = await message.guild.members.fetch(args[0]).catch(() => null);
            }
            if (!target) {
                target = message.guild.members.cache.get(message.author.id);
            }
        }

        const guild = client.guilds.cache.get(client.role.guild);
        guild.members.fetch();
        const target2 = guild.members.cache.get(target.id);

        let spec = db.get(`special-1${target.user.id}`),
            one = db.get(`one-1${target.user.id}`),
            superr = db.get(`super-1${target.id}`),
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

        if (target2) {
            if (target2.roles.cache.has(client.role.owner)) {
                var owner = true;
                badges.push(
                    `__**${client.badge.owner} OWNER**__`
                );
            }
            if (target2.roles.cache.has(client.role.developer)) {
                var developer = true;
                badges.push(
                    `__**${client.badge.dev} DEVELOPER**__`
                );
            }
            if (target2.roles.cache.has(client.role.codev)) {
                var codev = true;
                badges.push(
                    `__**${client.badge.codev} CO-DEVELOPER**__`
                );
            }
            if (target2.roles.cache.has(client.role.coowner)) {
                var coowner = true;
                badges.push(
                    `__**${client.badge.coow} CO-OWNER**__`
                );
            }
            if (target2.roles.cache.has(client.role.team)) {
                var team = true;
                badges.push(
                    `__**${client.badge.team} TEAM**__`
                );
            }
            if (target2.roles.cache.has(client.role.premium)) {
                var premium = true;
                badges.push(
                    `__**${client.badge.premium} PREMIUM**__`
                );
            }
            if (target2.roles.cache.has(client.role.booster)) {
                var booster = true;
                badges.push(
                    `__**${client.badge.booster} BOOSTER**__`
                );
            }
            if (target2.roles.cache.has(client.role.hadmin)) {
                var hadmin = true;
                badges.push(
                    `__**${client.badge.hadmin} HEAD ADMIN**__`
                );
            }
            if (target2.roles.cache.has(client.role.admin)) {
                var admin = true;
                badges.push(
                    `__**${client.badge.admin} ADMIN**__`
                );
            }
            if (target2.roles.cache.has(client.role.hmod)) {
                var hmod = true;
                badges.push(
                    `__**${client.badge.hmod} HEAD MOD**__`
                );
            }
            if (target2.roles.cache.has(client.role.mod)) {
                var mod = true;
                badges.push(
                    `__**${client.badge.mod} MOD**__`
                );
            }
            if (target2.roles.cache.has(client.role.staff)) {
                var staff = true;
                badges.push(
                    `__**${client.badge.dmod} STAFF**__`
                );
            }
            if (target2.roles.cache.has(client.role.vip)) {
                var vip = true;
                badges.push(
                    `__**${client.badge.vip} VIP**__`
                );
            }
            if (target2.roles.cache.has(client.role.friends)) {
                var friends = true;
                badges.push(
                    `__**${client.badge.friends} FRIENDS**__`
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
            if (target2.roles.cache.has(client.role.partner)) {
                var partner = true;
                badges.push(
                    `__**${client.badge.partner} PARTNER**__`
                );
            }
            if (target2.roles.cache.has(client.role.early)) {
                var early = true;
                badges.push(
                    `__**${client.badge.early} EARLY SUPPORTER**__`
                );
            }
            if (target2.roles.cache.has(client.role.supporter)) {
                var supporter = true;
                badges.push(
                    `__**${client.badge.supporter} SUPPORTER**__`
                );
            }
            if (target2.roles.cache.has(client.role.bug)) {
                var bug = true;
                badges.push(
                    `__**${client.badge.bug} BUG HUNTER**__`
                );
            }
            if (target2.roles.cache.has(client.role.beta)) {
                var beta = true;
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
        }
        if (
            fuckoff !== true && voted !== true && superr !== true && spec !== true && one !== true &&
            developer !== true && codev !== true && owner !== true && coowner !== true && team !== true &&
            partner !== true && bug !== true && hadmin !== true && admin !== true && mod !== true && hmod !== true &&
            staff !== true && booster !== true && beta !== true && vip !== true && early !== true && supporter !== true &&
            friends !== true && premium !== true
        ) {
            embed.addField(
                "Want A Badge For Yourself",
                `Join [Support Server](${client.config.bserver}) and try getting one!`
            );
        } else {
            embed.setDescription(badges.join("\n"));
        }
        return message.reply({ embeds: [embed] });
    },
};
