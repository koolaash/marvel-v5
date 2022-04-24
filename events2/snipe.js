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
    try {
      if (message.webhookID) return;
      if (!message.member) {
        message.member = await message.guild.fetchMember(message).catch(() => null);
      }
      if (message.author.bot || !message.guild || !message.member) return;
      client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author.tag,
        image: message.attachments.first()
          ? message.attachments.first().proxyURL
          : null,
      });
    } catch (e) {
      return client.errweb.send(`\`\`\`js\nFILE : ${description.name}\n${e.stack}\n\`\`\``);
    }
  })

}