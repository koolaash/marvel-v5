const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js"),
    db = require("quick.db");

module.exports = {
    name: "vote",
    description: "send vote menu",
    category: "HELP",
    usage: "vote",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {
        let vote = new MessageEmbed({
            description:
                `${client.emoji.ar}| Click on the button to vote or [here](${client.config.bvote})`,
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