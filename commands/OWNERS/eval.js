const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js"),
    discord = require('discord.js');

module.exports = {
    name: "eval",
    category: "owner",
    usage: "evasl",
    description: "eval command only for owner",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        let fowner = ['924589827586928730', '672027578181353473']

        if (!fowner.includes(message.author.id)) {
            return message.reply({ content: "You don't have access to this command!" });
        }

        const embed = new MessageEmbed()
            .setTitle("Eval Command")
            .setColor(client.embed.cm),
            next = new MessageButton()
                .setStyle("DANGER")
                .setLabel("❎ Cancel")
                .setCustomId("eval_cancel")
                .setDisabled(false),
            back = new MessageButton()
                .setStyle("SUCCESS")
                .setLabel("✅ Continue")
                .setCustomId("eval_ok")
                .setDisabled(false),
            extra = new MessageButton()
                .setStyle("PRIMARY")
                .setLabel("⭐ Saperation")
                .setCustomId("eval_extra")
                .setDisabled(false),
            row = new MessageActionRow()
                .addComponents(back, next, extra);

        let m = await message.channel.send({
            embeds: [embed],
            components: [row],
        })
        let collector = m.createMessageComponentCollector({ time: 30000 });

        collector.on('collect', async (button) => {
            if (button.user.id !== message.author.id) {
                let emm = new MessageEmbed({
                    description: client.emoji.fail + client.error.menu,
                    color: client.embed.cf
                })
                return button.reply({ ephemeral: true, embeds: [emm] })
            }
            if (button.customId == "eval_cancel") {
                return m.delete();
            } else if (button.customId === "eval_ok") {
                if (!client.config.bowner.includes(button.user.id)) {
                    return button.reply({ content: "You don't have access to this command!", ephemeral: true });
                }
                try {
                    let cmd = message.content.split(" ").slice(1).join(" ");
                    const result = eval(cmd);
                    embed.addFields({
                        name: "Input:",
                        value: `\`\`\`js\n${args}\`\`\``,
                        inline: false,
                    })
                        .setDescription(`**Output:**\n\`\`\`js\n${result}\`\`\``);
                    back.setDisabled(true);
                    let row = new MessageActionRow()
                        .addComponents(back, next, extra);
                    return button.update({
                        embeds: [embed],
                        components: [row],
                    });
                } catch (e) {
                    return button.reply({
                        content: `\`\`\`js\n${e}\n\`\`\``,
                        ephemeral: true
                    });
                }
            } else if (button.customId === "eval_extra") {
                if (!client.config.bowner.includes(button.user.id)) {
                    return button.reply({ content: "You don't have access to this command!", ephemeral: true });
                }
                try {
                    let cmd = args.join(" "),
                        result = eval(cmd);
                    return button.reply({ content: `\`\`\`js\n${result}\n\`\`\``, ephemeral: true });
                } catch (e) {
                    return button.reply({ content: `\`\`\`js\n${e}\n\`\`\``, ephemeral: true });
                }
            }
        });
        collector.on("end", (_, reason) => {
            if (reason !== "messageDelete") {
                let dis = new MessageActionRow()
                    .addComponents([
                        next.setDisabled(true),
                        back.setDisabled(true),
                        extra.setDisabled(true)
                    ]);
                m.edit({
                    components: [dis]
                })
            }
        });
        collector.on('error', (e) => console.log(e));
    },
};
