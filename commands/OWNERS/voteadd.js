module.exports = {
    name: "voteadd",
    category: "owner",
    usage: "evasl",
    description: "eval command only for owner",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        if (!client.config.bowner.includes(message.author.id)) {
            return;
        }
        if (!args[0]) {
            return message.reply({ content: "user?" })
        }
        const mem = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mem) {
            return message.reply({ content: "user error not found!" })
        }
        if (!args[1]) {
            client.qdb.set(`voted${mem.user.id}`, true)
            client.qdb.set(`vote-time_${mem.user.id}`, Date.now());
            return message.reply({ content: "DONE" })
        }
        if (isNaN(args[1])) {
            return message.reply("Must be a number")
        }
        if (args[1]) {
            client.qdb.set(`voted${mem.user.id}`, true)
            client.qdb.set(`vote-time_${mem.user.id}`, Date.now());
            client.qdb.add(`vote-total${target.id}`, agrs[1]);
            return message.reply({ content: "DONE" })
        }
    },
};
