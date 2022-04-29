const { Message } = require("discord.js");
const db = require("quick.db")

module.exports = function (client, options) {
  const description = {
    name: "autorole",
    filename: "autorole.js",
    version: "1.0.0",
  };
  console.log(
    ` :: ⬜️ Loaded : ${description.name} from ("${description.filename}")`.blue
  );

  client.on("guildMemberAdd", async (member) => {
    try {
      const roleAdd = db.get("autorole" + member.guild.id);
      if (roleAdd === null || roleAdd === undefined) return;
      await member.guild.roles.fetch(roleAdd).catch(() => null)
      const ree = member.guild.roles.cache.get(roleAdd);
      if (!ree || ree === undefined) {
        return;
      }

      let perms = ree.permissions,
        eperms = [
          "ADMINISTRATOR", "MANAGE_CHANNELS", "MANAGE_GUILD",
          "MANAGE_ROLES", "BAN_MEMBERS", "KICK_MEMBERS",
          "MANAGE_MESSAGES", "MANAGE_EMOJIS_AND_STICKERS",
          "MENTION_EVERYONE", "MANAGE_NICKNAMES", "MANAGE_WEBHOOKS",
          "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS"
        ],
        t = false;
      eperms.forEach(eperm => {
        if (t === true) {
          return;
        }
        if (perms.has(eperm)) {
          t = true;
        }
      });
      if (t === true) {
        return;
      }
      await member.roles.add(ree).catch(() => null);
    } catch (e) {
      return client.errweb.send(`\`\`\`js\nFILE : ${description.name} - ${member.guild.name} - ${member.guild.id}\n${e.stack}\n\`\`\``);
    }
  });
}
