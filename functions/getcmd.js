const { MessageEmbed } = require('discord.js');

module.exports = async function (client, message) {
    let prefixModel = client.prefixModel,
        prefixData = await prefixModel.findOne({
            GuildID: message.guild.id,
        }).catch(err => console.log(err));
        
    if (prefixData) {
        var prefix = prefixData.Prefix
    } else if (!prefixData) {
        prefix = client.config.prefix
    };

    const guild = client.guilds.cache.get(client.role.guild);
    guild.members.fetch();
    const target2 = guild.members.cache.get(message.author.id);

    if (target2) {
        if (target2.roles.cache.has(client.role.noprefix) || target2.roles.cache.get(client.role.booster)) {
            let args = message.content.slice().trim().split(/ +/g),
                cmd = args.shift().toLowerCase();
            if (cmd.length === 0) return;

            var command = client.commands.get(cmd);
            if (!command) command = client.commands.get(cmd);
        }
    } else {
        const marvelMention = new RegExp(`^<@!?${client.user.id}>`),
            marvel = message.content.match(marvelMention) ? message.content.match(marvelMention)[0] : prefix;

        if (message.content.startsWith(marvel)) {

            let args = message.content.slice(marvel.length).trim().split(/ +/g),
                cmd = args.shift().toLowerCase();
            if (cmd.length === 0) return;
            var command = client.commands.get(cmd);
            if (!command) command = client.commands.get(client.aliases.get(cmd));
        }
    }

    if (command) {
        let usg = command.usage,
            des = command.description,
            ali = command.aliases,
            cat = command.category,
            ali1,
            usg1,
            des1,
            cat1,
            p = prefix;

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
            .addField('Name', `\`${command.name ? command.name : 'None'}\``)
            .addField("Aliases", ali1)
            .addField("Usage", usg1)
            .setColor(client.embed.cm);

        return message.reply({ embeds: [hel] });
    }
};