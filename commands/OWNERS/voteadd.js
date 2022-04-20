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
            return message.reply({ content: "ID?" })
        }
        client.qdb.set(`voted${args[0]}`, true)
        client.qdb.set(`vote-time_${args[0]}`, Date.now());
        return message.reply({ content: "Done" })
    },
};
