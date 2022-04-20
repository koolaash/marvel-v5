const { MessageEmbed } = require("discord.js"),
    NSFW = require("discord-nsfw"),
    nsfw = new NSFW(),
    nekoclient = require("nekos.life"),
    neko = new nekoclient(),
    superagent = require('superagent');

module.exports = function (client) {
    const description = {
        name: "nsfw-menu",
        filename: "nsfw-menu.js",
        version: "2.1",
    };
    console.log(
        ` :: ⬜️ Loaded : ${description.name} from ("${description.filename}")`.blue
    );

    client.on("interactionCreate", async interaction => {
        try {
            if (!interaction.isSelectMenu()) return;
            let button = interaction;
            if (button.message.author.id !== client.user.id) return;
            if (button.customId === 'nsfwPage') {
                if (!button.channel.nsfw) {
                    return button.reply({ content: 'This channel is not **`NSFW`** marked!', ephemeral: true })
                }
                let choice = button.values[0]
                if (choice === '0') {
                    const image = await nsfw.hentaiass();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '1') {
                    const { body } = await superagent.get(
                        "https://nekos.life/api/v2/img/anal"
                    );
                    return button.reply({ content: body.url, ephemeral: true })
                }
                if (choice === '2') {
                    const { body } = await superagent.get(
                        "https://nekos.life/api/v2/img/pussy"
                    );
                    return button.reply({ content: body.url, ephemeral: true })
                }
                if (choice === '3') {
                    const image = await nsfw.hmidriff();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '4') {
                    const { body } = await superagent.get(
                        "https://nekos.life/api/v2/img/boobs"
                    );
                    return button.reply({ content: body.url, ephemeral: true })
                }
                if (choice === '5') {
                    const image = await nsfw.hentaithigh();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '6') {
                    const image = await nsfw.hentai();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '7') {
                    const image = await nsfw.erokemo();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '8') {
                    const image = await nsfw.nekofeet();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '9') {
                    const image = await nsfw.lewd();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '10') {
                    const image = await nsfw.nekopussy();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '11') {
                    const image = await nsfw.solo();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '12') {
                    const image = await neko.nsfw.bJ();
                    return button.reply({ content: image.url, ephemeral: true })
                }
                if (choice === '13') {
                    const image = await neko.nsfw.cumArts();
                    return button.reply({ content: image.url, ephemeral: true })
                }
                if (choice === '14') {
                    const image = await neko.nsfw.cumsluts();
                    return button.reply({ content: image.url, ephemeral: true })
                }
                if (choice === '15') {
                    const image = await neko.nsfw.futanari();
                    return button.reply({ content: image.url, ephemeral: true })
                }
                if (choice === '16') {
                    const image = await neko.nsfw.lesbian();
                    return button.reply({ content: image.url, ephemeral: true })
                }
                if (choice === '17') {
                    const image = await nsfw.nekotits();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '18') {
                    const image = await nsfw.anal();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '19') {
                    const image = await nsfw.ass();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '20') {
                    const image = await nsfw.boobs();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '21') {
                    const image = await nsfw.fourk();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '22') {
                    const image = await nsfw.pussy();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '23') {
                    const image = await nsfw.pgif();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '24') {
                    const image = await nsfw.thigh();
                    return button.reply({ content: image, ephemeral: true })
                }
                if (choice === '25') {
                    const image = await nsfw.gonewild();
                    return button.reply({ content: image, ephemeral: true })
                }
            }
        } catch (e) {
            return client.errweb.send(`\`\`\`js\nFILE : ${description.name}\n${e.stack}\n\`\`\``);
        }
    })
}