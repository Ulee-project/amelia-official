const discord = require("discord.js");
const client = new discord.Client({ disableMentions: "everyone" });
const db = new Map();
const fs = require("fs");
const snek = require("node-superfetch");

const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log("Pinging");
  response.sendStatus(200);
});
app.listen(process.env.PORT);

const axios = require("axios")
const urls = ["https://amelia-official.glitch.me"]
setInterval(function() {
            urls.forEach(url => {
            axios.get(url).then(console.log("Pong at " + Date.now())).catch(() => {});
        })
    }, 60 * 1000);

const { prefix } = require("./config.json");
client.aliases = new discord.Collection();
client.commands = new discord.Collection();
client.db = require("quick.db");
client.queue = new Map();
client.hastebin = async text => {
  const { body } = await snek
    .post("https://bin-clientdev.glitch.me/documents")
    .send(text);
  return `https://bin-clientdev.glitch.me/${body.key}`;
};

fs.readdir("./events/", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`(✅) Event loaded : ${eventName} !`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

["aliases", "commands"].forEach(x => (client[x] = new discord.Collection()));

["command"].forEach(x => require(`./handler/${x}`)(client));

client.login(process.env.TOKEN);
