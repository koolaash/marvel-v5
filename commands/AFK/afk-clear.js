const db = require("quick.db"),
    discord = require("discord.js");

module.exports = {
    name: "afk-clear",
    aliases: ["clear-afk", "afk-remove"],
    category: "AFK",
    usage: "afk-clear <@user>",
    description: "clears afk of any user",
    userPermissions: ["ADMINISTRATOR", "EMBED_LINKS"],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        if (!args[0]) {
            let em = new discord.MessageEmbed({
                description: `${client.emoji.fail}| Mention a user first`,
                color: client.embed.cf
            });
            return message.reply({ embeds: [em] });
        }

        let user =
            message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!user || user === undefined) {
            user = await message.guild.members.fetch(args[0]).catch(() => null);
        }

        if (!user) {
            let em = new discord.MessageEmbed({
                description: `${client.emoji.fail}| Unable to find this user`,
                color: client.embed.cf
            });
            return message.reply({ embeds: [em] });
        }

        if (!client.config.bowner.includes(message.author.id)) {
            if (client.config.bowner.includes(user.id)) {
                let em = new discord.MessageEmbed({
                    description:
                        `${client.emoji.fail}| Your current status is not high enough to clear his afk`,
                    color: client.embed.cf
                });
                return message.reply({ embeds: [em] });
            }
            if (!client.config.bowner.includes(message.author.id)) {
                if (message.author.id !== message.guild.ownerId) {
                    if (message.member.roles.highest.position <= user.roles.highest.position) {
                        let em = new discord.MessageEmbed({
                            description: `${client.emoji.fail}| Your Role isn't higher than **\`\`${user.user.tag}\`\`**`,
                            color: client.embed.cf
                        });
                        return message.reply({ embeds: [em] });
                    }
                }
            }
        }
        db.delete(`afkTime_${message.guild.id + user.id}`);
        db.delete(`afkUser_${message.guild.id + user.id}`);
        db.delete(`afkMsg_${message.guild.id + user.id}`);

        message.reply(
            "Cleared " + user.user.tag + " afk!"
        ).then((m) => setTimeout(() => m.delete(), 3000));

    }
}