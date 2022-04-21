const discord = require("discord.js"),
    db = require("quick.db");

module.exports = {
    name: "set",
    //  aliases: ["reply"],
    description: "say command",
    category: "WELCOME",
    usage: "set <welcome | nwelcome>",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {

        if (args[0] === "welcome") {
            if (args[1] === "message" || args[1] === "msg") {
                if (!args[1]) {
                    return message.reply(
                        `${client.emoji.fail}| Please give the message to set`
                    );
                }
                let msg = args.slice(2).join(" ");
                db.set(`msg_${message.guild.id}`, `${msg}`);
                return message.reply(msg);
            } else if (args[1] === "image" || args[1] === "img") {
                if (!args[2]) {
                    return message.reply(
                        `${client.emoji.fail}| Please give the link of the image`
                    );
                }

                if (!/\.(jpe?g|png|gif|webp)$/i.test(args[2])) {
                    return message.reply(
                        `${client.emoji.fail}| Provide a valid url please!\nNote : Tenor are not supported`
                    );
                }

                if (args[3]) {
                    return message.reply(
                        `${client.emoji.fail}| You can not set a double argument`
                    );
                }

                db.set(`url_${message.guild.id}`, args[2]);
                return message.reply(
                    client.emoji.success + "| " + `Welcome Image is now ${args[2]}`
                );
            } else if (args[1] === "channel" || args[1] === "chan") {
                let channel = message.mentions.channels.first() ||
                    message.guild.channels.cache.get(args[2]);
                if (!channel) {
                    return message.reply(
                        `${client.emoji.fail}| Please Mention the channel first`
                    );
                }
                db.set(`welchannel_${message.guild.id}`, channel.id);
                return message.reply(
                    `${client.emoji.success}| New Welcome Channel Is ${channel}`
                );
            } else if (args[1] === "color" || args[1] === "colour") {
                if (!args[2]) {
                    return message.reply({
                        embeds: [
                            new discord.MessageEmbed({
                                description:
                                    `${client.emoji.fail}| Missed an argument \`<colour/color you want GIVE COLOUR CODE LIKE #ff00ff> or Color name in CAPITAL\``,
                                color: client.embed.cf,
                            })
                        ]
                    });
                }
                return (
                    db.set("welClr" + message.guild.id, args[2]) &&
                    message.reply(
                        `${client.emoji.success}| New Embed Welcome Colour Is ${args[2]}`
                    )
                );
            } else if (args[1] === "mention") {
                const ment = db.get("mention" + message.guild.id)
                if (!ment || ment === null || ment === undefined || ment === false) {
                    return (
                        db.set("mention" + message.guild.id, true) && message.reply(
                            new discord.MessageEmbed({
                                description: `${client.emoji.success}| Mention member on welcome outside embed is now \`ON\``,
                                color: client.embed.cr
                            })
                        )
                    )
                } else {
                    return (
                        db.delete("mention" + message.guild.id) && message.reply(
                            new discord.MessageEmbed({
                                description: `${client.emoji.success}| Mention member on welcome outside embed is now \`OFF\``,
                                color: client.embed.cr
                            })
                        )
                    )
                }
            } else if (args[1] === "userinfo" || args[1] === "ui") {
                const ui = db.get("userinfo" + message.guild.id)
                if (!ui || ui === null || ui === undefined || ui === false) {
                    return (
                        db.set("userinfo" + message.guild.id, true) && message.reply(
                            new discord.MessageEmbed({
                                description: `${client.emoji.success}| Userinfo member on welcome embed is now \`ON\``,
                                color: client.embed.cr
                            })
                        )
                    )
                } else {
                    return (
                        db.delete("userinfo" + message.guild.id) && message.reply(
                            new discord.MessageEmbed({
                                description: `${client.emoji.success}| Userinfo member on welcome embed is now \`OFF\``,
                                color: client.embed.cr
                            })
                        )
                    )
                }
            } else if (args[1] || !args[1]) {
                return message.reply(
                    new discord.MessageEmbed({
                        description:
                            `${client.emoji.fail}| Missed an argument \`<msg | img | channel | color | mention | userinfo>\``,
                        color: client.embed.cf,
                    })
                );
            }
        } else if (args[0] === "nwelcome") {
            if (args[1] === "message" || args[1] === "msg") {
                if (!args[1]) {
                    return message.reply(
                        `${client.emoji.fail}| Please give the message to set`
                    );
                }
                let msg = args.slice(2).join(" ");
                db.set(`nmsg_${message.guild.id}`, `${msg}`);
                return message.reply(msg);
            } else if (args[1] === "channel" || args[1] === "chan") {
                let channel = message.mentions.channels.first() ||
                    message.guild.channels.cache.get(args[2]);
                if (!channel) {
                    return message.reply(
                        `${client.emoji.fail}| Please Mention the channel first`
                    );
                }
                db.set(`nwelchannel_${message.guild.id}`, channel.id);
                return message.reply(
                    `${client.emoji.success}| New Non Embed Welcome Channel Is ${channel}`
                );
            } else if (args[1] || !args[1]) {
                return message.reply({
                    embeds: [
                        new discord.MessageEmbed({
                            description:
                                `${client.emoji.fail}| Missed an argument \`<msg | channel>\``,
                            color: client.embed.cf,
                        })
                    ]
                });
            }
        } else if (!args[0] || args[0]) {
            return message.reply({
                embeds: [
                    new discord.MessageEmbed({
                        description: `${client.emoji.fail}| Missed an argument \`<welcome | nwelcome>\``,
                        color: client.embed.cf,
                    })
                ]
            });
        }
    },
};
