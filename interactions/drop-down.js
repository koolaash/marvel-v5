const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js"),
    NSFW = require("discord-nsfw"),
    nsfw = new NSFW(),
    nekoclient = require("nekos.life"),
    neko = new nekoclient(),
    superagent = require('superagent'),
    { RandomPHUB } = require('discord-phub'),
    phub = new RandomPHUB(unique = true);

module.exports = function (client) {
    const description = {
        name: "drop-down",
        filename: "drop-down.js",
        version: "2.1",
    };
    console.log(
        ` :: ⬜️ Loaded : ${description.name} from ("${description.filename}")`.blue
    );

    client.on("interactionCreate", async interaction => {
        if (!interaction.isSelectMenu()) return;
        let button = interaction;
        if (button.message.author.id !== client.user.id) return;
        try {
            if (button.customId === 'nsfwPage') {
                let vote = new MessageEmbed({
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
                let pre = await client.qdb.get("voted" + button.user.id);
                if (pre !== true) {
                    return button.reply({
                        components: [row],
                        embeds: [vote],
                        ephemeral: true
                    });
                }
                const trt = await client.qdb.get("vote-time_" + button.user.id);
                var milliseconds = trt;
                var millisecondsInDay = 8.64e7;
                var futureDate = new Date(milliseconds + 1 * millisecondsInDay);
                var tit = Date.now();
                if (futureDate - tit <= 0) {
                    return (
                        button.reply({
                            components: [row],
                            embeds: [vote],
                            ephemeral: true
                        }) &&
                        client.qdb.delete("votes" + button.user.id) &&
                        client.qdb.delete("vote-time_" + button.user.id)
                    );
                }
                if (!button.channel.nsfw) {
                    return button.reply({ content: 'This channel is not **`NSFW`** marked!', ephemeral: true })
                }
                let choice = button.values[0]
                if (choice === '0') {
                    const image = await nsfw.hentaiass();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '1') {
                    const image = await nsfw.hmidriff();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '2') {
                    const image = await nsfw.hentaithigh();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '3') {
                    const image = await nsfw.hentai();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '4') {
                    const image = await nsfw.anal();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '5') {
                    const image = await nsfw.ass();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '6') {
                    const image = await nsfw.boobs();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '7') {
                    const image = await nsfw.fourk();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '8') {
                    const image = await nsfw.pussy();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '9') {
                    const image = await nsfw.pgif();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '10') {
                    const image = await nsfw.thigh();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '11') {
                    const img = phub.getRandom('jpeg')
                    return button.reply({ content: img.url, ephemeral: true })
                }
                if (choice === '12') {
                    const img = phub.getRandom('gif')
                    return button.reply({ content: img.url, ephemeral: true })
                }
                if (choice === '13') {
                    const img = phub.getRandom('mp4')
                    return button.reply({ content: img.url, ephemeral: true })
                }
                if (choice === '14') {
                    const image = await nsfw.gonewild();
                    return button.reply({ content: image, ephemeral: true })
                }
            }
        } catch (e) {
            return client.errweb.send(`\`\`\`js\nFILE : ${description.name} - ${button.guild.name} - ${button.guild.id}\n${e.stack}\n\`\`\``);
        }
    })
}