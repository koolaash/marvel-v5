const { MessageEmbed } = require("discord.js"),
    db = require("quick.db");

module.exports = {
    name: "blacklist",
    aliases: ['bl'],
    category: "OWNERS",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        setTimeout(() => message.delete().catch(() => null), 2500);
        if (!client.config.bowner.includes(message.author.id)) return;
        if (!args[0]) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        color: client.embed.cf,
                        description: `${client.emoji.fail}| Guild or User!`
                    })
                ]
            });
        }

        if (args[0] === 'guild') {
            if (args[1] === 'reload') {
                client.blguilds = await client.qdb.get(`blguild.mem`);
                return message.reply('Done')
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2500));
            }
            if (args[1] === 'reset') {
                client.qdb.delete('blguilds')
                client.qdb.set('blguilds', { difficulty: 'Easy' })
                client.qdb.push('blguilds.mem', '123123123')
                client.blguilds = await client.qdb.get('blguilds.mem')
                return message.reply('Done')
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2500));
            }
            if (args[1] === 'list') {
                let n = ["HERE : "]
                client.blguilds.forEach(async no => {
                    var nn = client.guilds.cache.get(no) ? client.guilds.cache.get(no) : false;
                    if (nn === false) {
                        return client.qdb.pull(`blguilds.mem`, no)
                    }
                    return n.push(`${nn.id}  -  ${nn.name}`)
                })
                return message.channel.send(`${n.join('\n')}`)
            }
            if (!args[1] === 'force') {
                if (args[2]) return message.reply("id?");
                client.qdb.pull(`blguilds.mem`, args[2]);
                return message.reply({ content: "Done" })
                    .then(m => setTimeout(() => m.delete().catch(() => null), 2500));
            }

            let target = client.guilds.cache.get(args[1]);
            if (!target) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cf,
                            description: `${client.emoji.fail}| Unable to find this guild!`
                        })
                    ]
                });
            }

            if (!args[2]) {
                return message.reply({ content: "Add or Remove" })
                    .then(m = setTimeout(() => m.delete().catch(() => null), 2500))
            }

            let mems = await client.qdb.get(`blguilds`);

            if (!mems) {
                client.qdb.set('blguilds', { difficulty: 'Easy' });
                client.qdb.push('blguilds.mem', message.author.id);
            }

            if (args[2] === "add") {
                if (client.blguilds.includes(target.id)) {
                    return message.reply({ content: "Already in list!" })
                        .then(m => setTimeout(() => m.delete().catch(() => null), 2500));
                }
                client.qdb.push(`blguilds.mem`, target.id);
                return message.reply({ content: "Done" })
                    .then(m => setTimeout(() => m.delete().catch(() => null), 2500));
            } else if (args[2] === 'remove') {
                client.qdb.pull(`blguilds.mem`, target.id);
                return message.reply({ content: "Done" })
                    .then(m => setTimeout(() => m.delete().catch(() => null), 2500));
            }
        }
        if (args[0] === 'user') {
            if (args[1] === 'reload') {
                client.bluser = await client.qdb.get(`bluser.mem`);
                return message.reply('Done')
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2500));
            }
            if (args[1] === 'reset') {
                client.qdb.delete('bluser')
                client.qdb.set('bluser', { difficulty: 'Easy' })
                client.qdb.push('bluser.mem', '123123123')
                client.bluser = await client.qdb.get('bluser.mem')
                return message.reply('Done')
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 2500));
            }

            if (args[1] === 'list') {
                let n = []
                client.bluser.forEach(async no => {
                    return n.push(`${no}  -  <@${no}>`);
                })
                return message.channel.send(`${n.join('\n')}`);
            }
            if (args[1] === 'force') {
                if (!args[2]) return message.reply("id?");
                client.qdb.pull(`bluser.mem`, args[2]);
                return message.reply({ content: "Done" }).then(m => setTimeout(() => m.delete().catch(() => null), 2500));
            }

            let target = message.mentions.members.first() || message.guild.members.cache.get(args[1]);

            if (!target) {
                target = await message.guild.members.fetch(args[1]).catch(() => null);
            }

            if (!target) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cf,
                            description: `${client.emoji.fail}| Unable to find this user!`
                        })
                    ]
                });
            }

            if (!args[2]) {
                return message.reply({ content: "Add or Remove" }).then(m = setTimeout(() => m.delete().catch(() => null), 2500));
            }

            let mems = await client.qdb.get(`bluser`);

            if (!mems) {
                client.qdb.set('bluser', { difficulty: 'Easy' })
                client.qdb.push('bluser.mem', '123123123')
            }

            if (args[2] === "add") {
                if (client.bluser.includes(target.id)) {
                    return message.reply({ content: "Already in list!" })
                        .then(m => setTimeout(() => m.delete().catch(() => null), 2500));
                }
                client.qdb.push(`bluser.mem`, target.id);
                return message.reply({ content: "Done" })
                    .then(m => setTimeout(() => m.delete().catch(() => null), 2500));
            } else if (args[2] === 'remove') {
                client.qdb.pull(`bluser.mem`, target.id);
                return message.reply({ content: "Done" })
                    .then(m => setTimeout(() => m.delete().catch(() => null), 2500));
            }
        }
    }
}