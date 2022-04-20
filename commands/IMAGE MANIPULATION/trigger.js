const Discord = require("discord.js"),
    DIG = require("discord-image-generation"),
    nam = 'trigger';

module.exports = {
    name: nam,
    category: "Image Manipilation",
    description: `Edits your image with ${nam}`,
    usage: `${nam} @user`,
    userPermissions: [],
    botPermissions: ["ATTACH_FILES"],

    run: async (client, message, args) => {
        let target = message.mentions.members.first() || message.author,
            mem = message.guild.members.cache.get(target.id),
            img = mem.user.displayAvatarURL({ size: 2048, format: 'png' });
        message.channel.sendTyping();
        let output = await new DIG.Triggered().getImage(img),
            attach = new Discord.MessageAttachment(output, `${nam}.gif`);
        return message.reply({ files: [attach] });
    }
};