const db = require("quick.db"),
    { MessageEmbed, MessageActionRow, MessageButton, ButtonInteraction } = require("discord.js");

module.exports = {
    name: "afk",
    category: "AFK",
    usage: "afk [reason]",
    description: "sets your afk",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        if (!args[0]) {
            var afkmsg = "I am Afk :)";
        } else {
            afkmsg = args.slice(0).join(" ");
        }

        let guild = new MessageButton()
            .setStyle("SUCCESS")
            .setLabel("This Server")
            .setCustomId('afk_guild'),
            all = new MessageButton()
                .setStyle("SUCCESS")
                .setLabel('All Mutuals')
                .setCustomId('afk_all'),
            cancel = new MessageButton()
                .setStyle("DANGER")
                .setEmoji(client.emoji.cross_id)
                .setCustomId('afk_cancel'),
            row = new MessageActionRow()
                .addComponents(guild, all, cancel)
        let m = await message.reply({
            embeds: [
                new MessageEmbed({
                    color: client.embed.cf,
                    description: `${afkmsg}\nWill be your afk message how would you like to set your afk!`
                })
            ],
            components: [row]
        }),
            collector = m.createMessageComponentCollector({ time: 15000 })

        collector.on('collect', async (b) => {
            if (b.user.id !== message.author.id) {
                let emm = new MessageEmbed({
                    description: `❎ ${client.error.menu}`,
                    color: client.embed.cf
                })
                return b.reply({ ephemeral: true, embeds: [emm] })
            }
            switch (b.customId) {
                case "afk_guild":
                    b.message.delete();
                    setTimeout(function () {
                        db.set(`afkUser_${message.guild.id + message.author.id}`, true);
                        db.set(`afkMsg_${message.guild.id + message.author.id}`, afkmsg);
                        db.set(`afkTime_${message.guild.id + message.author.id}`, Date.now());
                        return message.reply(`You are now afk\nReason : ${afkmsg}`)
                            .then(m => setTimeout(() => m.delete().catch(() => null), 3500));
                    }, 300);
                    break;
                case "afk_all":
                    b.message.delete();
                    setTimeout(function () {
                        db.set(`afkUser_${message.author.id}`, true);
                        db.set(`afkMsg_${message.author.id}`, afkmsg);
                        db.set(`afkTime_${message.author.id}`, Date.now());
                        return message.reply(`You are now afk\nReason : ${afkmsg}`)
                            .then(m => setTimeout(() => m.delete().catch(() => null), 3500));
                    }, 300);
                    break;
                case "afk_cancel":
                    b.message.delete();
            }
            collector.on("end", (_, reason) => {
                if (reason !== "messageDelete") {
                    return m.delete();
                }
            });
            collector.on('error', (e) => console.log(e));
        })
    }
}