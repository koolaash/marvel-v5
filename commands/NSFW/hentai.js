const { MessageEmbed } = require("discord.js"),
  NSFW = require("discord-nsfw"),
  nsfw = new NSFW(),
  superagent = require('superagent'),
  db = require("quick.db");

module.exports = {
  name: "hentai",
  usage: `hentai <type>`,
  aliases: ["h"],
  description: "shows help menu for the bot",
  userPermissions: [],
  botPermissions: ["EMBED_LINKS"],

  async run(client, message, args) {

    if (!message.channel.nsfw) {
      return message.reply(`${client.emoji.fail}| This channel dosen't support nsfw content`);
    }

    const data = await client.prefixModel.findOne({
      GuildID: message.guild.id,
    }),
      prefix = data ? `${data.Prefix}` : `${client.config.prefix}`;


    const embed = new MessageEmbed()
      .setColor(client.embed.cm)
      .setTimestamp()
      .setFooter({
        text: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true })
      });
    if (args[0] === "midriff" || args[0] === "riff") {
      const image = await nsfw.hmidriff();
      embed.setTitle("Hentai Midriff");
      embed.setImage(image);
      return message.channel.send({ embeds: [embed] });
    } else if (args[0] === "ass") {
      const image = await nsfw.hentaiass();
      embed.setTitle("Hentai Ass");
      embed.setImage(image);
      return message.channel.send({ embeds: [embed] });
    } else if (args[0] === "random") {
      const image = await nsfw.hentai();
      embed.setTitle("Random Hentai");
      embed.setImage(image);
      return message.channel.send({ embeds: [embed] });
    } else if (args[0] === "thigh") {
      const image = await nsfw.hentaithigh();
      embed.setTitle("Hentai Thigh");
      embed.setImage(image);
      return message.channel.send({ embeds: [embed] });
    } else if (args[0] || !args[0]) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle("CATEGORY HENTAI")
            .addField(
              "USAGE : ",
              "Aliases : `hentai , h`" +
              "\nUsage : `" +
              prefix +
              "hentai <type> or " +
              prefix +
              "h <type>`"
            )
            .addField(
              "HENTAI COMMANDS",
              "1. " +
              prefix +
              "hentai <midriff/riff>\n2. " +
              prefix +
              "hentai <ass>\n3. " +
              prefix +
              "hentai <random>\n4. " +
              prefix +
              "hentai <thigh>"
            )
            .setColor(client.embed.cf)
            .setFooter({ text: "<> are not required", iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        ]
      });
    }
  }
};
