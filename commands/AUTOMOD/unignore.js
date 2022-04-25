const discord = require("discord.js"),
    { MessageEmbed } = require("discord.js"),
    db = require("quick.db");

module.exports = {
    name: "unignore",
    // aliases: ["am"],
    category: "AUTOMODERATION",
    usage: "unignore <channel | role>",
    description: "unignore a channel from bots automod",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        let fail = client.embed.cf,
            success = client.embed.cr,
            semoji = `${client.emoji.success} | `,
            femoji = `${client.emoji.fail} | `,
            mer = args.join(" "),
            arg = mer.toLowerCase().split(/ +/g);

        if (!client.config.bowner.includes(message.author.id)) {
            if (message.author.id !== message.guild.ownerId) {
                if (
                    message.member.roles.highest.position <=
                    message.guild.me.roles.highest.position
                ) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                description:
                                    `${femoji}Your role isn't higher than mine you cannot use this commamd`,
                                color: fail,
                            })
                        ]
                    })
                }
            }
        }
        if (arg[0] === "role") {
            const rol = db.get(`ignoreRole_${message.guild.id}`);
            if (rol === null) {
                return message.reply({
                    embeds: [
                        new discord.MessageEmbed({
                            description: `${femoji}You haven't set any role  be ignored`,
                            color: fail,
                        })
                    ]
                })
            }

            db.delete(`ignoreRole_${message.guild.id}`);
            return message.reply({
                embeds: [
                    new discord.MessageEmbed({
                        description: `${semoji}Now <@&${rol}> is not being ignored.`,
                        color: success,
                    })
                ]
            })
        } else if (arg[0] === "channel") {
            const chans = db.get(`ignoreChannel.item_${message.guild.id}`);
            if (!arg[1]) {
                return message.reply({
                    embeds: [
                        new discord.MessageEmbed({
                            description: `${femoji}Mention id or provide channel id first`,
                            color: fail,
                        })
                    ]
                })
            }
            let chx =
                message.mentions.channels.first() ||
                message.guild.channels.cache.get(args[1]);
            if (!chx.id) {
                chx.id = args[1];
            }
            const valueToRemove = chx.id;
            const filteredItems = chans.filter(function (item) {
                return item !== valueToRemove;
            });
            db.delete(`ignoreChannel.item_${message.guild.id}`, chx.id);
            filteredItems.forEach((filteredItem) =>
                db.push(`ignoreChannel.item_${message.guild.id}`, filteredItem)
            );
            return message.reply({
                embeds: [
                    new discord.MessageEmbed({
                        description: `${semoji}Removed ${chx} from ignored channels list!`,
                        color: success,
                    })
                ]
            })
        } else if (arg[0] || !arg[0]) {
            return message.reply({
                embeds: [
                    new discord.MessageEmbed({
                        description: `${femoji}unignore role\nunignore channel @channel or channel.id`,
                        color: fail,
                    })
                ]
            })
        }
    },
};
