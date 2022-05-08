const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require('discord.js'),
    db = require('quick.db');

module.exports = {
    name: "nsfw-setup",
    usage: `nsfw-setup <#channel>`,
    aliases: ["setup-nsfw"],
    description: "shows help menu for the bot",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    vote: true,

    async run(client, message, args) {

        if (!args[0]) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail}| You Forgot to provide the channel!`,
                        color: client.embed.cf
                    })
                ]
            })
        }

        let ch = db.get(`nsfwSetup_chan${message.guild.id}`),
            ms = db.get(`nsfwSetup_msg${message.guild.id}`),
            chann = message.guild.channels.cache.get(ch);

        if (chann) {
            let nsfwmsg = await chann.messages.fetch(ms).catch(() => null);
            if (nsfwmsg) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: `${client.emoji.fail}| You already have setup in ${chann}`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
        }

        let nsfwChan = message.mentions.channels.first() ||
            message.guild.channels.cache.get(args[0]);

        if (!nsfwChan) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail}| provide a valid channel!`,
                        color: client.embed.cf
                    })
                ]
            })
        }
        if (!message.guild.me.permissionsIn(nsfwChan).has("EMBED_LINKS", "SEND_MESSAGES", "VIEW_CHANNELS")) {
            return message.reply({
                embeds: [
                    `${client.emoji.fail}| I NEED **\`"EMBED_LINKS", "SEND_MESSAGES", "VIEW_CHANNELS"\`** PERMISSIONS IN <#${chan.id}> FIRST TO EXECUTE THIS COMMAND!!`
                ]
            })
        }


        if (!nsfwChan.nsfw) {
            return message.reply({
                embeds: [
                    new MessageEmbed({
                        description: `${client.emoji.fail}| That channel is not nsfw change that channels's settings!`,
                        color: client.embed.cf
                    })
                ]
            })
        }
        let options = [],
            option0 = { label: 'Hentai Ass', value: '0' },
            option1 = { label: 'Hentai Midriff', value: '1' },
            option2 = { label: 'Hentai Thigs', value: '2' },
            option3 = { label: 'Hentai Random', value: '3' },
            option4 = { label: 'Porn Anal', value: '4' },
            option5 = { label: 'Porn Ass', value: '5' },
            option6 = { label: 'Porn Boobs', value: '6' },
            option7 = { label: 'Porn 4k', value: '7' },
            option8 = { label: 'Porn Pussy', value: '8' },
            option9 = { label: 'Porn Gif', value: '9' },
            option10 = { label: 'Porn Thigh', value: '10' },
            option11 = { label: 'Random Image', value: '11' },
            option12 = { label: 'Random Gif', value: '12' },
            option13 = { label: 'Random Video', value: '13' },
            option14 = { label: 'GoneWild', value: '14' };

        options.push(
            option0, option1, option2, option3, option4, option5, option6,
            option7, option8, option9, option10, option11, option12, option13,
            option14
        )
        let menu = new MessageSelectMenu()
            .setPlaceholder('Select Nsfw Type')
            .setCustomId('nsfwPage')
            .addOptions(options)
            .setMaxValues(1)
            .setMinValues(1),
            embed = new MessageEmbed({
                description: `Select the category you would like to sees\nMessage can only be seen by you full privacy\nSo no one knows you're horny as fuck XD`,
                color: client.embed.cm,
                footer: {
                    text: 'NSFW IN FEW CLICKS',
                    iconURL: client.user.displayAvatarURL()
                },
                author: {
                    name: message.guild.name,
                    iconURL: message.guild.iconURL({ dynamic: true })
                }
            }),
            group1 = new MessageActionRow().addComponents(menu);

        let m = await nsfwChan.send({
            embeds: [embed],
            components: [group1]
        });
        db.set(`nsfwSetup_chan${message.guild.id}`, nsfwChan.id);
        db.set(`nsfwSetup_msg${message.guild.id}`, m.id);
        return;
    }
}