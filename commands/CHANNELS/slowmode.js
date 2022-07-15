const { MessageEmbed } = require("discord.js"),
    ms = require("ms");

module.exports = {
    name: "slowomode",
    aliases: ["smode", "slomo"],
    description: "Hides The Mentioned Channels for [everyone | @role | @user]",
    category: "CHANNELS",
    usage: 'hide [@role | @user]',
    userPermissions: ["MANAGE_ROLES", "MANAGE_CHANNELS", "EMBED_LINKS"],
    botPermissions: ["MANAGE_ROLES", "EMBED_LINKS", "ADD_REACTIONS"],

    async run(client, message, args) {

        if (!args[0]) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail}| Correct usage is slomo <amount | off>`,
                        color: client.embed.cf
                    })
                ]
            });
        };

        if (args[0] === 'off') {
            await message.channel.setRateLimitPerUser('0');
            return message.react(client.emoji.success);
        } else {
            try {
                let value = ms(args[0]) / 1000;

                await message.channel.setRateLimitPerUser(value);
                return message.react(client.emoji.success);
            } catch (err) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| Provide the value as 5s, 5m or 5h value shouldn't exceed 6h!`
                        })
                    ]
                })
            };
        };
    }
};