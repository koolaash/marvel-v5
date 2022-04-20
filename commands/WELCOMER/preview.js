const discord = require("discord.js"),
    db = require("quick.db"),
    moment = require("moment"),
    ms = require("ms");

module.exports = {
    name: "welcomeexample",
    aliases: ["wexample", "preview"],
    desciption: "show a preview of embed welcomer",
    category: "WELCOME",
    usage: "welcomeexample",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {
        let defprefix = client.config.pprefix;
        const nprefix = db.get(`guildPrefix_${message.guild.id}`);
        if (nprefix !== null) {
            defprefix = nprefix;
        }
        let prefix = defprefix
        let member = message.guild.members.cache.get(message.author.id);

        const ment = db.get("mention" + message.guild.id),
            ust = db.get("userinfo" + message.guild.id);

        let default_url = client.gif.wel;

        let default_msg = `<a:op2_:764200161793540106> **MAKE SURE TO READ RULES**

<a:op2_:764200161793540106> **TAKE SELF ROLES**

<a:op2_:764200161793540106> **ENJOY YOUR STAY HERE**

`;
        let createdate = `<t:${Math.round(member.user.createdAt / 1000)}:R>`,
            joindate = `<t:${Math.round(member.user.joinedAt / 1000)}:R>`,
            m1 = db.get(`msg_${message.guild.id}`);
        if (!m1) m1 = default_msg;
        const msg = m1
            .replace("{joined}", createdate)
            .replace("{member}", member.user)
            .replace("{member.guild}", message.guild)
            .replace("{server}", message.guild)
            .replace("{member.user.tag}", member.user.tag)
            .replace("{tag}", member.user.tag)
            .replace("{member.user.usercount}", member.user.usercount)
            .replace("{membercount}", member.user.usercount);

        let url = db.get(`url_${message.guild.id}`);
        if (url === null) url = default_url; let colour = db.get("welClr" + message.guild.id)
        if (!colour) {
            colour = client.embed.cm
        }
        let wembed = new discord.MessageEmbed()
            .setAuthor(message.guild)
            .setTitle("━━━━━━━━━━━━━━━━━")
            .setColor(colour)
            .setImage(url)
            .setDescription(msg)
            .setFooter({
                text: member.user.tag,
                iconURL: member.user.displayAvatarURL({ dynamic: true })
            })

        if (ust === true) {
            wembed.addField(
                "━━━━━━━━━━━━━━━━━",
                `

${client.emoji.ar} **MEMBER USERNAME :-** __**${member.user.tag}**__

${client.emoji.ar} **MEMBER JOINED DISCORD AT :-** __**${createdate}**__

${client.emoji.ar} **MEMBER JOINED SERVER AT :-** __**${joindate}**__

${client.emoji.ar} **MEMBER COUNT :-** **__${message.guild.memberCount}__**

`
            )
        }
        wembed.addField(
            "━━━━━━━━━━━━━━━━━",
            `

${client.emoji.bot} **THANKS FOR JOINING ${message.guild}** ${client.emoji.bot}`
        );
        try {
            if (ment === true) {
                message.channel.send({
                    contemt: `**<@${member.user.id}> Welcome To ${message.guild.name}**`,
                    embeds: [wembed]
                });
            } else {
                message.channel.send({ embeds: [wembed] });
            }
        } catch (e) {
            return console.log(e);
        }
    }
};
