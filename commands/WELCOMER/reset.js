const discord = require("discord.js"),
    db = require("quick.db");

module.exports = {
    name: "reset",
    aliases: ["rset"],
    description: "say command",
    category: "WELCOME",
    usage: "reset <welcome | nwelcome>",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {

        if (args[0] === "welcome") {
            if (args[1] === "message" || args[1] === "msg") {
                db.delete(`msg_${message.guild.id}`);
                return message.reply({
                    embeds: [
                        new discord.MessageEmbed({
                            description: `${client.emoji.success}| Welcome Message Set To Default`,
                            color: client.embed.cf
                        })
                    ]
                });
            } else if (args[1] === "image" || args[1] === "img") {
                db.delete(`url_${message.guild.id}`);
                return message.reply({
                    embeds: [
                        new discord.MessageEmbed({
                            description: `${client.emoji.success}| Welcome Image Set To Default`,
                            color: client.embed.cf
                        })
                    ]
                });
            } else if (args[1] === "channel" || args[1] === "chan") {
                db.delete(`welchannel_${message.guild.id}`);
                return message.reply({
                    embeds: [
                        new discord.MessageEmbed({
                            description: `${client.emoji.success}| Embed Welcomer Disabled`,
                            color: client.embed.cf
                        })
                    ]
                });
            } else if (args[1] || !args[1]) {
                return message.reply({
                    embeds: [
                        new discord.MessageEmbed({
                            description: `${client.emoji.fail}| Missed an argument \`<msg | img | channel>\``,
                            color: client.embed.cf
                        })
                    ]
                });
            }
        } else if (args[0] === "nwelcome") {
            if (args[1] === "message" || args[1] === "msg") {
                db.delete(`nmsg_${message.guild.id}`);
                return message.reply({
                    embeds: [
                        new discord.MessageEmbed({
                            description: `${client.emoji.success}| Welcome Message Set To Default`,
                            color: client.embed.cf
                        })
                    ]
                });
            } else if (args[1] === "channel" || args[1] === "chan") {
                db.delete(`nwelchannel_${message.guild.id}`);
                return message.reply({
                    embeds: [
                        new discord.MessageEmbed({
                            description: `${client.emoji.success}| Embed Welcomer Disabled`,
                            color: client.embed.cf
                        })
                    ]
                });
            } else if (args[1] || !args[1]) {
                return message.reply({
                    embeds: [
                        new discord.MessageEmbed({
                            description: `${client.emoji.fail}| Missed an argument \`<msg | channel>\``,
                            color: client.embed.cf
                        })
                    ]
                });
            }
        } else if (!args[0] || args[0]) {
            return message.reply({
                embeds: [
                    new discord.MessageEmbed({
                        description: `${client.emoji.fail}| Missed an argument \`<welcome | nwelcome>\``,
                        color: client.embed.cf
                    })
                ]
            });
        }
    }
};
