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
        if (args[0] === 'reset') {
            db.delete(`noprefix${message.guild.id}`)
            return message.reply('Done');
        }

        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!target) {
            target = await message.guild.members.fetch(args[0]).catch(() => null)
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
                .then(m = setTimeout(() => m.delete().catch(() => null), 2500))
        }

        let mems = db.get(`noprefix${message.guild.id}`);

        if (!mems) {
            db.set(`noprefix${message.guild.id}`, { difficulty: 'Easy' });
        }

        if (args[1] === "add") {
            db.set(`noprefix.mems${message.guild.id}`, target.id)
            return message.reply({ content: "Done" })
                .then(m => setTimeout(() => m.delete().catch(() => null), 2500))
        } else if (args[1] === 'remove') {
            db.pull(`noprefix.mems${message.guild.id}`, target.id)
            return message.reply({ content: "Done" })
                .then(m => setTimeout(() => m.delete().catch(() => null), 2500))
        }
    }
}