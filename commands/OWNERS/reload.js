const { MessageEmbed, Collection } = require("discord.js");

module.exports = {
    name: "reload",
    category: "owner",
    usage: "reload",
    description: "reload all commands in the bot",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        if (!client.config.bowner.includes(message.author.id)) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail}| You cannot use this command.`,
                        color: client.embed.cf
                    })
                ]
            })
        }
        client.commands = new Collection();
        client.aliases = new Collection();
        ["command"].forEach(handler => {
            require(`../../handlers/${handler}`)(client);
        });
        return message.reply({
            embeds: [
                new MessageEmbed({
                    description: `${client.emoji.success}| Reloaded all the commands.`,
                    color: client.embed.cm
                })
            ]
        })
    },
};
