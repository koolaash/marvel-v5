const discord = require("discord.js"),
    { MessageEmbed } = require("discord.js"),
    db = require("quick.db")

module.exports = {
    name: "automod",
    aliases: ["am"],
    category: "AUTOMODERATION",
    usage: "automod <add | remove | toggle | show | clear>",
    description: "automod commands",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],
    vote: true,

    run: async (client, message, args) => {
        let defprefix = client.config.pprefix,
            fail = client.embed.cf,
            success = client.embed.cr,
            main = client.embed.cm,
            semoji = client.emoji.success + "| ",
            aemoji = client.emoji.ar + "| ",
            femoji = client.emoji.fail + "| ",
            nprefix = await client.qdb.get(`guildPrefix_${message.guild.id}`),
            mer = args.join(" "),
            arg = mer.toLowerCase().split(/ +/g);

        if (nprefix !== null) {
            defprefix = nprefix;
        }

        if (!arg[0]) {
            let vr = defprefix + "am ",
                arg0 = new MessageEmbed()
                    .setTitle("Automod Commands")
                    .setDescription(
                        `${vr}badword <toggle | add | remove | show | clear>
${vr}link <toggle | add | remove | show | clear>
${vr}massmention/mm <role | user > <toggle | limit> 
${vr}capital/caps <toggle | limit> 
${vr}emoji <toggle | limit> 
${vr}spam <toggle | limit | timeout or time in seconds>\n` +
                        "```<> Are not required while using the command\nOnly place agruments between <>```"
                    )
                    .setColor(fail)
                    .setFooter({
                        text: message.author.tag,
                        iconURL: message.author.displayAvatarURL({ dynamic: true })
                    });
            return message.reply({ embeds: [arg0] });
        }

        if (!client.config.bowner.includes(message.author.id)) {
            if (message.member !== message.guild.owner) {
                if (
                    message.member.roles.highest.position <=
                    message.guild.me.roles.highest.position
                ) {
                    let em = new discord.MessageEmbed({
                        description: femoji + "Your role isn't higher than mine you cannot use this commamd",
                        color: fail,
                    })
                    return message.reply({ embeds: [em] });
                }
            }
        }

        /*
            
            here is the anti link settings
            
            */

        if (arg[0] === "badword" || arg[0] === "badwords" || arg[0] === "bw") {
            let nam = "badword";
            if (!arg[1]) {
                let em = new discord.MessageEmbed({
                    description: femoji + nam + " <add | reomve | toggle | show | clear>",
                    color: main,
                })
                return message.reply({ embeds: [em] });
            } else if (arg[1] === "add") {
                if (!arg[2]) {
                    let em = new discord.MessageEmbed({
                        description: femoji + "Provide the word to add first.",
                        color: fail,
                    })
                    return message.reply({ embeds: [em] });
                } else if (arg[2]) {
                    let swearWords = db.get(nam + `.word_${message.guild.id}`);
                    if (!swearWords || swearWords === null) {
                        db.push(nam + `.word_${message.guild.id}`, "fuck");
                    }
                    const swears = db.get(nam + `.word_${message.guild.id}`),
                        agss = arg.splice(2).join(" "),
                        ags = agss.split(" ");

                    if (swears !== null) {
                        const msgs = ags;
                        let add = false;
                        msgs.forEach((msg) => {
                            if (!swears.includes(msg)) {
                                db.push(nam + `.word_${message.guild.id}`, msg);
                            }
                        });
                        let em = new discord.MessageEmbed({
                            description: semoji + "Added ||" + ags + "|| to badwords list",
                            color: success,
                        })
                        return message.reply({ embeds: [em] });
                    }
                }
            } else if (arg[1] === "remove") {
                if (!arg[2]) {
                    let em = new discord.MessageEmbed({
                        description: femoji + "Provide the word to remove first.",
                        color: fail,
                    })
                    return message.reply({ embeds: [em] });
                } else if (arg[2]) {
                    const words = db.get(nam + `.word_${message.guild.id}`);
                    const valueToRemove = arg[2];
                    const filteredItems = words.filter(function (item) {
                        return item !== valueToRemove;
                    });
                    db.delete(nam + `.word_${message.guild.id}`, arg[2]);
                    filteredItems.forEach((word) =>
                        db.push(nam + `.word_${message.guild.id}`, word)
                    );
                    let em = new discord.MessageEmbed({
                        description:
                            semoji + "Removed " + arg[2] + " from " + nam + " list",
                        color: success,
                    })
                    return message.reply({ embeds: [em] });
                }
            } else if (arg[1] === "show") {
                const chan = db.get(nam + `.word_${message.guild.id}`);
                const embed = new discord.MessageEmbed();
                if (chan !== undefined) {
                    if (chan !== null) {
                        embed
                            .setTitle(aemoji + "BAD WORDS")
                            .setDescription("|| " + chan.join(" ") + " ||");
                    } else {
                        embed.addField(
                            aemoji + "BAD WORDS",
                            "NONE\nUse bw add word1 word2 word3.... command to add words"
                        );
                    }
                } else {
                    embed.addField(
                        aemoji + "BAD WORDS",
                        "NONE\nUse bw add word1 word2 word3.... command to add words"
                    );
                }
                embed.setColor(main);
                return message.reply({ embeds: [embed] });
            } else if (arg[1] === "toggle") {
                const toggle = db.get(nam + "Toggle_" + message.guild.id);
                if (toggle !== true) {
                    db.set(nam + "Toggle_" + message.guild.id, true);
                    let em = new discord.MessageEmbed({
                        description: semoji + "Badword filter is now **`ON`**",
                        color: success,
                    })
                    return message.reply({ embeds: [em] });
                } else {
                    db.delete(nam + "Toggle_" + message.guild.id);
                    let em = new discord.MessageEmbed({
                        description: semoji + "Badword filter is now **`OFF`**",
                        color: success,
                    })
                    return message.reply({ embeds: [em] });
                }
            } else if (arg[1] === "clear") {
                db.delete(nam + `.word_${message.guild.id}`);
                let em = new discord.MessageEmbed({
                    description: semoji + "Cleared the whole badword list",
                    color: success,
                })
                return message.reply({ embeds: [em] });
            } else if (arg[1]) {
                let em = new discord.MessageEmbed({
                    description:
                        femoji + nam + " <add | reomve | toggle | show | clear>",
                    color: main,
                })
                return message.reply({ embeds: [em] });
            }
            /*
              
              here is the anti link settings
              
              */
        } else if (arg[0] === "link" || arg[0] === "links" || arg[0] === "url") {
            let nam = "link";
            if (!arg[1]) {
                return message.reply({
                    embeds: [
                        new discord.MessageEmbed({
                            description: femoji + nam + " toggle",
                            color: main,
                        })
                    ]
                });
            } else if (arg[1] === "toggle") {
                const toggle = db.get(nam + "Toggle_" + message.guild.id);
                if (toggle !== true) {
                    db.set(nam + "Toggle_" + message.guild.id, true);
                    return message.reply({
                        embeds: [
                            new discord.MessageEmbed({
                                description: semoji + "Badword filter is now **`ON`**",
                                color: success,
                            })
                        ]
                    });
                } else {
                    db.delete(nam + "Toggle_" + message.guild.id);
                    return message.reply({
                        embeds: [
                            new discord.MessageEmbed({
                                description: semoji + "Badword filter is now **`OFF`**",
                                color: success,
                            })
                        ]
                    });
                }
            } else if (arg[1]) {
                return message.reply({
                    embeds: [
                        new discord.MessageEmbed({
                            description: femoji + nam + " toggle",
                            color: main,
                        })
                    ]
                });
            }
        } else if (arg[0] === "massmention" || arg[0] === "mm") {
            let mnam = "massmention";
            if (!arg[1]) {
                return message.reply({
                    embeds: [
                        new discord.MessageEmbed({
                            description: femoji + mnam + " <user | role>",
                            color: main,
                        })
                    ]
                });

                /*
                
                here is the anti mass mention for users
                
                */
            } else if (arg[1] === "user" || arg[1] === "users") {
                let nam = "user";
                if (!arg[2]) {
                    return message.reply({
                        embeds: [
                            new discord.MessageEmbed({
                                description: femoji + nam + " <limit | toggle>",
                                color: fail,
                            })
                        ]
                    });
                }
                if (arg[2] === "limit") {
                    if (!arg[3]) {
                        return message.reply({
                            embeds: [
                                new discord.MessageEmbed({
                                    description: femoji + "Provide a value first",
                                    color: fail,
                                })
                            ]
                        });
                    } else if (arg[3] === "0") {
                        return message.reply({
                            embeds: [new discord.MessageEmbed({
                                description: femoji + "Value must be above 0",
                                color: fail,
                            })]
                        });
                    } else if (Number.isNaN(+arg[3])) {
                        return message.reply({
                            embeds: [new discord.MessageEmbed({
                                description: femoji + "Value must be a number",
                                color: fail,
                            })]
                        });
                    }
                    let newval = arg[3];
                    db.set(`userLimit_${message.guild.id}`, newval);
                    return message.reply({
                        embeds: [new discord.MessageEmbed({
                            description: semoji + "Set maxmention users limit to " + newval,
                            color: success,
                        })]
                    });
                } else if (arg[2] === "toggle") {
                    const ul = db.get(`userToggle_${message.guild.id}`);
                    if (ul === true) {
                        db.delete(`userToggle_${message.guild.id}`);
                        return message.reply({
                            embeds: [new discord.MessageEmbed({
                                description: semoji + "Maxmention for users is now off",
                                color: success,
                            })]
                        });
                    } else {
                        db.set(`userToggle_${message.guild.id}`, true);
                        return message.reply({
                            embeds: [new discord.MessageEmbed({
                                description:
                                    semoji +
                                    "Maxmention for users is now on\nMake sure to set the limit",
                                color: success,
                            })]
                        });
                    }
                }
                /*
                
                here is the anti mass mention for roles
                
                */
            } else if (arg[1] === "role" || arg[1] === "roles") {
                let nam = "role";
                if (!arg[2]) {
                    return message.reply({
                        embeds: [new discord.MessageEmbed({
                            description: femoji + nam + " <limit | toggle>",
                            color: fail,
                        })]
                    });
                }
                if (arg[2] === "limit") {
                    if (!arg[3]) {
                        return message.reply({
                            embeds: [new discord.MessageEmbed({
                                description: femoji + "Provide a value first",
                                color: fail,
                            })]
                        });
                    } else if (arg[3] === "0") {
                        return message.reply({
                            embeds: [new discord.MessageEmbed({
                                description: femoji + "Value must be above 0",
                                color: fail,
                            })]
                        });
                    } else if (Number.isNaN(+arg[3])) {
                        return message.reply({
                            embeds: [new discord.MessageEmbed({
                                description: femoji + "Value must be a number",
                                color: fail,
                            })]
                        });
                    }
                    let newval = arg[3];
                    db.set(`roleLimit_${message.guild.id}`, newval);
                    return message.reply({
                        embeds: [new discord.MessageEmbed({
                            description: semoji + "Set maxmention users limit to " + newval,
                            color: success,
                        })]
                    });
                } else if (arg[2] === "toggle") {
                    const ul = db.get(`roleToggle_${message.guild.id}`);
                    if (ul === true) {
                        db.delete(`roleToggle_${message.guild.id}`);
                        return message.reply({
                            embeds: [new discord.MessageEmbed({
                                description: semoji + "Maxmention for roles is now off",
                                color: success,
                            })]
                        });
                    } else {
                        db.set(`roleToggle_${message.guild.id}`, true);
                        return message.reply({
                            embeds: [new discord.MessageEmbed({
                                description:
                                    semoji +
                                    "Maxmention for roles is now on\nMake sure to set the limit",
                                color: success,
                            })]
                        });
                    }
                }
                /*
                here is the anti caps setiings
                */
            }
        } else if (arg[0] === "caps" || arg[0] === "capitals") {
            let nam = "capitals";
            if (!arg[1]) {
                return message.reply({
                    embeds: [new discord.MessageEmbed({
                        description: femoji + nam + " <limit | toggle>",
                        color: fail,
                    })]
                });
            }
            if (arg[1] === "limit") {
                if (!arg[2]) {
                    return message.reply({
                        embeds: [new discord.MessageEmbed({
                            description: femoji + "Provide a value first",
                            color: fail,
                        })]
                    });
                } else if (arg[2] === "0") {
                    return message.reply({
                        embeds: [new discord.MessageEmbed({
                            description: femoji + "Value must be above 0",
                            color: fail,
                        })]
                    });
                } else if (Number.isNaN(+arg[2])) {
                    return message.reply({
                        embeds: [new discord.MessageEmbed({
                            description: femoji + "Value must be a number",
                            color: fail,
                        })]
                    });
                }
                let newval = arg[2];
                db.set(`capsLimit_${message.guild.id}`, newval);
                return message.reply({
                    embeds: [new discord.MessageEmbed({
                        description: semoji + "Set max Caps limit to " + newval,
                        color: success,
                    })]
                });
            } else if (arg[1] === "toggle") {
                const ul = db.get(`capsToggle_${message.guild.id}`);
                if (ul === true) {
                    db.delete(`capsToggle_${message.guild.id}`);
                    return message.reply({
                        embeds: [new discord.MessageEmbed({
                            description: semoji + "Max Caps is now off",
                            color: success,
                        })]
                    });
                } else {
                    db.set(`capsToggle_${message.guild.id}`, true);
                    return message.reply({
                        embeds: [new discord.MessageEmbed({
                            description:
                                semoji + "Max Caps now on\nMake sure to set the limit",
                            color: success,
                        })]
                    });
                }
            }
            /*
              here is the anti emoji setiings
              */
        } else if (arg[0] === "emoji" || arg[0] === "emojis") {
            let nam = "emoji";
            if (!arg[1]) {
                return message.reply({
                    embeds: [new discord.MessageEmbed({
                        description: femoji + nam + " <limit | toggle>",
                        color: fail,
                    })]
                });
            }
            if (arg[1] === "limit") {
                if (!arg[2]) {
                    return message.reply({
                        embeds: [new discord.MessageEmbed({
                            description: femoji + "Provide a value first",
                            color: fail,
                        })]
                    });
                } else if (arg[2] === "0") {
                    return message.reply({
                        embeds: [new discord.MessageEmbed({
                            description: femoji + "Value must be above 0",
                            color: fail,
                        })]
                    });
                } else if (Number.isNaN(+arg[2])) {
                    return message.reply({
                        embeds: [new discord.MessageEmbed({
                            description: femoji + "Value must be a number",
                            color: fail,
                        })]
                    });
                }
                let newval = arg[2];
                db.set(`emojiLimit_${message.guild.id}`, newval);
                return message.reply({
                    embeds: [new discord.MessageEmbed({
                        description: semoji + "Set max emoji limit to " + newval,
                        color: success,
                    })]
                });
            } else if (arg[1] === "toggle") {
                const ul = db.get(`emojiToggle_${message.guild.id}`);
                if (ul === true) {
                    db.delete(`emojiToggle_${message.guild.id}`);
                    return message.reply({
                        embeds: [new discord.MessageEmbed({
                            description: semoji + "Max emoji is now off",
                            color: success,
                        })]
                    });
                } else {
                    db.set(`emojiToggle_${message.guild.id}`, true);
                    return message.reply({
                        embeds: [new discord.MessageEmbed({
                            description:
                                semoji + "Max emoji now on\nMake sure to set the limit",
                            color: success,
                        })]
                    });
                }
            } /*
        anti spam setiings here 
        */
        } else if (arg[0] === "spam" || arg[0] === "spamming") {
            let nam = "spam";
            if (!arg[1]) {
                return message.reply({
                    embeds: [new discord.MessageEmbed({
                        description: femoji + nam + " <limit | toggle | time>",
                        color: fail,
                    })]
                });
            }
            if (arg[1] === "limit") {
                if (!arg[2]) {
                    return message.reply({
                        embeds: [new discord.MessageEmbed({
                            description: femoji + "Provide a value first",
                            color: fail,
                        })]
                    });
                } else if (arg[2] === "0") {
                    return message.reply({
                        embeds: [new discord.MessageEmbed({
                            description: femoji + "Value must be above 0",
                            color: fail,
                        })]
                    });
                } else if (Number.isNaN(+arg[2])) {
                    return message.reply({
                        embeds: [new discord.MessageEmbed({
                            description: femoji + "Value must be a number",
                            color: fail,
                        })]
                    });
                }
                let newval = arg[2];
                db.set(`spamLimit_${message.guild.id}`, newval);
                return message.reply({
                    embeds: [new discord.MessageEmbed({
                        description: semoji + "Set max message limit to " + newval,
                        color: success,
                    })]
                });
            } else if (arg[1] === "toggle") {
                const ul = db.get(`spamToggle_${message.guild.id}`);
                if (ul === true) {
                    db.delete(`spamToggle_${message.guild.id}`);
                    return message.reply({
                        embeds: [new discord.MessageEmbed({
                            description: semoji + "Max messages is now off",
                            color: success,
                        })]
                    });
                } else {
                    db.set(`spamToggle_${message.guild.id}`, true);
                    return message.reply({
                        embeds: [new discord.MessageEmbed({
                            description:
                                semoji +
                                "Max message now on\nMake sure to set the limit & timeout",
                            color: success,
                        })]
                    });
                }
            } else if (arg[1] === "time" || arg[1] === "timeout") {
                if (!arg[2]) {
                    return message.reply({
                        embeds: [new discord.MessageEmbed({
                            description: femoji + "Provide a value first",
                            color: fail,
                        })]
                    });
                } else if (arg[2] === "0") {
                    return message.reply({
                        embeds: [new discord.MessageEmbed({
                            description: femoji + "Value must be above 0",
                            color: fail,
                        })]
                    });
                } else if (Number.isNaN(+arg[2])) {
                    return message.reply({
                        embeds: [new discord.MessageEmbed({
                            description: femoji + "Value must be a number",
                            color: fail,
                        })]
                    });
                }
                let newval = arg[2] + "000";
                db.set(`spamTime_${message.guild.id}`, newval);
                return message.reply({
                    embeds: [new discord.MessageEmbed({
                        description:
                            semoji + "Set max message time to " + newval + " seconds!",
                        color: success,
                    })]
                });
            }
            /*
            config here
            
            */
        } else if (
            arg[0] === "settings" ||
            arg[0] === "setting" ||
            arg[0] === "config" ||
            arg[0] === "configurations" ||
            arg[0] === "configuration"
        ) {
            let automod = new MessageEmbed()
                .setTitle("Automod Configurations")
                .setColor(main)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setFooter({
                    text: message.author.tag,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                });
            let spamToggle = db.get(`spamToggle_${message.guild.id}`),
                spamLimit = db.get(`spamLimit_${message.guild.id}`),
                spamTime = db.get(`spamTime_${message.guild.id}`),
                emojiToggle = db.get(`emojiToggle_${message.guild.id}`),
                emojiLimit = db.get(`emojiLimit_${message.guild.id}`),
                capsToggle = db.get(`capsToggle_${message.guild.id}`),
                capsLimit = db.get(`capsLimit_${message.guild.id}`),
                roleToggle = db.get(`roleToggle_${message.guild.id}`),
                roleLimit = db.get(`roleLimit_${message.guild.id}`),
                userToggle = db.get(`userToggle_${message.guild.id}`),
                userLimit = db.get(`userLimit_${message.guild.id}`),
                badwordToggle = db.get(`badwordToggle_${message.guild.id}`),
                linkToggle = db.get(`linkToggle_${message.guild.id}`),
                ignoreRole = db.get("ignoreRole_" + message.guild.id);

            if (ignoreRole !== undefined) {
                if (ignoreRole !== null) {
                    automod.addField(aemoji + "Ignored Role", "<@&" + ignoreRole + ">");
                } else {
                    automod.addField(
                        aemoji + "Ignored Role",
                        "NONE\nUse ignore or unignore command to set this up!"
                    );
                }
            } else {
                automod.addField(
                    aemoji + "Ignored Role",
                    "NONE\nUse ignore or unignore command to set this up!"
                );
            }

            if (!badwordToggle || badwordToggle === null || badwordToggle === false) {
                automod.addField(aemoji + "Badword Filter", "OFF");
            } else {
                automod.addField(
                    aemoji + "Badword Filter",
                    "ON\nam bw <add | remove | show | reset> to manage bad words"
                );
            }

            if (!linkToggle || linkToggle === null || linkToggle === false) {
                automod.addField(aemoji + "Link Filter", "OFF");
            } else {
                automod.addField(aemoji + "Link Filter", "ON");
            }

            if (!userToggle || userToggle === null || userToggle === false) {
                automod.addField(aemoji + "Max Mention Members", "OFF");
            } else {
                if (!userLimit || userLimit === null) {
                    db.set(`userLimit_${message.guild.id}`, 4);
                }
                userLimit = 4;
                automod.addField(
                    aemoji + "Max Mention Members",
                    "ON - Limit: " + userLimit
                );
            }

            if (!roleToggle || roleToggle === null || roleToggle === false) {
                automod.addField(aemoji + "Max Mention Roles", "OFF");
            } else {
                if (!roleLimit || roleLimit === null) {
                    db.set(`roleLimit_${message.guild.id}`, 2);
                }
                roleLimit = 2;
                automod.addField(
                    aemoji + "Max Mention Roles",
                    "ON - Limit: " + roleLimit
                );
            }

            if (!capsToggle || capsToggle === null || capsToggle === false) {
                automod.addField(aemoji + "Max Capitals", "OFF");
            } else {
                if (!capsLimit || capsLimit === null) {
                    db.set(`capsLimit_${message.guild.id}`, 14);
                    capsLimit = 14;
                }
                automod.addField(aemoji + "Max Capitals", "ON - Limit: " + capsLimit);
            }

            if (!emojiToggle || emojiToggle === null || emojiToggle === false) {
                automod.addField(aemoji + "Max Emojis", "OFF");
            } else {
                if (!emojiLimit || emojiLimit === null) {
                    db.set(`emojiLimit_${message.guild.id}`, 8);
                    emojiLimit = 8;
                }
                automod.addField(aemoji + "Max Emojis", "ON - Limit: " + emojiLimit);
            }

            if (!spamToggle || spamToggle === null || spamToggle === false) {
                automod.addField(aemoji + "Max Messages", "OFF");
            } else {
                if (!spamLimit || spamLimit === null) {
                    db.set(`spamLimit_${message.guild.id}`, 5);
                }
                spamLimit = 5;
                if (!spamTime || spamTime === null) {
                    db.set(`spamTime_${message.guild.id}`, 5000);
                }
                spamTime = 5000;
                automod.addField(
                    aemoji + "Max Messages",
                    "ON - Limit: " +
                    spamLimit +
                    " - Timeout: " +
                    spamTime / 1000 +
                    " Second(s)"
                );
            }
            return message.reply({
                embeds: [automod]
            });

        } else if (arg[0] === "autosetup" || arg[0] === "auto") {
            db.set(`spamToggle_${message.guild.id}`, true) &&
                db.set(`emojiToggle_${message.guild.id}`, true) &&
                db.set(`capsToggle_${message.guild.id}`, true) &&
                db.set(`roleToggle_${message.guild.id}`, true) &&
                db.set(`userToggle_${message.guild.id}`, true) &&
                db.set(`badwordToggle_${message.guild.id}`, true) &&
                db.set(`userLimit_${message.guild.id}`, 4) &&
                db.set(`roleLimit_${message.guild.id}`, 2) &&
                db.set(`emojiLimit_${message.guild.id}`, 6) &&
                db.set(`capsLimit_${message.guild.id}`, 12) &&
                db.set(`spamLimit_${message.guild.id}`, 5) &&
                db.set(`spamTime_${message.guild.id}`, 5000) &&
                db.set(`linkToggle_${message.guild.id}`, true);
            return message.reply({
                embeds: [new MessageEmbed({
                    description:
                        semoji +
                        "Automod Automatic Setup Done\nRun automod config to check configurations",
                    color: success,
                })]
            });
        } else if (arg[0] === "reset") {
            db.delete(`spamToggle_${message.guild.id}`) &&
                db.delete(`spamLimit_${message.guild.id}`) &&
                db.delete(`spamTime_${message.guild.id}`) &&
                db.delete(`emojiToggle_${message.guild.id}`) &&
                db.delete(`emojiLimit_${message.guild.id}`) &&
                db.delete(`capsToggle_${message.guild.id}`) &&
                db.delete(`capsLimit_${message.guild.id}`) &&
                db.delete(`roleToggle_${message.guild.id}`) &&
                db.delete(`roleLimit_${message.guild.id}`) &&
                db.delete(`userToggle_${message.guild.id}`) &&
                db.delete(`userLimit_${message.guild.id}`) &&
                db.delete(`badwordToggle_${message.guild.id}`) &&
                db.delete(`linkToggle_${message.guild.id}`);
            return message.reply({
                embeds: [new MessageEmbed({
                    description:
                        semoji +
                        "Automod reset successful\nRun automod config to check configurations",
                    color: success,
                })]
            });
        }
    },
};
