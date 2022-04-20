const db = require("quick.db"),
    discord = require("discord.js");

module.exports = {
    name: "afk",
    category: "AFK",
    usage: "afk [reason]",
    description: "sets your afk",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        let afkmsg

        if (!args[0]) {
            afkmsg = "I am Afk :)"
        } else {
            afkmsg = args.slice(0).join(" ");
        }

        try {
            setTimeout(function () {
                db.set(`afkUser_${message.guild.id + message.author.id}`, true);
                db.set(`afkMsg_${message.guild.id + message.author.id}`, afkmsg);
                db.set(`afkTime_${message.guild.id + message.author.id}`, Date.now());
                return message.reply(
                    "You are now afk\nReason : " + afkmsg
                )
            }, 300);
        } catch (e) {
            return console.log(e)
        }
    }
}