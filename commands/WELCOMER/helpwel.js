const discord = require("discord.js"),
    db = require("quick.db");

module.exports = {
    name: "helpwel",
    aliases: ["helpwelcome"],
    description: "shows the help menu of embed welcomer",
    category: "WELCOME",
    usage: "helpwel",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {
        let defprefix = client.config.pprefix;
        const nprefix = db.get(`guildPrefix_${message.guild.id}`);
        if (nprefix !== null) {
            defprefix = nprefix;
        }
        let prefix = defprefix,
            embed = new discord.MessageEmbed()
                .setTitle(
                    `${client.emoji.bot}| WELCOMER HELP | ${client.emoji.bot}`
                )
                .addField(
                    `${client.emoji.ar}| How It Works`,
                    `Our Bot has a different type of welcomer includes more than one commands :-`
                )
                .addField(
                    `${client.emoji.ar}| Welcome Example`,
                    `\`${prefix}welcomeexample or ${prefix}wexample\` to see how the welcomer looks like`
                )
                .addField(
                    `${client.emoji.ar}| Set Channel`,
                    `\`${prefix}set welcome channel <#channel> \`to set welcome channel`
                )
                .addField(
                    `${client.emoji.ar}| Set Colour/Color`,
                    `\`${prefix}set welcome colour <color code or name in CAPITAL> \`to set welcome embed colour`
                )
                .addField(
                    `${client.emoji.ar}| Set Message`,
                    `\`${prefix}set welcomd msg <msg>\` to set welcome message make sure to use\` ${prefix}wexample\` before setting up`
                )
                .addField(
                    `${client.emoji.ar}| Set Image`,
                    `\`${prefix}set welcome img <url>\` to set welcome image (must use url)`
                )
                .addField(
                    `${client.emoji.ar}| Reset Image`,
                    `\`${prefix}reset welcome img\` to reset welcome image`
                )
                .addField(
                    `${client.emoji.ar}| Reset Message`,
                    `\`${prefix}reset welcome msg\` to reset welcome message`
                )
                .addField(
                    `${client.emoji.ar}| Message`,
                    `\`${prefix}reset welcome channel\` - to disable embed welcomer`
                )
                .addField(
                    `${client.emoji.ar}| Mention Toggle`,
                    `\`${prefix}mention\` - to turn Off/On mention user outside the welcomer`
                )
                .addField(
                    `${client.emoji.ar}| UserInfo Toggle`,
                    `\`${prefix}userinfo/ui\` - to toggle userinfo in welcomer`
                )
                .addField(
                    client.emoji.ar + "| Miscellaneous Settings",
                    "{member} - mention member in message\n" +
                    "{server} - to put your server name in msg\n" +
                    "{joined} - to put the date when member joined\n" +
                    "{tag} - to put member user tag in msg\n" +
                    "{usercount} - to put member count of your guild in server"
                )
                .addField(
                    `${client.emoji.invite}| Invite`,
                    `[discord.gg/invite](${client.config.binvite})`
                )
                .addField(
                    `${client.emoji.discord}| **Support Server**`,
                    `[discord.gg/support](${client.config.bserver})`
                )
                .addField(
                    `${client.emoji.image}| Image`,
                    "Below Is An Image Of What Things Can Be Changed"
                )
                .setImage(
                    "https://cdn.discordapp.com/attachments/799624878109622312/814738236869836830/20210226_112833.jpg"
                )
                .setColor(client.embed.cm)
                .setThumbnail(client.user.avatarURL())
                .setFooter({
                    text: message.author.tag,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                });
        return message.reply({ embeds: [embed] });
    }
};
