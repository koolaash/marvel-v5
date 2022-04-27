const { MessageEmbed } = require("discord.js"),
    db = require("quick.db");

module.exports = {
    name: "partner",
    //  aliases: ['nop', 'anp'],
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
                        description: `${client.emoji.fail}| Unable to find this guild!`
                    })
                ]
            });
        }

        if (args[0] === 'reload') {
            client.partner = await client.qdb.get(`partner.mem`);
            return message.reply('Done')
                .then((m) => setTimeout(() => m.delete().catch(() => null), 2500));
        }
        if (args[0] === 'reset') {
            client.qdb.delete('partner')
            client.qdb.set('partner', { difficulty: 'Easy' })
            client.qdb.push('partner.mem', message.author.id)
            client.partner = await client.qdb.get('partner.mem')
            return message.reply('Done')
                .then((m) => setTimeout(() => m.delete().catch(() => null), 2500));
        }

        let target = client.guilds.cache.get(args[0]);
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

        if (!args[1]) {
            return message.reply({ content: "Add or Remove" })
                .then(m = setTimeout(() => m.delete().catch(() => null), 2500))
        }

        let mems = await client.qdb.get(`partner`);

        if (!mems) {
            client.qdb.set(`partner`, { difficulty: 'Easy' });
        }

        if (args[1] === "add") {
            client.qdb.push(`partner.mem`, target.id)
            return message.reply({ content: "Done" })
                .then(m => setTimeout(() => m.delete().catch(() => null), 2500))
        } else if (args[1] === 'remove') {
            client.qdb.pull(`partner.mem`, target.id)
            return message.reply({ content: "Done" })
                .then(m => setTimeout(() => m.delete().catch(() => null), 2500))
        }
    }
}