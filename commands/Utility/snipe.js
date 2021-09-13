const Discord = require("discord.js");
module.exports = {
  name: "snipe",
  alias: ["snipe"],
  category: "Utility",
  description: "Shows the last deleted message.",
  usage: "snipe <#mentions channel>",
  run: async (client, message, args) => {
    let channel = message.mentions.channels.first() || message.channel;
    let check = await client.db.fetch(`snipe.${channel.id}`);
    if (check === null || !check)
      return message.channel.send({
        embed : {
          description : `There's Nothing To Snipe!`
      }
      }).then(msg => msg.delete({ timeout: 5000 })).catch(() => null);

    let embed = new Discord.MessageEmbed()
      .setColor("#FFD700")
      .setAuthor(`${check.user}`)
      .setDescription(`${check.content}`);
    message.channel.send(embed);
  }
};
