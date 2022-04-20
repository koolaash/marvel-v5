const db = require("quick.db"),
  discord = require("discord.js"),
  moment = require("moment"),
  ms = require("ms")

module.exports = function (client) {
  const description = {
    name: "embed-welcomer",
    filename: "embedwel.js",
    version: "1.0.0",
  };
  console.log(
    ` :: ⬜️ Loaded : ${description.name} from ("${description.filename}")`.blue
  );

  client.on("guildMemberAdd", async (member) => {
    let chx = db.get(`welchannel_${member.guild.id}`),
      ment = db.get("mention" + member.guild.id),
      ust = db.get("userinfo" + member.guild.id)

    if (chx === null) {
      return;
    }
    let nchx = member.guild.channels.cache.get(chx),
      default_url = client.gif.wel,
      default_msg = `<a:op2_:764200161793540106> **MAKE SURE TO READ RULES**

<a:op2_:764200161793540106> **TAKE SELF ROLES**

<a:op2_:764200161793540106> **ENJOY YOUR STAY HERE**

`;
    let createdate = moment.utc(member.createdAt).format("ddd, Do MMMM YYYY");
    let m1 = db.get(`msg_${member.guild.id}`);
    if (!m1 || m1 === null) { m1 = default_msg; }
    const msg = m1
      .replace("{joined}", createdate)
      .replace("{member}", member.user)
      .replace("{member.guild}", member.guild)
      .replace("{server}", member.guild)
      .replace("{member.user.tag}", member.user.tag)
      .replace("{tag}", member.user.tag)
      .replace("{member.user.usercount}", member.user.usercount)
      .replace("{membercount}", member.user.usercount);

    let url = db.get(`url_${member.guild.id}`);
    if (url === null) url = default_url;
    let colour = db.get("welClr" + member.guild.id)
    if (!colour) {
      colour = client.embed.cm
    }
    let wembed = new discord.MessageEmbed()
      .setAuthor(member.guild)
      .setTitle("━━━━━━━━━━━━━━━━━")
      .setColor(colour)
      .setImage(url)
      .setTimestamp()
      .setDescription(msg)
      .setFooter({
        text: member.user.tag,
        iconURL: member.user.displayAvatarURL({ dynamic: true })
      })

    if (ust === true) {
      wembed.addField(
        "━━━━━━━━━━━━━━━━━",
        `

${client.emoji.ar} **MEMBER USERNAME :-** __**${member.user.tag}**__

${client.emoji.ar} **MEMBER JOINED AT :-** __**${createdate}**__

${client.emoji.ar} **MEMBER COUNT :-** **__${member.guild.memberCount}__**

`
      )
    }
    wembed.addField(
      "━━━━━━━━━━━━━━━━━",
      `

${client.emoji.bot} **THANKS FOR JOINING ${member.guild}** ${client.emoji.bot}`
    );
    try {
      if (ment === true) {
        await nchx.send({
          content: `**<@${member.user.id}> Welcome To ${member.guild.name}**`,
          embeds: [wembed]
        });
      } else {
        await nchx.send({ embeds: [wembed] });
      }
    } catch (e) {
      return client.errweb.send(`\`\`\`js\nFILE : ${description.name}\n${e.stack}\n\`\`\``);
    }
  })
}