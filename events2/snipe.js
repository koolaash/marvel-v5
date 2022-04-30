const { Collection } = require("discord.js");

module.exports = function (client, options) {
  const description = {
    name: "snipe",
    filename: "snipe.js",
    version: "1.2.0",
  };
  client.snipes = new Collection();
  console.log(
    ` :: ⬜️ Loaded : ${description.name} from ("${description.filename}")`.blue
  );

  client.on("messageDelete", async (message) => {

    if (client.blguilds.includes(message.guild.id)) {
      return;
    }
    try {
      if (!message.author) return;
      let m = await message.guild.members.fetch(message.author.id).catch(() => null);
      if (!m) return;
      if (message.author.bot || !message.guild) return;
      client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author.tag,
        image: message.attachments.first()
          ? message.attachments.first().proxyURL
          : null,
      });
    } catch (e) {
      return client.errweb.send(`\`\`\`js\nFILE : ${description.name} - ${message.guild.name} - ${message.guild.id}\n${e.stack}\n\`\`\``);
    }
  })

}
