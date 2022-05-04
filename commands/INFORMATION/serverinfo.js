const discord = require("discord.js");

module.exports = {
    name: "serverinfo",
    aliases: ["server", "si"],
    description: "All the details about server",
    category: "INFORMATION",
    usage: "serverinfo",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {
        message.channel.sendTyping()

        let boostlevel = message.guild.premiumTier,
            emojisAva = '100'
        if (boostlevel === "0") {
            boostlevel = "None";
            emojisAva = '100'
        }
        if (boostlevel === "TIER_1") {
            boostlevel = "Level 1 <a:boosters:971417714717495356>";
            emojisAva = '200'
        }
        if (boostlevel === "TIER_2") {
            boostlevel = "Level 2 <a:boosters:971417714717495356>";
            emojisAva = '350'
        }
        if (boostlevel === "TIER_3") {
            boostlevel = "Level 3 <a:boosts:971417636577632287>";
            emojisAva = '500'
        }

        if (message.guild.region === "india") message.guild.region = "🇮🇳 India";
        if (message.guild.region === "brazil") message.guild.region = "🇧🇷 Brazil";
        if (message.guild.region === "japan") message.guild.region = "🇯🇵 Japan";
        if (message.guild.region === "russia") message.guild.region = "🇷🇺 Russia";
        if (message.guild.region === "europe") message.guild.region = "🇪🇺 Europe";
        if (message.guild.region === "sydney") message.guild.region = "🇦🇺 Sydney";
        if (message.guild.region === "singapore") message.guild.region = "🇸🇬 Singapore";
        if (message.guild.region === "hongkong") message.guild.region = "🇭🇰 Hong Kong";
        if (message.guild.region === "southafrica") message.guild.region = "🇿🇦 South Africa";
        if (message.guild.region === "us-east") message.guild.region = "🇺🇸 US East";
        if (message.guild.region === "us-west") message.guild.region = "🇺🇸 US West";
        if (message.guild.region === "us-central") message.guild.region = "🇺🇸US Central";
        if (message.guild.region === "us-south") message.guild.region = "🇺🇸 US South";
        let owner = await message.guild.fetchOwner();
        owner = message.guild.members.cache.get(owner.id)
        let uploadLimit = '8 Mb'
        if (boostlevel === "0") { uploadLimit = '8 Mb' }
        if (boostlevel === "TIER_1") { uploadLimit = '8 Mb' }
        if (boostlevel === "TIER_2") { uploadLimit = '50 Mb' }
        if (boostlevel === "TIER_2") { uploadLimit = '100 Mb' }
        await message.guild.bans.fetch()
        var textChats = message.guild.channels.cache
            .filter(ch => ch.type === 'GUILD_TEXT')
        var voiceChats = message.guild.channels.cache
            .filter(ch => ch.type === 'GUILD_VOICE')

        let embed = new discord.MessageEmbed()
            .setTitle(`${message.guild.name}`)
            .addField(
                `__ABOUT__`,
                `**Owner ${client.emoji.voted}**: ${owner.user.tag} ${owner}\n` +
                `**Server ID :** ${message.guild.id}\n` +
                `**Verification :** ${message.guild.verificationLevel}\n` +
                `**Upload Limit :** ${uploadLimit}\n` +
                `**Created On :** <t:${Math.round(message.guild.createdAt / 1000)}:R>\n` +
                `**Members :** ${message.guild.memberCount}\n` +
                `**Bans :** ${message.guild.bans.cache.size}\n` +
                `**Partnered : **${message.guild.partnered ? "Yes" : "No"}\n` +
                `**Progress Bar : **${message.guild.premiumProgressBarEnabled ? "Yes" : 'No'}\n` +
                `**Banner : ** ${message.guild.banner ? `Yes\n**Banner Link : **[Download Here](${message.guild.bannerURL({ dynamic: true })})` : 'No'}`,
                true
            )
            .addField(
                `__CHANNELS__`,
                `**Total : **${message.guild.channels.cache.size}\n` +
                `**Text : **${textChats.size}\n` +
                `**Voice : **${voiceChats.size}\n` +
                `**System Channel : **${message.guild.systemChannel}\n` +
                `**Afk Channel : **${message.guild.afkChannel}\n` +
                `**Community Channel : **${message.guild.publicUpdatesChannel}\n` +
                `**Rules Channel : **${message.guild.rulesChannel}\n` +
                `**Max Bitrate : **${message.guild.maximumBitrate / 1000}kbps`,
                true
            )
            .addField(
                `__SERVER BOOST__`,
                `**Total Boost : **${message.guild.premiumSubscriptionCount}\n` +
                `**BOOST LEVEL :** ${boostlevel}`,
                true
            )
            .addField(
                '__DESCRIPTION__',
                message.guild.description ? message.guild.description : 'None',
                true
            )
            .addField(
                `__EMOJI__`,
                `**Total Emojis : **${message.guild.emojis.cache.size}/${emojisAva}\n` +
                `**Animated : **${message.guild.emojis.cache.filter(e => e.animated === true).size}/${emojisAva / 2}\n` +
                `**Static : **${message.guild.emojis.cache.filter(e => e.animated === false).size}/${emojisAva / 2}`,
                true
            )

        if (message.guild.roles.cache.size < 20) {
            embed.addField(
                `__ROLES__[${message.guild.roles.cache.size}]`,
                `** TOTAL ROLES: **\n${message.guild.roles.cache.map(roles => `${roles}`).join(', ')} `
            )
        } else {
            embed.addField(
                `__ROLES__[${message.guild.roles.cache.size}]`,
                `** TOTAL ROLES: ** To many roles to show here!`
            )
        }

        embed.setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
            .setColor(client.embed.cm)
            .setImage(message.guild.discoverySplashURL({ size: 2048, format: 'jpeg' }))
            .setFooter({
                text: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            });
        return message.channel.send({ embeds: [embed] });
    }
};
