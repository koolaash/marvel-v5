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
      if (!message.member) {
        await message.guild.members.fetch(message.author.id)
      }
      if (!message.guild || message.author.bot) return;
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