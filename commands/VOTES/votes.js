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
        if (!args[0] || message.mentions.members.size > 0 && !args[1] || message.mentions.roles.size > 0) {
            let voteUser = message.mentions.members.first() || message.member,
                votes = await client.qdb.get(`vote-total${voteUser.id}`),
                vote = new MessageEmbed({
                    description: `${voteUser} Have A Total Of ${votes} Votes\nClick on the button to vote or [here](${client.config.bvote})`,
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
        } else if (args[0] === 'send' || args[0] === 'transfer') {
            if (!args[1]) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cf,
                            description: `${client.emoji.fail}| You forgot to provide the amount!`
                        })
                    ]
                })
            }
            if (isNaN(args[1]) && args[1] !== 'all') {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cf,
                            description: `${client.emoji.fail}| You forgot to provide the vaild amount!`
                        })
                    ]
                })
            }
            if (!args[2]) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cf,
                            description: `${client.emoji.fail}| You forgot to provide the user to send the votes!`
                        })
                    ]
                })
            }
            let target = message.guild.members.cache.get(args[2]) || message.mentions.members.first(),
                votes = await client.qdb.get(`vote-total${message.author.id}`),
                tvotes = await client.qdb.get(`vote-total${target.id}`)

            if (!target) {
                target = await message.guild.members.fetch(args[2]).catch(() => null)
            }

            if (!target) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cf,
                            description: `${client.emoji.fail}| You didn't provide the valid user to send the votes!`
                        })
                    ]
                })
            }

            if (tvotes === null) {
                client.qdb.set(`vote-total${target.id}`, '0');
            }
            let amt
            if (args[1] !== 'all') {
                amt = args[1];
            } else {
                amt = votes;
            }
            if (votes < amt) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: client.embed.cf,
                            description: `${client.emoji.fail}| You don't have that much votes!`
                        })
                    ]
                })
            }
            let btn1 = new MessageButton()
                .setStyle("SUCCESS")
                .setLabel("SEND")
                .setEmoji(client.emoji.success_id)
                .setCustomId("vote_send")
                .setDisabled(false),
                btn2 = new MessageButton()
                    .setStyle("DANGER")
                    .setLabel("CANCEL")
                    .setEmoji(client.emoji.cross_id)
                    .setCustomId("vote_cancel")
                    .setDisabled(false),
                row = new MessageActionRow()
                    .addComponents(btn1, btn2),
                embed = new MessageEmbed({
                    color: client.color.cm,
                    description: `Do you want to transfer your ${amt} votes to ${target}!`
                })

            let m = await message.reply({ components: [row], embeds: [embed] }),
                collector = m.createMessageComponentCollector({ time: 30000 });

            collector.on("collect", async (button) => {
                if (button.user.id !== message.author.id) {
                    let emm = new MessageEmbed({
                        description: client.emoji.fail + client.error.menu,
                        color: client.embed.cf
                    })
                    return button.reply({ ephemeral: true, embeds: [emm] })
                }
                collector.resetTimer();
                if (button.customId === "vote_send") {
                    client.qdb.add(`vote-total${message.author.id}`, -amt);
                    client.qdb.add(`vote-total${target.id}`, +amt);
                    await button.message.reply({
                        embeds: [
                            new MessageEmbed({
                                color: client.embed.cr,
                                description: `${client.emoji.success}| Sent ${amt} votes to ${target}!`
                            })
                        ]
                    })
                    let dis = new MessageActionRow()
                        .addComponents([btn1.setDisabled(true), btn2.setDisabled(true)]);
                    m.edit({ components: [dis] }).catch(() => null);
                } else if (button.customId === "vote_cancel") {
                    button.message.delete();
                }
            });
            collector.on("end", (_, reason) => {
                if (reason !== "messageDelete") {
                    let dis = new MessageActionRow()
                        .addComponents([btn1.setDisabled(true), btn2.setDisabled(true)]);
                    m.edit({ components: [dis] });
                }
            });
            collector.on('error', (e) => console.log(e));
        } else if (args[0] === 'redeem') {
            let votes = await client.qdb.get(`vote-total${message.author.id}`)
            if (votes < 70) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            color: client.color.cm,
                            description: `You need 70 votes to buy 1 Month premium!!`
                        })
                    ]
                })
            }
            let btn1 = new MessageButton()
                .setStyle("SUCCESS")
                .setLabel("BUY")
                .setEmoji(client.emoji.success_id)
                .setCustomId("vote_redeem")
                .setDisabled(false),
                btn2 = new MessageButton()
                    .setStyle("DANGER")
                    .setLabel("CANCEL")
                    .setEmoji(client.emoji.cross_id)
                    .setCustomId("vote_redeem_c")
                    .setDisabled(false),
                row = new MessageActionRow()
                    .addComponents(btn1, btn2),
                embed = new MessageEmbed({
                    color: client.color.cm,
                    description: `Do you want redeem 1 month premium with 70 votes!`
                })

            let m = await message.reply({ components: [row], embeds: [embed] }),
                collector = m.createMessageComponentCollector({ time: 30000 });

            collector.on("collect", async (button) => {
                if (button.user.id !== message.author.id) {
                    let emm = new MessageEmbed({
                        description: client.emoji.fail + client.error.menu,
                        color: client.embed.cf
                    })
                    return button.reply({ ephemeral: true, embeds: [emm] })
                }
                collector.resetTimer();
                if (button.customId === "vote_redeem") {
                    let pre = await client.qdb.get(`premium_${message.author.id}`);
                    if (pre === null) {
                        client.qdb.set(`premium_${message.author.id}`, '0');
                    }
                    client.qdb.add(`vote-total${message.author.id}`, -70);
                    client.qdb.add(`premium_${message.author.id}`, +1);
                    await button.message.reply({
                        embeds: [
                            new MessageEmbed({
                                color: client.embed.cr,
                                description: `${client.emoji.success}| Bought 1 Month prime with 70 votes!`
                            })
                        ]
                    })
                    let dis = new MessageActionRow()
                        .addComponents([btn1.setDisabled(true), btn2.setDisabled(true)]);
                    m.edit({ components: [dis] }).catch(() => null)
                } else if (button.customId === "vote_redeem_c") {
                    button.message.delete();
                }
            });
            collector.on("end", (_, reason) => {
                if (reason !== "messageDelete") {
                    let dis = new MessageActionRow()
                        .addComponents([btn1.setDisabled(true), btn2.setDisabled(true)]);
                    m.edit({ components: [dis] });
                }
            });
            collector.on('error', (e) => console.log(e));
        }
    },
};