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

    let prefix = client.qdb.get(`guildPrefix_${message.guild.id}`);
    if (!prefix) {
      prefix = client.config.pprefix;
    }

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
    } else if (args[0] === "pussy") {
      const { body } = await superagent.get(
        "https://nekos.life/api/v2/img/pussy"
      );
      embed.setTitle("Hentai Pussy");
      embed.setImage(body.url);
      return message.channel.send({ embeds: [embed] });
    } else if (args[0] === "anal") {
      const { body } = await superagent.get(
        "https://nekos.life/api/v2/img/anal"
      );
      embed.setTitle("Hentai Anal");
      embed.setImage(body.url);
      return message.channel.send({ embeds: [embed] });
    } else if (args[0] === "boob" || args[0] === "boobs") {
      const { body } = await superagent.get(
        "https://nekos.life/api/v2/img/boobs"
      );
      embed.setTitle("Hentai Boobs");
      embed.setImage(body.url);
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
              "hentai <anal>\n3. " +
              prefix +
              "hentai <ass>\n4. " +
              prefix +
              "hentai <random>\n5. " +
              prefix +
              "hentai <thigh>\n6." +
              prefix +
              "hentai <boob>\n7." +
              prefix +
              "hentai <pussy>"
            )
            .setColor(client.embed.cf)
            .setFooter("<> are not required")
        ]
      });
    }
  }
};
