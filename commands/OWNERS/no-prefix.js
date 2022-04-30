const { MessageEmbed } = require("discord.js"),
    db = require("quick.db");

module.exports = {
    name: "no-prefix",
    aliases: ['nop', 'anp'],
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
                        description: `${client.emoji.fail}| Unable to find this user!`
                    })
                ]
            });
        }

        if (args[0] === 'reload') {
            client.noprefix = await client.qdb.get(`noprefix.mem`);
            return message.reply('Done')
                .then((m) => setTimeout(() => m.delete().catch(() => null), 2500));
        }
        if (args[0] === 'reset') {
            client.qdb.delete('noprefix')
            client.qdb.set('noprefix', { difficulty: 'Easy' })
            client.qdb.push('noprefix.mem', message.author.id)
            client.noprefix = await client.qdb.get('noprefix.mem')
            return message.reply('Done')
                .then((m) => setTimeout(() => m.delete().catch(() => null), 2500));
        }

        if (args[0] === 'list') {
            let n = []
            client.noprefix.forEach(async no => {
                return n.push(`${no}  -  <@${no}>`);
            })
            return message.channel.send(`${n.join('\n')}`);
        }
        if (args[0] === 'force') {
            if (!args[1]) return message.reply("id?");
            client.qdb.pull(`noprefix.mem`, args[1]);
            return message.reply({ content: "Done" })
                .then(m => setTimeout(() => m.delete().catch(() => null), 2500));
        }

        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!target) {
            target = await message.guild.members.fetch(args[0]).catch(() => null);
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

        if (!args[1]) {
            return message.reply({ content: "Add or Remove" })
                .then(m = setTimeout(() => m.delete().catch(() => null), 2500));
        }

        let mems = await client.qdb.get(`noprefix`);

        if (!mems) {
            client.qdb.set(`noprefix`, { difficulty: 'Easy' });
        }

        if (args[1] === "add") {
            if (client.noprefix.includes(target.id)) {
                return message.reply({ content: "Already in list!" })
                    .then(m => setTimeout(() => m.delete().catch(() => null), 2500));
            }
            client.qdb.push(`noprefix.mem`, target.id);
            return message.reply({ content: "Done" })
                .then(m => setTimeout(() => m.delete().catch(() => null), 2500));
        } else if (args[1] === 'remove') {
            client.qdb.pull(`noprefix.mem`, target.id);
            return message.reply({ content: "Done" })
                .then(m => setTimeout(() => m.delete().catch(() => null), 2500));
        }
    }
}