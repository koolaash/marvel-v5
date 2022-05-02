const Discord = require("discord.js"),
    { MessageEmbed, MessageActionRow, MessageButton, Collection, Permissions } = require("discord.js"),
    db = require("quick.db"),
    discord = require("discord.js"),
    Timeout = new Collection(),
    ms = require("ms");

module.exports.run = async (client, message) => {
    if (message.author.bot || !message.guild) return;
    let dis = db.get(`disabeled${message.channel.id}`),
        prefixModel = client.prefixModel,
        prefixData = await prefixModel.findOne({
            GuildID: message.guild.id,
        }).catch(err => console.log(err))
    if (prefixData) {
        var prefix = prefixData.Prefix
    } else if (!prefixData) {
        prefix = client.config.prefix
    }
    let desc = `Hey, Marvel here!\n\nPrefix for this server is \`${prefix}\`\n\n` +
        `If you have any problem regarding bot join : \n[discord.gg/marvel](${client.config.bserver})`
    if (dis === true) {
        desc = `Hey, Marvel here!\n\nPrefix for this server is \`${prefix}\`\n\n` +
            `If you have any problem regarding bot join : \n[discord.gg/marvel](${client.config.bserver})` +
            `This channel is disabled for bot commands`
    }



    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
        let mention = new MessageEmbed({
            description: desc,
            color: client.embed.cm
        })
        let p1 = ["SEND_MESSAGES", "EMBED_LINKS"]
        if (!message.guild.me.permissionsIn(message.channel).has(p1)) {
            return message.author.send({
                embeds: [
                    new MessageEmbed({
                        description: `I need \`${p1.join(", ")}\` permissions in **\`${message.guild.name}\`**`,
                        color: client.embed.cf,
                        thumbnail: message.guild.iconURL({ dynamic: true })
                    })
                ]
            }).catch(() => null)
        }
        return message.reply({ embeds: [mention] })
            .then(m => setTimeout(() => m.delete().catch(() => null), 10000));
    }

    // For user with prefix  
    // normal users
    const marvelMention = new RegExp(`^<@!?${client.user.id}>`),
        marvel = message.content.match(marvelMention) ? message.content.match(marvelMention)[0] : prefix;

    if (message.content.startsWith(marvel)) {
        try {
            const modOnly = db.get("modOnly" + message.guild.id);
            if (!message.member)
                message.member = await message.guild.fetchMember(message);
            let m = message.content.toLowerCase(),
                args = message.content.slice(marvel.length).trim().split(/ +/g),
                arg = m.slice(marvel.length).trim().split(/ +/g),
                cmd = args.shift().toLowerCase();
            if (cmd.length === 0) return;
            let command = client.commands.get(cmd);
            if (!command) command = client.commands.get(client.aliases.get(cmd));
            if (command) {
                if (dis === true) {
                    return message.reply({ content: "My commands in this channel are disabeled!" })
                        .then((m) => setTimeout(() => m.delete().catch(() => null), 2500));
                }

                let p1 = ["SEND_MESSAGES", "EMBED_LINKS"]
                if (!message.guild.me.permissionsIn(message.channel).has(p1)) {
                    return message.author.send({
                        embeds: [
                            new MessageEmbed({
                                description: `I need \`${p1.join(", ")}\` permissions in ${message.guild.name}`,
                                color: client.embed.cf,
                                thumbnail: message.guild.iconURL({ dynamic: true })
                            })
                        ]
                    }).catch(() => null)
                }
                if (client.bluser.includes(message.author.id)) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                color: client.color.bl,
                                description: `You are blacklisted from using this bot\n[Click Here To Join Support](${client.config.bserver})`
                            })
                        ]
                    })
                }
                if (client.blguilds.includes(message.guild.id)) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                color: client.color.bl,
                                description: `This server is blacklisted from using this bot\n[Click Here To Join Support](${client.config.bserver})`
                            })
                        ]
                    })
                }
                if (command.modRole === true) {
                    const modRol = db.get("modrole" + message.guild.id);
                    if (!modRol || modRol === null) {
                        let emb = new discord.MessageEmbed({
                            color: client.embed.cf,
                            description:
                                `${client.emoji.fail}| You need to set ModRole first to use this command use \`${prefix}modrole set @role\``,
                        })
                        return message.reply({ embeds: [emb] });
                    }
                    const modRole = message.guild.roles.cache.get(modRol);
                    if (!modRole || modRole === null) {
                        let emb = new discord.MessageEmbed({
                            color: client.embed.cf,
                            description: `${client.emoji.fail}| You need to set ModRole first to use this command use \`${prefix}modrole set @role\`\nI was unable to find the role you set before!`,
                        })
                        return message.reply({ embeds: [emb] });
                    }
                    let t = await message.guild.members.fetch(message.member.id)
                    if (!client.config.bowner.includes(message.member.id)) {
                        if (message.member !== message.guild.owner) {
                            if (!t.roles.cache.has(modRole.id)) {
                                let emb = new discord.MessageEmbed({
                                    color: client.embed.cf,
                                    description: `${client.emoji.fail}| You need <@&${modRole.id}> role to execute this command!`,
                                })
                                return message.reply({ embeds: [emb] });
                            }
                        }
                    }
                }

                if (command.vote === true) {
                    let vote = new discord.MessageEmbed({
                        description: "You need to vote first to use this command.",
                        color: client.color.cf
                    })
                    const vb = new MessageButton()
                        .setStyle("LINK")
                        .setLabel("|  VOTE")
                        .setURL(client.config.bvote)
                        .setEmoji(client.emoji.discord_id)
                        .setDisabled(false)
                    const row = new MessageActionRow()
                        .addComponents(vb);
                    let pre = await client.qdb.get(`voted${message.author.id}`);
                    if (pre !== true) {
                        return message.reply({
                            components: [row],
                            embeds: [vote]
                        });
                    }
                    const trt = await client.qdb.get(`vote-time_${message.author.id}`);
                    var milliseconds = trt;
                    var millisecondsInDay = 4.64e7;
                    var futureDate = new Date(milliseconds + 1 * millisecondsInDay);
                    var tit = Date.now();
                    if (futureDate - tit <= 0) {
                        return (
                            message.reply({
                                components: [row],
                                embeds: [vote]
                            }) &&
                            client.qdb.delete(`voted${message.author.id}`) &&
                            client.qdb.delete(`vote-time_${message.author.id}`)
                        );
                    }
                }


                let cooldown = 5000;
                if (!client.config.bowner.includes(message.member.id)) {
                    if (Timeout.has(`cooldown${message.author.id}`)) {
                        return message.reply(
                            `You are on a \`${ms(
                                Timeout.get(`cooldown${message.author.id}`) - Date.now(),
                                { long: true }
                            )}\` cooldown.`
                        ).then((m) => setTimeout(() => m.delete().catch(() => null), 3000));
                    }
                }
                let r = false;
                if (!client.config.bowner.includes(message.member.id)) {
                    if (modOnly === true) {
                        if (!message.member.permissionsIn(message.channel).has(Permissions.FLAGS.ADMINISTRATOR)) {
                            return message.reply(
                                `${client.emoji.fail}| Bot is mod only in this guild that means you need \`ADMINISTRATOR\``
                            ).then((m) => setTimeout(() => m.delete().catch(() => null), 3000));
                        }
                    }
                    if (message.author.id !== message.guild.ownerId) {
                        command.userPermissions.forEach((permission) => {
                            if (r === true) return;
                            if (!message.member.permissionsIn(message.channel).has(permission)) {
                                r = true;
                                return message.reply(
                                    `${client.emoji.fail}| YOU NEED **\`${permission}\`** PERMISSION FIRST TO EXECUTE THIS COMMAND!!`
                                ).then((m) => setTimeout(() => m.delete().catch(() => null), 3000));
                            }
                        });
                    }
                }
                command.botPermissions.forEach((permission) => {
                    if (r === true) return;
                    if (!message.guild.me.permissionsIn(message.channel).has(permission)) {
                        r = true;
                        return message.reply(
                            `${client.emoji.fail}| I NEED **\`${permission}\`** PERMISSION FIRST TO EXECUTE THIS COMMAND!!`
                        ).then((m) => setTimeout(() => m.delete().catch(() => null), 3000));
                    }
                });
                if (r === false) {
                    try {
                        await command.run(client, message, args, arg) &&
                            Timeout.set(`cooldown${message.author.id}`, Date.now() + cooldown) &&
                            setTimeout(() => {
                                Timeout.delete(`cooldown${message.author.id}`);
                            }, cooldown);
                    } catch (e) {
                        return client.errweb.send(`\`\`\`js\nCOMMAND : ${command.name} - ${message.guild.name} - ${message.guild.id}\n${e.stack}\n\`\`\``);
                    }
                }
            }
        } catch (e) {
            return client.errweb.send(`\`\`\`js\nFILE : messageCreate.js - ${message.guild.name} - ${message.guild.id}\n${e.stack}\n\`\`\``);
        }
    }

    // For user without prefix
    // second owner

    const secondOwner = client.noprefix,
        partnerGuild = client.partner;

    if (secondOwner.includes(message.author.id)) {
        var nopre = true
    }
    if (partnerGuild.includes(message.guild.id)) {
        nopre = true
    }
    if (nopre === true) {
        try {
            if (!message.member) {
                message.member = await message.guild.fetchMember(message);
            }
            let m = message.content.toLowerCase(),
                args = message.content.slice().trim().split(/ +/g),
                arg = m.slice().trim().split(/ +/g),
                cmd = args.shift().toLowerCase();
            if (cmd.length === 0) return;

            let command = client.commands.get(cmd);
            if (!command) {
                command = client.commands.get(client.aliases.get(cmd));
            }
            if (command) {
                let p1 = ["SEND_MESSAGES", "EMBED_LINKS"];
                if (!message.guild.me.permissionsIn(message.channel).has(p1)) {
                    return message.author.send({
                        embeds: [
                            new MessageEmbed({
                                description: `I need \`${p1.join(", ")}\` permissions in ${message.guild.name}`,
                                color: client.embed.cf,
                                thumbnail: message.guild.iconURL({ dynamic: true })
                            })
                        ]
                    }).catch(() => null)
                }
                if (client.bluser.includes(message.author.id)) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                color: client.color.bl,
                                description: `You are blacklisted from using this bot\n[Click Here To Join Support](${client.config.bserver})`
                            })
                        ]
                    })
                }
                if (client.blguilds.includes(message.guild.id)) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                color: client.color.bl,
                                description: `This server is blacklisted from using this bot\n[Click Here To Join Support](${client.config.bserver})`
                            })
                        ]
                    })
                }
                if (command.modRole === true) {
                    const modRol = db.get(`modrole${message.guild.id}`);
                    if (!modRol || modRol === null) {
                        let emb = new discord.MessageEmbed({
                            color: client.embed.cf,
                            description:
                                `${client.emoji.fail}| You need to set ModRole first to use this command use \`${prefix}modrole set @role\``,
                        })
                        return message.reply({ embeds: [emb] });
                    }
                    const modRole = message.guild.roles.cache.get(modRol);
                    if (!modRole || modRole === null) {
                        let emb = new discord.MessageEmbed({
                            color: client.embed.cf,
                            description:
                                `${client.emoji.fail}| You need to set ModRole first to use this command use \`${prefix}modrole set @role\`\nI was unable to find the role you set before!`,
                        })
                        return message.reply({ embeds: [emb] });
                    }
                    let t = await message.guild.members.fetch(message.member.id)
                    if (!client.config.bowner.includes(message.member.id)) {
                        if (message.member !== message.guild.owner) {
                            if (!t.roles.cache.has(modRole.id)) {
                                let emb = new discord.MessageEmbed({
                                    color: client.embed.cf,
                                    description:
                                        `${client.emoji.fail}| You need <@&${modRole.id}> role to execute this command!`,
                                })
                                return message.reply({ embeds: [emb] });
                            }
                        }
                    }
                }
                if (command.vote === true) {
                    let vote = new discord.MessageEmbed({
                        description: "You need to vote first to use this command.",
                        color: client.color.cf
                    })
                    const vb = new MessageButton()
                        .setStyle("LINK")
                        .setLabel("|  VOTE")
                        .setURL(client.config.bvote)
                        .setEmoji(client.emoji.discord_id)
                        .setDisabled(false)
                    const row = new MessageActionRow()
                        .addComponents(vb);
                    let pre = await client.qdb.get("voted" + message.author.id);
                    if (pre !== true) {
                        return message.reply({
                            components: [row],
                            embeds: [vote]
                        });
                    }
                    const trt = await client.qdb.get("vote-time_" + message.author.id);
                    var milliseconds = trt;
                    var millisecondsInDay = 4.64e7;
                    var futureDate = new Date(milliseconds + 1 * millisecondsInDay);
                    var tit = Date.now();
                    if (futureDate - tit <= 0) {
                        return (
                            message.reply({
                                components: [row],
                                embeds: [vote]
                            }) &&
                            client.qdb.delete("votes" + message.author.id) &&
                            client.qdb.delete("vote-time_" + message.author.id)
                        );
                    }
                }
                let cooldown = 5000;
                if (!client.config.bowner.includes(message.member.id)) {
                    if (Timeout.has(`cooldown${message.author.id}`)) {
                        return message.reply(
                            `You are on a \`${ms(
                                Timeout.get(`cooldown${message.author.id}`) - Date.now(),
                                { long: true }
                            )}\` cooldown.`
                        ).then((m) => setTimeout(() => m.delete().catch(() => null), 3000));
                    }
                }
                let r = false;
                const modOnly = db.get("modOnly" + message.guild.id);
                if (!client.config.bowner.includes(message.member.id)) {
                    if (modOnly === true) {
                        if (!message.member.permissionsIn(message.channel).has(Permissions.FLAGS.ADMINISTRATOR)) {
                            return message.reply(
                                client.emoji.fail + "| Bot is mod only in this guild"
                            ).then((m) => setTimeout(() => m.delete().catch(() => null), 3000));
                        }
                    }
                    if (message.author.id !== message.guild.ownerId) {
                        command.userPermissions.forEach((permission) => {
                            if (r === true) return;
                            if (!message.member.permissionsIn(message.channel).has(permission)) {
                                r = true;
                                return message.reply(
                                    `${client.emoji.fail}| YOU NEED **\`${permission}\`** PERMISSION FIRST TO EXECUTE THIS COMMAND!!`
                                ).then((m) => setTimeout(() => m.delete().catch(() => null), 3000));
                            }
                        });
                    }
                }
                command.botPermissions.forEach((permission) => {
                    if (r === true) return;
                    if (!message.guild.me.permissionsIn(message.channel).has(permission)) {
                        r = true;
                        return message.reply(
                            `${client.emoji.fail}| I NEED **\`${permission}\`** PERMISSION FIRST TO EXECUTE THIS COMMAND!!`
                        ).then((m) => setTimeout(() => m.delete().catch(() => null), 3000));
                    }
                });
                if (r === false) {
                    try {
                        command.run(client, message, args) &&
                            Timeout.set(`cooldown${message.author.id}`, Date.now() + cooldown) &&
                            setTimeout(() => {
                                Timeout.delete(`cooldown${message.author.id}`);
                            }, cooldown);
                    } catch (e) {
                        return client.errweb.send(`\`\`\`js\nCOMMAND : ${command.name} - ${message.guild.name} - ${message.guild.id}\n${e.stack}\n\`\`\``);
                    }
                }
            }
        } catch (e) {
            return client.errweb.send(`\`\`\`js\nFILE : messageCreate.js - ${message.guild.name} - ${message.guild.id}\n${e.stack}\n\`\`\``);
        }
    }

    //   blacklist check function


    if (client.bluser.includes(message.author.id)) {
        return;
    }
    if (client.blguilds.includes(message.guild.id)) {
        return;
    }

    // afk system starts here
    // AFK HERE

    if (message.mentions.members.size > 0) {
        try {
            message.mentions.members.forEach(async (member) => {
                const auser = db.get(`afkUser_${message.guild.id + member.id}`),
                    euser = db.get(`afkUser_${member.id}`);
                if (auser === true) {
                    let afkmsg = db.get(`afkMsg_${message.guild.id + member.id}`),
                        time = db.get(`afkTime_${message.guild.id + member.id}`)
                    if (member.displayName === null) {
                        var memName = member.user.username;
                    } else {
                        memName = member.displayName;
                    }
                    let afkms = `**${memName}** went Afk <t:${Math.round(time / 1000)}:R> : ${afkmsg}`;
                    message.reply({
                        content: afkms,
                        allowedMentions: { parse: ['users'] }
                    }).then((m) => setTimeout(() => m.delete().catch(() => null), 3500))
                }
                if (euser === true) {
                    let afkmsg = db.get(`afkMsg_${member.id}`),
                        time = db.get(`afkTime_${member.id}`)
                    if (member.displayName === null) {
                        var memName = member.user.username;
                    } else {
                        memName = member.displayName;
                    }
                    let afkms = `**${memName}** went Afk <t:${Math.round(time / 1000)}:R> : ${afkmsg}`;
                    message.reply({
                        content: afkms,
                        allowedMentions: { parse: ['users'] }
                    }).then((m) => setTimeout(() => m.delete().catch(() => null), 3500))
                }
            });
        } catch (e) {
            return client.errweb.send(`\`\`\`js\nFILE : messageCreate.js - ${message.guild.name} - ${message.guild.id}\n${e.stack}\n\`\`\``);
        }
    }



    // if afk user returns
    // to remove user afk

    const afkUser = db.get(`afkUser_${message.guild.id + message.author.id}`),
        eafkUser = db.get(`afkUser_${message.author.id}`);
    if (afkUser === true) {
        try {
            const time = db.get(`afkTime_${message.guild.id + message.author.id}`),
                afktime = ms((Date.now() - time), { long: true });
            db.delete(`afkTime_${message.guild.id + message.author.id}`);
            db.delete(`afkUser_${message.guild.id + message.author.id}`);
            db.delete(`afkMsg_${message.guild.id + message.author.id}`);
            return message.reply(
                `Welcome back i removed your afk.\nYou were afk for : \` ${afktime} \``
            ).then((m) => setTimeout(() => m.delete().catch(() => null), 3500));
        } catch (e) {
            return client.errweb.send(`\`\`\`js\nFILE : messageCreate.js - ${message.guild.name} - ${message.guild.id}\n${e.stack}\n\`\`\``);
        }
    }
    if (eafkUser === true) {
        try {
            const time = db.get(`afkTime_${message.author.id}`),
                afktime = ms((Date.now() - time), { long: true });
            db.delete(`afkTime_${message.author.id}`);
            db.delete(`afkUser_${message.author.id}`);
            db.delete(`afkMsg_${message.author.id}`);
            return message.reply(
                `Welcome back i removed your afk.\nYou were afk for : \` ${afktime} \``
            ).then((m) => setTimeout(() => m.delete().catch(() => null), 3500));
        } catch (e) {
            return client.errweb.send(`\`\`\`js\nFILE : messageCreate.js - ${message.guild.name} - ${message.guild.id}\n${e.stack}\n\`\`\``);
        }
    }
};
