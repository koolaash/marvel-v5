const discord = require("discord.js"),
    db = require("quick.db");

module.exports.run = async (client, member) => {
   
    //   blacklist check function

    if (client.blguilds.includes(member.guild.id)) {
        return;
    }

    try {
        const nchx = db.get(`nwelchannel_${member.guild.id}`);
        if (nchx === null || nchx === undefined) {
            return db.delete(`nwelchannel_${member.guild.id}`);
        }
        let cchh = member.guild.channels.cache.get(nchx);
        let default_msg = `**Welcome {member} To ${member.guild}** <a:vshield:764199958257336321> 

━━━━━━━━━━━━━━━━━

<a:rainbowleft:764200797629186049> **Make Sure To Take Self Roles.**
<a:rainbowleft:764200797629186049> **Make Sure You Read Rules.**
<a:rainbowleft:764200797629186049> **Have Fun In Chatting.**`;

        let m1 = db.get(`nmsg_${member.guild.id}`);
        if (!m1 || m1 === null) {
            m1 = default_msg;
        }
        const msg = m1
            .replace("{member}", member.user)
            .replace("{member.guild}", member.guild)
            .replace("{server}", member.guild);

        await cchh.send(msg);
    } catch (e) {
        client.welweb.send(
            `\`\`\`js\n${e.stack}\n in ${member.guild.name} - ${member.guild.id} in non embed welcomer\n\`\`\``
        )
    }

}
