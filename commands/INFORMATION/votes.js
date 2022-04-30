const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js"),
    db = require("quick.db");

module.exports = {
    name: "vote",
    description: "send vote menu",
    category: "INFORMATION",
    usage: "votes @user",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {
        let voteUser = message.mentions.members.first() || message.member,
            votes = await client.qdb.get(`vote-total${voteUser.id}`),
            vote = new MessageEmbed({
                description: `You Have A Total Of ${votes} Votes\nClick on the button to vote or [here](${client.config.bvote})`,
                color: client.color.cm,
            }),
            vb = new MessageButton()
                .setStyle("LINK")
                .setLabel("|  VOTE")
                .setURL(client.config.bvote)
                .setEmoji(client.emoji.discord_id)
                .setDisabled(false),
            row = new MessageActionRow()
                .addComponents(vb);

        return message.reply({
            components: [row],
            embeds: [vote]
        });
    },
};