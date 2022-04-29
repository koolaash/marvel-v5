const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");

module.exports = {
    name: "help",
    description: "show help menu",
    category: "HELP",
    usage: "help [page number | command name]",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {
        let damon = client.users.cache.get(client.config.damon_id),
            mer = args.join(" "),
            arg = mer.toLowerCase().split(/ +/g);

        const data = await client.prefixModel.findOne({
            GuildID: message.guild.id,
        }),
            defprefix = data ? `${data.Prefix}` : `${client.config.prefix}`;

        let p = defprefix,
            prefix = defprefix;

        if (!damon) {
            damon = await client.users.fetch(client.config.damon_id)
        }

        let pages = 19,
            em0 = new MessageEmbed()
                .setTitle(`${client.user.username} Help Menu`)
                .setColor(client.embed.cm)
                .setImage(client.gif.cm)
                .setFooter({
                    text: `Made with 💖 by ${client.config.owner_tag}`,
                    iconURL: damon.displayAvatarURL({ dynamic: true })
                })
                .setDescription(
                    `• Prefix for this server is ${p}\n` +
                    `• Total commands: ${client.config.commands}\n` +
                    `• [Get Marvel](${client.config.binvite}) | [Support server](${client.config.bserver}) | [Vote Marvel](${client.config.bvote})\n` +
                    `• Type \`${p}help <command | module>\` for more info.`
                )
                .addField(
                    "MAIN COMMANDS",
                    "**" +
                    client.emoji.extra + "Information\n" +
                    client.emoji.channels + "Channels\n" +
                    client.emoji.mod + "Mod\n" +
                    client.emoji.tournament + "Tournament\n" +
                    client.emoji.members + "Afk\n" +
                    client.emoji.tool + "Embed\n" +
                    client.emoji.dm + "Welcomer\n" +
                    client.emoji.servers + "Ticket\n" +
                    client.emoji.ping + "Fonts\n" +
                    client.emoji.music + "Server\n" +
                    client.emoji.image + "Avatar\n" +
                    client.emoji.uptime + "Roles\n" +
                    client.emoji.auto + "Automoderation**",
                    true
                )
                .addField(
                    'NSFW COMMANDS', '**' +
                    client.emoji.servers + 'Hentai\n' +
                    client.emoji.image + 'Neko\n' +
                    client.emoji.extra + 'Porn\n' +
                    client.emoji.channels + " " + p + 'nsfw-setup for quick commands system**',
                    true
                )
                .addField(
                    'FUN COMMANDS', '**' +
                    client.emoji.extra + 'Actions\n' +
                    client.emoji.image + 'Image, Filter and Manipulation\n' +
                    client.emoji.ping + 'Fun**',
                    true
                )
                .setImage(client.gif.main),
            em1 = new MessageEmbed()
                .setColor(client.embed.cm)
                .setFooter({
                    text: `${message.author.tag} : Page 1/${pages}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .addField(
                    "INFORMATION" + "\n━━━━━━━━━━━━━━━━━",
                    "`" +
                    p +
                    "invite` - bots invite & support\n`" +
                    p +
                    "ping ` - check the ping of the bot\n`" +
                    p +
                    "policy` - know about our policy and data security\n`" +
                    p +
                    "serverinfo` - get details about the server\n`" +
                    p +
                    "whois <@user/user_id>` - get details about any user\n`" +
                    p +
                    "stats` - get the stats of the bot\n`" +
                    p +
                    "badge` - to check your badges given to you by bot\n`" +
                    p +
                    "roleinfo <@role>` - to check info of any role`" +
                    + "\n**━━━━━━━━━━━━━━━━━**"
                )
                .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND")
                .setImage(client.gif.useful),
            em2 = new MessageEmbed()
                .setColor(client.embed.cm)
                .setFooter({
                    text: `${message.author.tag} : Page 2/${pages}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .addField(
                    "CHANNELS" + "\n━━━━━━━━━━━━━━━━━",
                    "`" +
                    p +
                    "hide or hide @user/@role` - hide the channel command is used in for any role or member\n`" +
                    p +
                    "unhide or unhide @user/@role` - unhide the channel for everyone command is used in\n`" +
                    p +
                    "lock or lock @user/@role` - hide the channel command is used in for any role or member\n`" +
                    p +
                    "unlock or unlock @user/@role` - hide the channel command is used in for any role or member\nYou Can Provide Id Also Instead Of Mention\n`" +
                    p +
                    "enable #channel/channel_id` - to enable bot commands in that channel\n`" + p + "disable #channel/channel_id` - to disable bot commands in that channel" +
                    "\n**━━━━━━━━━━━━━━━━━**"
                )
                .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND")
                .setImage(client.gif.channel),
            em3 = new MessageEmbed()
                .setColor(client.embed.cm)
                .setFooter({
                    text: `${message.author.tag} : Page 3/${pages}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .addField(
                    "MODERATION" + "\n━━━━━━━━━━━━━━━━━",
                    "`" +
                    p + "kick <user> [reason]` - to kick any user from the server\n`" +
                    p + "ban <user> [reason]` - to ban any user from the server\n`" +
                    p + "unban <user> [reason]` - to unban any user from the server\n`" +
                    p + "mute <user> <time> [reason]` - to mute any user in the server\n`" +
                    p + "unmute <user> [reason]` - to unmute any user in the server\n`" +
                    p + "addrole` - gives role to someone use command to know more usages\n`" +
                    p + "removerole` - takes role from someone use command to know more usages\n`" +
                    p + "nick <user> <nickname>` - changes nickname of users\n`" +
                    p + "purge <amount | user | bots | images>` - purge messages in a channel\n`" +
                    p + "autorole <set|show|reset>` - to change settings of autorole\n`" +
                    p + "modonly` - to set the bot to mod only Needs\n`" +
                    p + "roleicon <@role> <emoji>` - to set the icon of any role\n`" +
                    p + "steal <emoji>` - to add any emoji from other srver to yours" +
                    "\n**━━━━━━━━━━━━━━━━━**"
                )
                .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND")
                .setImage(client.gif.mod),
            em4 = new MessageEmbed()
                .setColor(client.embed.cm)
                .setFooter({
                    text: `${message.author.tag} : Page 4/${pages}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .setImage(client.gif.afk)
                .addField(
                    "AFK" + "\n━━━━━━━━━━━━━━━━━",
                    "`" +
                    p + "afk <reason>` - to set your afk\n`" +
                    p + "afk-clear <@user>` - to clear anyone's afk" + "\n**━━━━━━━━━━━━━━━━━**"
                )
                .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND"),
            em5 = new MessageEmbed()
                .setColor(client.embed.cm)
                .setFooter({
                    text: `${message.author.tag} : Page 5/${pages}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                }).setImage(client.gif.embeds)
                .addField(
                    "EMBED" + "\n━━━━━━━━━━━━━━━━━",
                    "`" +
                    p + "announce #channel <follow process>` - to announce something in embed with modefied way\n`" +
                    p + "emb <message>` - to send quick embed in same channel\n`" +
                    p + "idp #channel`- to announce something in embed with modefied way\n`" +
                    p + "qidp [room-id] [room-pass]` - to send quick idp in message channel\n`" +
                    p + "say <message>` - to send any message via bot in non embed form/n`" +
                    p + "reply <message>` - to send any message via bot in non embed form`" +
                    "\n**━━━━━━━━━━━━━━━━━**"
                )
                .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND"),
            em6 = new MessageEmbed()
                .setColor(client.embed.cm)
                .setFooter({
                    text: `${message.author.tag} : Page 6/${pages}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .setImage(client.gif.welcomer)
                .addField(
                    "WELCOMER" + "\n━━━━━━━━━━━━━━━━━",
                    "`" +
                    p + "helpwelcome | helpwel` - to get the help menu of embeded welcomer\n`" +
                    p + "nhelpwelcome | nhelpwel` - to get the help menu of non embeded welcomer\n`" +
                    p + "preview` - to get the preview of embeded welcomer\n`" +
                    p + "npreview` - to get the preview of non embed welcomer\n`" +
                    p + "reset <welcome | nwelcome>` - run helpwelcome or nhelpwelcome for more info\n`" +
                    p + "set <welcome | nwelcome>` - run helpwelcome or nhelpwelcome for more info`" +
                    "\n**━━━━━━━━━━━━━━━━━**"
                )
                .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND"),
            em7 = new MessageEmbed()
                .setColor(client.embed.cm)
                .setFooter({
                    text: `${message.author.tag} : Page 7/${pages}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .addField(
                    `TICKET\n━━━━━━━━━━━━━━━━━`,
                    "`" +
                    p +
                    "ticket channel <#channel>` - create a ticket\n`" +
                    p +
                    "ticket role <@role>` - to add a ticket support role\n`" +
                    p +
                    "ticket details` - to see if the ticket is already setup" +
                    "\n**━━━━━━━━━━━━━━━━━**"
                )
                .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND")
                .setImage(client.gif.ticket),
            em8 = new MessageEmbed()
                .setColor(client.embed.cm)
                .setFooter({
                    text: `${message.author.tag} : Page 8/${pages}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .addField(
                    `FONTS\n━━━━━━━━━━━━━━━━━`,
                    "`" +
                    p +
                    "font boldfancy(bf) <message>` - to get text in this `𝐌𝐚𝐫𝐯𝐞𝐥` font\n`" +
                    p +
                    "font bolditalic(bi) <message>` - to get text in this `𝑴𝒂𝒓𝒗𝒆𝒍` font\n`" +
                    p +
                    "font circle1(c1) <message>` - to get text in this `🅜︎🅐︎🅡︎🅥︎🅔︎🅛︎` font\n`" +
                    p +
                    "font circle2(c2) <message>` - to get text in this `Ⓜ︎Ⓐ︎ⓇⓋ︎Ⓔ︎Ⓛ︎` font\n`" +
                    p +
                    "font comic <message>` - to get text in this `ᗰᗩᖇᐯᗴᒪ` font\n`" +
                    p +
                    "font double <message>` - to get text in this `𝕄𝕒𝕣𝕧𝕖𝕝` font\n`" +
                    p +
                    "font italic <message>` - to get text in this `𝑀𝑎𝑟𝑣𝑒𝑙` font\n`" +
                    p +
                    "font script <message>` - to get text in this `𝓜𝓪𝓻𝓿𝓮𝓵` font\n`" +
                    p +
                    "font superscript(ss) <message>` - to get text in this `ᵐᵃʳᵛᵉˡ` font\n`" +
                    p +
                    "font style <message>` - to get text in this `𝔐𝔞𝔯𝔳𝔢𝔩` font\n`" +
                    p +
                    "font stylebold(sb) <message>` - to get text in this `𝕸𝖆𝖗𝖛𝖊𝖑` font\n`" +
                    p +
                    "font typewriter(type) <message>` - to get text in this `𝙼𝚊𝚛𝚟𝚎𝚕` font\n`" +
                    p +
                    "font smallcaps(sc) <message>` - to get text in this `ᴍᴀʀᴠᴇʟ` font" + "\n**━━━━━━━━━━━━━━━━━**"
                )
                .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND")
                .setImage(client.gif.fonts),
            em9 = new MessageEmbed()
                .setColor(client.embed.cm)
                .setFooter({
                    text: `${message.author.tag} : Page 9/${pages}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .addField(
                    `SERVER CONFIG\n━━━━━━━━━━━━━━━━━`,
                    "`" +
                    p + "mmode <on|off>` - to turn on or off the mantainance mode`\n" +
                    p + "snipe` - get the previosly deleted message\n`" +
                    p + "prefix <new prefix>` - to change bots prefix\n`" +
                    p + "prefix reset` - to change bots prefix to default" +
                    "\n**━━━━━━━━━━━━━━━━━**"
                )
                .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND")
                .setImage(client.gif.useful),
            em10 = new MessageEmbed()
                .setColor(client.embed.cm)
                .setFooter({
                    text: `${message.author.tag} : Page 10/${pages}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .addField(
                    "AVATAR" + "\n━━━━━━━━━━━━━━━━━",
                    "`" +
                    p +
                    "avatar <@user>` - to get user main avatar\n`" +
                    p +
                    "avs <@user>` - to get user server avatar\n`" +
                    p +
                    "sav` - to get user server avatar\n`" +
                    p +
                    "banner <@user>` - to get user main banner" +
                    "\n**━━━━━━━━━━━━━━━━━**"
                )
                .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND")
                .setImage(client.gif.avatar),
            em11 = new MessageEmbed()
                .setColor(client.embed.cm)
                .setFooter({
                    text: `${message.author.tag} : Page 11/${pages}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .setDescription(
                    "**ROLES" + "\n━━━━━━━━━━━━━━━━━**\n" +
                    "`" +
                    p +
                    "selfrole` - to start interactive self role setup\n`" +
                    p +
                    "modrole <set | show | reset>` - to set or see mod role\n`" +
                    p +
                    "admin <role @role | show | reset | @user>` - to set, see or give admin role to any user\n`" +
                    p +
                    "friend <role @role | show | reset | @user>` - to set, see or give friend role to any user\n`" +
                    p +
                    "girl <role @role | show | reset | @user>` - to set, see or give girl role to any user\n`" +
                    p +
                    "guest <role @role | show | reset | @user>` - to set, see or give guest role to any user\n`" +
                    p +
                    "headadmin <role @role | show | reset | @user>` - to set, see or give headadmin role to any user\n`" +
                    p +
                    "headmod <role @role | show | reset | @user>` - to set, see or give headmod role to any user\n`" +
                    p +
                    "mod <role @role | show | reset | @user>` - to set, see or give mod role to any user\n`" +
                    p +
                    "official <role @role | show | reset | @user>` - to set, see or give official role to any user\n`" +
                    p +
                    "staff <role @role | show | reset | @user>` - to set, see or give staff role to any user\n`" +
                    p +
                    "vip <role @role | show | reset | @user>` - to set, see or give vip role to any user`" +
                    "\n**━━━━━━━━━━━━━━━━━**"
                )
                .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND")
                .setImage(client.gif.role),
            a = "am ",
            em12 = new MessageEmbed()
                .setColor(client.embed.cm)
                .setFooter({
                    text: `${message.author.tag} : Page 12/${pages}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .addField(
                    "AUTOMODERATION" + "\n━━━━━━━━━━━━━━━━━",
                    "`" +
                    p + a +
                    "auto` - to automatically set the automod configurations for you\n`" +
                    p + a +
                    "reset` - to reset the automod configurations\n`" +
                    p + a +
                    "badword/bw <toggle | add | remove | show | clear>` - to change or set anti badword config\n`" +
                    p + a +
                    "link toggle` - to change or set anti link config\n`" +
                    p + a +
                    "massmention/mm role <toggle | limit>` - to change or set anti massmention config or roles\n`" +
                    p + a +
                    "massmention/mm user <toggle | limit>` - to change or set anti massmention config of users\n`" +
                    p + a +
                    "capital/caps <toggle | limit>` - to change or set anti caps config\n`" +
                    p + a +
                    "emoji <toggle | limit>` - to change or set anti emoji config\n`" +
                    p + a +
                    "spam <toggle | limit>` - to change or set anti spam config\n`" +
                    p +
                    "ignore role <@role | role_id>` - to add the role from ignored list\n`" +
                    p +
                    "ignore channel <#channel | channel_id>` - to add any channel from ignored list\n`" +
                    p +
                    "unignore role <@role | role_id>` - to remove the role from ignored list\n`" +
                    p +
                    "unignore channel <#channel | channel_id>` - to remove any channel from ignored list" +
                    "\n**━━━━━━━━━━━━━━━━━**"
                )
                .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND")
                .setImage(client.gif.automod),
            em13 = new MessageEmbed()
                .setColor(client.embed.cm)
                .setFooter({
                    text: `${message.author.tag} : Page 13/${pages}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .setImage(client.gif.nsfw)
                .addField(
                    "HENTAI COMMANDS", "**━━━━━━━━━━━━━━━━━**\n" +
                    "`" +
                    prefix +
                    "hentai <midriff/riff>` - get a hentai nsfw image/gif of this category\n`" +
                    prefix +
                    "hentai <anal>` - get a hentai nsfw image/gif of this category\n`" +
                    prefix +
                    "hentai <ass>` - get a hentai nsfw image/gif of this category\n`" +
                    prefix +
                    "hentai <random>` - get a hentai nsfw image/gif of this category\n`" +
                    prefix +
                    "hentai <pussy>` - get a hentai nsfw image/gif of this category\n`" +
                    prefix +
                    "hentai <thigh>` - get a hentai nsfw image/gif of this category" +
                "\n**━━━━━━━━━━━━━━━━━**"
                )
                .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND"),
            em14 = new MessageEmbed()
                .setColor(client.embed.cm)
                .setFooter({
                    text: `${message.author.tag} : Page 14/${pages}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .setImage(client.gif.nsfw)
                .addField(
                    "NEKO COMMANDS", "**━━━━━━━━━━━━━━━━━**\n" +
                    "`" +
                    prefix +
                    "neko <boobs/boob>` - get a neko nsfw image/gif of this category\n`" +
                    prefix +
                    "neko <nero>` - get a neko nsfw image/gif of this category\n`" +
                    prefix +
                    "neko <feet>` - get a neko nsfw image/gif of this category\n`" +
                    prefix +
                    "neko <lewd>` - get a neko nsfw image/gif of this category\n`" +
                    prefix +
                    "neko <pussy>` - get a neko nsfw image/gif of this category\n`" +
                    prefix +
                    "neko <solo>` - get a neko nsfw image/gif of this category\n`" +
                    prefix +
                    "neko <blowjob/bj>` - get a neko nsfw image/gif of this category\n`" +
                    prefix +
                    "neko <cumart>` - get a neko nsfw image/gif of this category\n`" +
                    prefix +
                    "neko <cumslit/cs>` - get a neko nsfw image/gif of this category\n`" +
                    prefix +
                    "neko <futanari>` - get a neko nsfw image/gif of this category\n`" +
                    prefix +
                    "neko <lesbian/lesbo>` - get a neko nsfw image/gif of this category" +
                "\n**━━━━━━━━━━━━━━━━━**"
                )
                .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND"),
            em15 = new MessageEmbed()
                .setColor(client.embed.cm)
                .setFooter({
                    text: `${message.author.tag} : Page 15/${pages}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .setImage(client.gif.nsfw)
                .addField(
                    "TEEN PORN COMMANDS", "**━━━━━━━━━━━━━━━━━**\n" +
                    "`" +
                    prefix +
                    "phub ` - get a real nsfw category - use command for more info\n`" +
                    prefix +
                    "porn <anal>` - get a real nsfw image/gif of this category\n`" +
                    prefix +
                    "porn <ass>` - get a real nsfw image/gif of this category\n`" +
                    prefix +
                    "porn <boob/boobs>` - get a real nsfw image/gif of this category\n`" +
                    prefix +
                    "porn <4k>` - get a real nsfw image/gif of this category\n`" +
                    prefix +
                    "porn <pussy>` - get a real nsfw image/gif of this category\n`" +
                    prefix +
                    "porn <gif>` - get a real nsfw image/gif of this category\n`" +
                    prefix +
                    "porn <thigh>" + "` - get a real nsfw image/gif of this category\n**━━━━━━━━━━━━━━━━━**"
                )
                .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND"),
            em16 = new MessageEmbed()
                .setColor(client.embed.cm)
                .setFooter({
                    text: `${message.author.tag} : Page 16/${pages}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .setImage(client.gif.fun)
                .addField("ACTIONS" + "\n━━━━━━━━━━━━━━━━━",
                    "`" +
                    p + "baka @user` - to call someone stupid with gif\n`" +
                    p + "cuddle @user` - to cuddle with some one and spread love\n`" +
                    p + "feed @user` - feed the one who's hungry\n`" +
                    p + "hug @user` - give hugs and spread love\n`" +
                    p + "kiss @user` - kiss someone and show them how much you love them\n`" +
                    p + "pat @user` - pat them to calm them down\n`" +
                    p + "slap @user` - slap them to show you're angry with them\n`" +
                    p + "tickle @user` - tickle them an spread some giggles\n**━━━━━━━━━━━━━━━━━**"
                )
                .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND"),
            em17 = new MessageEmbed()
                .setColor(client.embed.cm)
                .setFooter({
                    text: `${message.author.tag} : Page 17/${pages}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .setImage(client.gif.fun)
                .addField("FUN" + "\n━━━━━━━━━━━━━━━━━",
                    "`" +
                    p + "8ball <text>` -  check your fortune for your question\n`" +
                    p + "ascii <text>` - convert something into ascii\n`" +
                    p + "emojify <text>` - convert some text into emojis\n`" +
                    p + "fliptext <text>` - flip some text for fun\n`" +
                    p + "hack @user` - hack someone you wants to\n`" +
                    p + "howgay @user` - check how much of a gay they are\n**━━━━━━━━━━━━━━━━━**"
                )
                .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND"),
            em18 = new MessageEmbed()
                .setColor(client.embed.cm)
                .setFooter({
                    text: `${message.author.tag} : Page 18/${pages}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .setImage(client.gif.fun)
                .addField("IMAGE" + "\n━━━━━━━━━━━━━━━━━",
                    "`" +
                    p + "cat` - get a random image of this category\n`" +
                    p + "dog` - get a random image of this category\n`" +
                    p + "foxgirf` - get a random image of this category\n`" +
                    p + "gecg` - get a random image of this category\n`" +
                    p + "goose` - get a random image of this category\n`" +
                    p + "holo` - get a random image of this category\n`" +
                    p + "lizard` - get a random image of this category\n`" +
                    p + "mimi` - get a random image of this category\n`" +
                    p + "nitro` - fake someone with nitro\n`" +
                    p + "waifu` - get a random image of this category\n`" +
                    p + "wallpaper` - get a random image of this category\n**━━━━━━━━━━━━━━━━━**"
                )
                .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND"),
            em19 = new MessageEmbed()
                .setColor(client.embed.cm)
                .setFooter({
                    text: `${message.author.tag} : Page 19/${pages}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .setImage(client.gif.fun)
                .addField("IMAGE MANIPULATION" + "\n━━━━━━━━━━━━━━━━━",
                    "`" +
                    p + "affect [@user]` - it wont affect you XD\n`" +
                    p + "beautiful [@user]` - oh this, this is beautiful\n`" +
                    p + "blur - use blur link_of_image amout_in_number or blur amount_in_number`\n`" +
                    p + "catsay <text>` - cat says you something\n`" +
                    p + "dcblack [@user]` - covert you image into dc style with black\n`" +
                    p + "dcblue [@user]` - covert you image into dc style with blue\n`" +
                    p + "delete [@user]` - delete some trash or someone\n`" +
                    p + "facepalm [@user]` - facepalm yourself or someone\n`" +
                    p + "hitler [@user]` - hitler style LoL\n`" +
                    p + "jail [@user]` - send someone into jail\n`" +
                    p + "rip [@user]` - make someone dead and put them into coffin\n`" +
                    p + "trash [@user]` - convert a image into trash spidy style\n`" +
                    p + "trigger [@user]`- get a triggered gif of your image\n**━━━━━━━━━━━━━━━━━**"
                )
                .addField(`${client.emoji.ar}NOTE :`, "<> [] - DO NOT INCLUDE THESE WHILE EXECUTING A COMMAND")

        if (arg[0]) {
            let command = client.commands.get(arg[0]);
            if (!command) command = client.commands.get(client.aliases.get(arg[0]));
            if (command) {
                let usg = command.usage,
                    des = command.description,
                    ali = command.aliases,
                    cat = command.category,
                    ali1,
                    usg1,
                    des1,
                    cat1;

                if (!usg || usg === null || usg === undefined) {
                    usg1 = "`None`";
                } else {
                    usg1 = "`" + p + usg + "`";
                }
                if (!des || des === null || des === undefined) {
                    des1 = "`None`";
                } else {
                    des1 = "`" + des + "`";
                }
                if (!ali || ali === null || ali === undefined) {
                    ali1 = "`None`";
                } else {
                    ali1 = "`" + ali + "`";
                }
                if (!cat || cat === null || cat === undefined) {
                    cat1 = "Uncategorized";
                } else {
                    cat1 = cat;
                }

                const hel = new MessageEmbed()
                    .setTitle(cat1.toUpperCase())
                    .setDescription(
                        "```diff\n- [] = optional argument!\n" +
                        "- <> = required argument!\n" +
                        "- | = means or like red or blue!\n" +
                        "- Do NOT type these when using commands!\n```\n> " +
                        des1
                    )
                    .addField("Aliases", ali1)
                    .addField("Usage", usg1)
                    .setColor(client.embed.cm);

                return message.reply({ embeds: [hel], allowedMentions: { repliedUser: false } })
            }
        }

        let options = [],
            startButton = new MessageButton()
                .setStyle("SUCCESS")
                .setEmoji(client.emoji.first_id)
                .setCustomId("help_home"),
            backButton = new MessageButton()
                .setStyle("PRIMARY")
                .setEmoji(client.emoji.back_id)
                .setCustomId('help_back'),
            forwardButton = new MessageButton()
                .setStyle("PRIMARY")
                .setEmoji(client.emoji.next_id)
                .setCustomId('help_forward'),
            endButton = new MessageButton()
                .setStyle("SUCCESS")
                .setEmoji(client.emoji.last_id)
                .setCustomId('help_end'),
            delButton = new MessageButton()
                .setStyle("DANGER")
                .setEmoji(client.emoji.cross_id)
                .setCustomId('help_del');

        const option0 = { label: 'Home', value: '0', emoji: client.emoji.ar_id },
            option1 = { label: 'Extras', value: '1', emoji: client.emoji.extra_id },
            option2 = { label: 'Channels', value: '2', emoji: client.emoji.channels_id },
            option3 = { label: 'Mod', value: '3', emoji: client.emoji.mod_id },
            option4 = { label: 'Afk', value: '4', emoji: client.emoji.members_id },
            option5 = { label: 'Embed', value: '5', emoji: client.emoji.tool_id },
            option6 = { label: 'Welcomer', value: '6', emoji: client.emoji.dm_id },
            option7 = { label: 'Ticket', value: '7', emoji: client.emoji.servers_id },
            option8 = { label: 'Fonts', value: '8', emoji: client.emoji.ping_id },
            option9 = { label: 'Server Config', value: '9', emoji: client.emoji.music_id },
            option10 = { label: 'Avatars', value: '10', emoji: client.emoji.image_id },
            option11 = { label: 'Roles', value: '11', emoji: client.emoji.uptime_id },
            option12 = { label: 'Automoderation', value: '12', emoji: client.emoji.auto_id },
            option13 = { label: 'Hentai', value: '13', emoji: client.emoji.extra_id },
            option14 = { label: 'Neko', value: '14', emoji: client.emoji.image_id },
            option15 = { label: 'Porn', value: '15', emoji: client.emoji.servers_id },
            option16 = { label: 'Actions', value: '16', emoji: client.emoji.extra_id },
            option17 = { label: 'Fun', value: '17', emoji: client.emoji.ping_id },
            option18 = { label: 'Random Image', value: '18', emoji: client.emoji.image_id },
            option19 = { label: 'Image Filter/Manipulation', value: '19', emoji: client.emoji.image_id }

        options.push(
            option0, option1, option2, option3, option4,
            option5, option6, option7, option8, option9,
            option10, option11, option12, option13, option14,
            option15, option16, option17, option18, option19

        );

        let menu = new MessageSelectMenu()
            .setPlaceholder('Select Command Category')
            .setCustomId('pagMenu')
            .addOptions(options)
            .setMaxValues(1)
            .setMinValues(1),
            allButtons = [
                startButton.setDisabled(true),
                backButton.setDisabled(true),
                forwardButton.setDisabled(false),
                endButton.setDisabled(false),
                delButton.setDisabled(false)
            ],
            group1 = new MessageActionRow().addComponents(menu),
            group2 = new MessageActionRow().addComponents(allButtons),
            helpMessage = await message.reply({
                embeds: [em0],
                components: [group1, group2],
                allowedMentions: { repliedUser: false }
            }),
            collector = helpMessage.createMessageComponentCollector({ time: 90000 }),
            embeds = [
                em0, em1, em2, em3, em4, em5, em6, em7,
                em8, em9, em10, em11, em12, em13, em14,
                em15, em16, em17, em18, em19
            ];

        for (let i = 0; i < 0; i++) embeds.push(new MessageEmbed().setColor(client.embed.cm).setFooter(i));

        let currentPage = 0;

        collector.on('collect', async (b) => {
            if (b.user.id !== message.author.id) {
                let emm = new MessageEmbed({
                    description: `❎ ${client.error.menu}`,
                    color: client.embed.cf
                })
                return b.reply({ ephemeral: true, embeds: [emm] })
            }
            collector.resetTimer();
            switch (b.customId) {
                case "help_home":
                    currentPage = 0
                    group2 = new MessageActionRow()
                        .addComponents([
                            startButton.setDisabled(true),
                            backButton.setDisabled(true),
                            forwardButton.setDisabled(false),
                            endButton.setDisabled(false),
                            delButton.setDisabled(false)
                        ])
                    b.update({ embeds: [embeds[currentPage]], components: [group1, group2], })
                    break;
                case 'help_back':
                    --currentPage;
                    if (currentPage === 0) {
                        group2 = new MessageActionRow()
                            .addComponents([
                                startButton.setDisabled(true),
                                backButton.setDisabled(true),
                                forwardButton.setDisabled(false),
                                endButton.setDisabled(false),
                                delButton.setDisabled(false)
                            ])
                    } else {
                        group2 = new MessageActionRow()
                            .addComponents([
                                startButton.setDisabled(false),
                                backButton.setDisabled(false),
                                forwardButton.setDisabled(false),
                                endButton.setDisabled(false),
                                delButton.setDisabled(false)
                            ])
                    }
                    b.update({ embeds: [embeds[currentPage]], components: [group1, group2] })
                    break;
                case 'help_forward':
                    currentPage++;
                    if (currentPage === embeds.length - 1) {
                        group2 = new MessageActionRow()
                            .addComponents([
                                startButton.setDisabled(false),
                                backButton.setDisabled(false),
                                forwardButton.setDisabled(true),
                                endButton.setDisabled(true),
                                delButton.setDisabled(false)
                            ])
                    } else {
                        group2 = new MessageActionRow()
                            .addComponents([
                                startButton.setDisabled(false),
                                backButton.setDisabled(false),
                                forwardButton.setDisabled(false),
                                endButton.setDisabled(false),
                                delButton.setDisabled(false)
                            ])
                    }
                    b.update({ embeds: [embeds[currentPage]], components: [group1, group2] })
                    break;
                case 'help_end':
                    currentPage = embeds.length - 1;
                    group2 = new MessageActionRow().addComponents([
                        startButton.setDisabled(false),
                        backButton.setDisabled(false),
                        forwardButton.setDisabled(true),
                        endButton.setDisabled(true),
                        delButton.setDisabled(false)
                    ])
                    b.update({ embeds: [embeds[currentPage]], components: [group1, group2] })
                    break;
                case 'pagMenu':
                    currentPage = parseInt(b.values[0])
                    if (currentPage === 0) {
                        group2 = new MessageActionRow()
                            .addComponents([
                                startButton.setDisabled(true),
                                backButton.setDisabled(true),
                                forwardButton.setDisabled(false),
                                endButton.setDisabled(false),
                                delButton.setDisabled(false)
                            ])
                    } else if (currentPage === embeds.length - 1) {
                        group2 = new MessageActionRow()
                            .addComponents([
                                startButton.setDisabled(false),
                                backButton.setDisabled(false),
                                forwardButton.setDisabled(true),
                                endButton.setDisabled(true),
                                delButton.setDisabled(false)
                            ])
                    } else {
                        group2 = new MessageActionRow()
                            .addComponents([
                                startButton.setDisabled(false),
                                backButton.setDisabled(false),
                                forwardButton.setDisabled(false),
                                endButton.setDisabled(false),
                                delButton.setDisabled(false)
                            ])
                    }
                    b.update({ embeds: [embeds[currentPage]], components: [group1, group2] })
                    break;
                case 'help_del':
                    helpMessage.delete();
                    break;
                default:
                    currentPage = 0
                    b.update({ embeds: [embeds[currentPage]], components: null })
                    break;
            }
        });
        collector.on("end", (_, reason) => {
            if (reason !== "messageDelete") {
                let dis = new MessageActionRow()
                    .addComponents([
                        startButton.setDisabled(true),
                        backButton.setDisabled(true),
                        forwardButton.setDisabled(true),
                        endButton.setDisabled(true),
                        delButton.setDisabled(true)
                    ]),
                    dis2 = new MessageActionRow()
                        .addComponents(menu.setDisabled(true));
                helpMessage.edit({
                    components: [dis2, dis]
                })
            }
        });
        collector.on('error', (e) => console.log(e));
    }
};
