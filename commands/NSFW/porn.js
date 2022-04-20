const { MessageEmbed } = require("discord.js"),
  NSFW = require("discord-nsfw"),
  nsfw = new NSFW();

module.exports = {
  name: "porn",
  aliases: ["p"],
  usage: `porn <type>`,
  description: "shows help menu for the bot",
  userPermissions: [],
  botPermissions: ["EMBED_LINKS"],

  async run(client, message, args) {

    if (!message.channel.nsfw) {
      return message.reply(`${client.emoji.fail}| This channel dosen't support nsfw content`);
    }

    let prefix = await client.qdb.get(`guildPrefix_${message.guild.id}`);

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
    if (args[0] === "4k") {
      const image = await nsfw.fourk();
      embed.setTitle("4k Full HD");
      embed.setImage(image);
      return message.channel.send({ embeds: [embed] });
    } else if (args[0] === "anal") {
      const image = await nsfw.anal();
      embed.setTitle("Anal");
      embed.setImage(image);
      return message.channel.send({ embeds: [embed] });
    } else if (args[0] === "ass") {
      const image = await nsfw.ass();
      embed.setTitle("Ass");
      embed.setImage(image);
      return message.channel.send({ embeds: [embed] });
    } else if (args[0] === "boob" || args[0] === "boobs") {
      const image = await nsfw.boobs();
      embed.setTitle("Boobs");
      embed.setImage(image);
      return message.channel.send({ embeds: [embed] });
    } else if (args[0] === "wild") {
      const image = await nsfw.gonewild();
      embed.setTitle("Wild");
      embed.setImage(image);
      return message.channel.send({ embeds: [embed] });
    } else if (args[0] === "pussy") {
      const image = await nsfw.pussy();
      embed.setTitle("Pussy");
      embed.setImage(image);
      return message.channel.send({ embeds: [embed] });
    } else if (args[0] === "thigh") {
      const image = await nsfw.thigh();
      embed.setTitle("Sexy Thighs");
      embed.setImage(image);
      return message.channel.send({ embeds: [embed] });
    } else if (args[0] === "gif") {
      const image = await nsfw.pgif();
      embed.setTitle("RANDOM GIF");
      embed.setImage(image);
      return message.channel.send({ embeds: [embed] });
    } else if (args[0] || !args[0]) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle("CATEGORY TEEN")
            .addField(
              "USAGE : ",
              "Aliases : `porn , p`" +
              "\nUsage : `" +
              prefix +
              "porn <type> or " +
              prefix +
              "p <type>`"
            )
            .addField(
              "TEEN PORN COMMANDS",
              "1. " +
              prefix +
              "porn <anal>\n2. " +
              prefix +
              "porn <ass>\n3. " +
              prefix +
              "porn <4k>\n5. " +
              prefix +
              "porn <pussy>\n6. " +
              prefix +
              "porn <4k>\n7. " +
              prefix +
              "porn <thigh>\n8. " +
              prefix +
              "porn <gif>"
            )
            .setColor(client.embed.cf)
            .setFooter("<> are not required")
        ]
      });
    }
  }
};
