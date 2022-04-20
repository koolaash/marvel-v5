const discord = require("discord.js");

module.exports = {
    name: "policy",
    desciption: "shows the bots policy",
    category: "INFORMATION",
    usage: "policy",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {
        const embed = new discord.MessageEmbed()
            .setTitle(
                `${client.emoji.bot}| MARVEL PRIVACY POLICY`
            )
            .addField(
                `${client.emoji.ar}| What Data Stored`,
                "1. Server id is stored for customizable prefix and welcome channels including channel ids's.\n2. When the bot is removed form the server it does not delete the id's.\n3. Deleted messages are saved for few minutes that is used in snipe command."
            )
            .addField(
                `${client.emoji.ar}| Data Security`,
                "1. We do not use anyone personal data for ourselves.\n2. We do not share your data with 3rd party.\n3. We do not store anyone's data without permission."
            )
            .addField(
                `${client.emoji.ar}| FAQ or Concerns`,
                "If you have any issue regarding anything join support server link given below."
            )
            .addField(
                `${client.emoji.ar}| NOTE`,
                "We hold all the rights to change the privacy policy anytime."
            )
            .addField(
                `${client.emoji.support}| Support Server`,
                `[marvel.gg/support](${bserver})`
            )
            .setColor(client.embed.cm)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setFooter({
                text: message.guild.name + " | Policy Last Updated : 5th of August 2021",
                iconURL: client.user.displayAvatarURL()
            });
        message.reply({ embeds: [embed] });
    }
};
