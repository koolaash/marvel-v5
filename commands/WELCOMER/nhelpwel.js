const discord = require("discord.js"),
    db = require("quick.db");

module.exports = {
    name: "nhelpwel",
    aliases: ["nhelpwelcome"],
    description: "nhelpwel",
    category: "WELCOME",
    usage: "shows help menu of non embed welcomer",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {
        const data = await client.prefixModel.findOne({
            GuildID: message.guild.id,
        }),
            defprefix = data ? `${data.Prefix}` : `${client.config.prefix}`;

        let prefix = defprefix,
            embed = new discord.MessageEmbed()
                .setTitle(
                    `${client.emoji.bot} NON EMBED WELCOMER HELP ${client.emoji.bot} `
                )
                .addField(
                    `${client.emoji.ar}| How It Works`,
                    `THIS IS NON EMBED WELCOMER :-`
                )
                .addField(
                    `${client.emoji.ar}| Welcome Example`,
                    `\`${prefix}nwelcomeexample or ${prefix}nwelexample\` to see how the welcomer looks like`
                )
                .addField(
                    `${client.emoji.ar}| Set Channel`,
                    `\`${prefix}set nwelcome channel <#channel> \`to set welcome channel`
                )
                .addField(
                    `${client.emoji.ar}| Set Message`,
                    `\`${prefix}set nwelcome msg <msg>\` to set welcome message make sure to use`
                )
                .addField(
                    `${client.emoji.ar}| Reset Message`,
                    `\`${prefix}reset nwelcome msg\` to reset welcome message`
                )
                .addField(
                    `${client.emoji.ar}| Diable Welcomer`,
                    `\`${prefix}reset nwelcome channel\` to disable non embed welcome`
                )
                .addField(
                    `${client.emoji.ar}| Miscellaneous Settings`,
                    "use {member} in your description for mentioning the new member"
                )
                .addField(
                    `${client.emoji.invite}| Invite`,
                    `[discord.gg/invite](${client.config.binvite})`
                )
                .addField(
                    `${client.emoji.discord}| **Support Server**`,
                    `[discord.gg/support](${client.config.bserver})`
                )
                .setImage(
                    "https://cdn.discordapp.com/attachments/817403879305379851/817434114545549312/Screenshot_20210305-220039.jpg"
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
