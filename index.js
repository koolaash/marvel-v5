const Discord = require("discord.js"),
    { Intents, WebhookClient, MessageEmbed, MessageActionRow, MessageButton, Collection, Client } = require("discord.js"),
    intents = new Intents([
        "GUILD_MEMBERS",
        "GUILD_MESSAGES",
        "DIRECT_MESSAGES",
        "GUILDS",
        "GUILD_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_REACTIONS"
    ]);
require("discord-banner")();
const client = new Client({
    intents: [
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
    ],
    allowedMentions: { parse: ['users'], repliedUser: true },
    presence: {
        status: "idle",
        activities: [{
            name: "'help | @MARVEL",
            type: "LISTENING"
        }]
    },
    ws: { intents },
    fetchAllMembers: false,
    restTimeOffset: 0,
    shards: "auto",
    restWsBridgetimeout: 100,
    disableEveryone: true,
    partials: [
        'MESSAGE',
        'CHANNEL',
        'REACTION',
        'GUILD_MEMBER',
        'USER'
    ]
}),
    colors = require("colors"),
    del = new WebhookClient({
        id: "963519810015215670",
        token: "vLEb5pYo6jGT3qoPGtdbe5QAk_QNG85XilbeUSE7r1YijKISTQ4mDiAoHdaegcBRhnOS"
    });

client.commands = new Collection();
client.aliases = new Collection();
client.emoji = require("./json/emoji.json");
client.embed = require("./json/colors.json");
client.color = require("./json/colors.json");
client.gif = require("./json/gif.json");
client.config = require("./json/config.json");
client.links = require("./json/links.json");
client.badge = require("./json/badges.json");
client.error = require("./json/errors.json");
client.del = del;

const { Database } = require("quickmongo"),
    errweb = new WebhookClient({
        id: process.env.web_id || client.config.web_id,
        token: process.env.web_token || client.config.web_token
    });

client.qdb = new Database(client.config.DB || process.env.DB);
client.qdb.on("ready", async () => {
    console.log(`QUICKMONGO CONNECTED`.yellow);
});
client.errweb = errweb;

require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(100);
["command", "events",].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

require('./alive.js');
require('./buttons/ticketing.js')(client);
require('./buttons/nsfw-menu.js')(client);
require("./events2/snipe.js")(client);
require("./events2/autorole.js")(client);
require("./events2/embedwel.js")(client);
require("./events2/moderation.js")(client);

client.login(process.env.TOKEN || client.config.TOKEN)

process.on("unhandledRejection", (error) => {
    errweb.send(`\`\`\`js\n${error.stack}\`\`\``);
});
process.on("uncaughtException", (err, origin) => {
    errweb.send(`\`\`\`js\n${err.stack}\`\`\``);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
    errweb.send(`\`\`\`js\n${err.stack}\`\`\``);
});
process.on("beforeExit", (code) => {
    errweb.send(`\`\`\`js\n${code}\`\`\``);
});
process.on("exit", (code) => {
    errweb.send(`\`\`\`js\n${code}\`\`\``);
});
process.on("multipleResolves", (type, promise, reason) => { });