const discord = require("discord.js")
module.exports = {
  name: "ping",
  alias:["ping"],
  category: "Information",
  description: "Show list of bot's commands",
  usage:"ping",
  run: async(client, msg, args) => {
     const m = await msg.channel.send("Ping...");
   const embed = new discord.MessageEmbed()
      .setColor('#FFD700')
      .addField("⏳ Latency", `__**${m.createdTimestamp - msg.createdTimestamp}ms**__`)
      .addField("💓 API", `__**${Math.floor(client.ws.ping)}ms**__`);
    return m.edit(`🏓 P${"".repeat(Math.floor(client.ping) % 5 === 0 ? 0 : Math.floor(Math.random() * 5))}ong!`, { embed: embed });
  }
}