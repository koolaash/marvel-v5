const { readdirSync } = require("fs"),
  { Intents, WebhookClient, Collection, Client } = require("discord.js"),
  config = require('./json/config.json'),
  intents = new Intents([
    "GUILD_MEMBERS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILDS",
    "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGE_REACTIONS",
    "GUILD_BANS", "MESSAGE_CONTENT", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS"
  ]),
  client = new Client({
    intents: [
      Intents.FLAGS.DIRECT_MESSAGES,
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_BANS,
      Intents.FLAGS.MESSAGE_CONTENT,
      Intents.FLAGS.GUILD_INTEGRATIONS,
      Intents.FLAGS.GUILD_WEBHOOKS
    ],
    allowedMentions: {
      parse: ['users'],
      repliedUser: false
    },
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
      'MESSAGE', 'CHANNEL',
      'REACTION', 'GUILD_MEMBER',
      'USER', "GUILD_SCHEDULED_EVENT"
    ]
  }),
  del = new WebhookClient({
    id: config.del.id || process.env.del_id,
    token: config.del.token || process.env.del_token
  }),
  welweb = new WebhookClient({
    id: config.wel.id || process.env.wel_id,
    token: config.wel.token || process.env.wel_token
  });

client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();
client.emoji = require("./json/emoji.json");
client.embed = require("./json/colors.json");
client.color = require("./json/colors.json");
client.gif = require("./json/gif.json");
client.config = require("./json/config.json");
client.links = require("./json/links.json");
client.badge = require("./json/badges.json");
client.role = require("./json/roles.json");
client.error = require("./json/errors.json");
client.del = del;
client.welweb = welweb;

require("colors");

const mongoose = require("mongoose"),
  dbOptions = {
    useNewUrlParser: true,
    autoIndex: false,
    poolSize: 8,
    connectTimeoutMS: 10000,
    family: 4,
    useUnifiedTopology: true,
  };

mongoose.connect(client.config.DB, dbOptions);
mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;
mongoose.connection.on("connected", () => {
  console.log("MONGOOSE LONG DAATABASE CONNECTED".yellow);
});
mongoose.connection.on("err", (err) => {
  console.log(`Mongoose connection error: \n ${err.stack}`);
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

const { Database } = require("quickmongo"),
  errweb = new WebhookClient({
    id: process.env.web_id || client.config.web_id,
    token: process.env.web_token || client.config.web_token
  });

client.qdb = new Database(client.config.DB || process.env.DB);
client.qdb.on("ready", async () => { console.log(`MONGOOSE QUICK DAATABASE CONNECTED`.yellow); });
client.errweb = errweb;
client.prefixModel = require('./models/prefixes.js');

// webhooks for errors
client.dataError = new WebhookClient({
  id: process.env.dataError_id || config.dataError.id,
  token: process.env.dataError_token || config.dataError.token,
});
client.auditError = new WebhookClient({
  id: process.env.auditError_id || config.auditError.id,
  token: process.env.auditError_token || config.auditError.token,
});
client.antiNukeError = new WebhookClient({
  id: process.env.antinukeError_id || config.antinukeError.id,
  token: process.env.antinukeError_token || config.antinukeError.token,
});

require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(100);
["command", "events", "slash"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

// require('./alive.js');

readdirSync("./interactions/").forEach(file => {
  require(`./interactions/${file}`)(client);
});

readdirSync("./events2/").forEach(file => {
  require(`./events2/${file}`)(client);
});

// antinuke events ensure function starts here
readdirSync("./eventsAntinuke/").forEach(file => {
  let eventName = file.split(".")[0];
  require(`./eventsAntinuke/${file}`)(client);
  console.log(` :: ⬜️ Loaded : ${eventName} from ${file}`.red);
});

client.login(process.env.TOKEN || client.config.TOKEN)
module.exports = client;

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
process.on("multipleResolves", (type, promise, reason) => {
  errweb.send(`\`\`\`js\n${type}\n${promise}\n${reason}\`\`\``);
});