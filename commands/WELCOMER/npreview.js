const db = require("quick.db");

module.exports = {
    name: "nwelcomeexample",
    aliases: ["nwelexample", "npreview"],
    description: "show a preview of non embed welcomer",
    category: "WELCOME",
    usage: "nwelcomeexample",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {
        let member = message.guild.members.cache.get(message.author.id);
        let default_msg = `**Welcome {member} To ${message.guild}** <a:vshield:764199958257336321> 

━━━━━━━━━━━━━━━━━

<a:rainbowleft:764200797629186049> **Make Sure To Take Self Roles.**
<a:rainbowleft:764200797629186049> **Make Sure You Read Rules.**
<a:rainbowleft:764200797629186049> **Have Fun In Chatting.**`;

        let m1 = db.get(`nmsg_${message.guild.id}`);
        if (!m1) m1 = default_msg;
        const msg = m1
            .replace("{member}", member.user)
            .replace("{member.guild}", message.guild);
        try {
            message.reply({ content: msg });
        } catch (e) {
            return console.log(e);
        }
    }
};
