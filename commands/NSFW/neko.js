const { MessageEmbed } = require("discord.js"),
  nekoclient = require("nekos.life"),
  neko = new nekoclient(),
  NSFW = require("discord-nsfw"),
  nsfw = new NSFW();

module.exports = {
  name: "neko",
  usage: `neko <type>`,
  aliases: ["n"],
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
      .setFooter({
        text: message.author.username,
        iconURL: message.author.displayAvatarURL({ dynamic: true })
      })
      .setTimestamp((message.timestamp = Date.now()));
    if (args[0] === "boobs" || args[0] === "boob") {
      const image = await nsfw.nekotits();
      embed.setTitle("Neko Boobs");
      embed.setImage(image);
      return message.channel.send({ embeds: [embed] });
    } else if (args[0] === "nero") {
      const image = await nsfw.erokemo();
      embed.setTitle("Neko Nero");
      embed.setImage(image);
      return message.channel.send({ embeds: [embed] });
    } else if (args[0] === "feet") {
      const image = await nsfw.nekofeet();
      embed.setTitle("Neko Feet");
      embed.setImage(image);
      return message.channel.send({ embeds: [embed] });
    } else if (args[0] === "lewd") {
      const image = await nsfw.lewd();
      embed.setTitle("Neko Lewd");
      embed.setImage(image);
      return message.channel.send({ embeds: [embed] });
    } else if (args[0] === "pussy") {
      const image = await nsfw.nekopussy();
      embed.setTitle("Neko Pussy");
      embed.setImage(image);
      return message.channel.send({ embeds: [embed] });
    } else if (args[0] === "solo") {
      const image = await nsfw.solo();
      embed.setTitle("Neke Solo");
      embed.setImage(image);
      return message.channel.send({ embeds: [embed] });
    } else if (args[0] === "blowjob" || args[0] === "bj") {
      async function blowjob() {
        const GIF = await neko.nsfw.bJ();
        embed.setTitle("NEKO BLOWJOB");
        embed.setImage(GIF.url);
        return message.channel.send({ embeds: [embed] });
      }
      blowjob();
    } else if (args[0] === "cumart") {
      async function cumart() {
        const GIF = await neko.nsfw.cumArts();
        embed.setTitle("NEKO CUMART");
        embed.setImage(GIF.url);
        return message.channel.send({ embeds: [embed] });
      }
      cumart();
    } else if (args[0] === "cumslut" || args[0] === "cs") {
      async function cumslut() {
        const GIF = await neko.nsfw.cumsluts();
        embed.setTitle("NEKO CUMSLUT");
        embed.setImage(GIF.url);
        return message.channel.send({ embeds: [embed] });
      }
      cumslut();
    } else if (args[0] === "futanari") {
      async function futanari() {
        const GIF = await neko.nsfw.futanari();
        embed.setTitle("NEKO FUTANARI");
        embed.setImage(GIF.url);
        return message.channel.send({ embeds: [embed] });
      }
      futanari();
    } else if (args[0] === "lesbian" || args[0] === "lesbo") {
      async function lesbian() {
        const GIF = await neko.nsfw.lesbian();
        embed.setTitle("NEKO LESBIAN");
        embed.setImage(GIF.url);
        return message.channel.send({ embeds: [embed] });
      }
      lesbian();
    } else if (args[0] || !args[0]) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle("CATEGORY NEKO")
            .addField(
              "USAGE : ",
              "Aliases : `neko , n`" +
              "\nUsage : `" +
              prefix +
              "neko <type> or " +
              prefix +
              "n <type>`"
            )
            .addField(
              "NEKO COMMANDS",
              "1. " +
              prefix +
              "neko <boobs/boob>\n2. " +
              prefix +
              "neko <nero>\n3. " +
              prefix +
              "neko <feet>\n4. " +
              prefix +
              "neko <lewd>\n5. " +
              prefix +
              "neko <pussy>\n6. " +
              prefix +
              "neko <solo>\n7. " +
              prefix +
              "neko <blowjob/bj>\n8. " +
              prefix +
              "neko <cumart>\n9. " +
              prefix +
              "neko <cumslit/cs>\n10. " +
              prefix +
              "neko <futanari>\n11. " +
              prefix +
              "neko <lesbian/lesbo>"
            )
            .setColor(client.embed.cf)
            .setFooter("<> are not required")
        ]
      });
    }
  }
};
