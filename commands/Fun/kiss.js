const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "kiss",
  alias:["muach"],
  description: "Shows a picture of people kissing",
  category: "Fun",
  usage:"kiss <@mention>",
  
  run: async(client, message, args) => {
    const data = await fetch("https://nekos.life/api/kiss").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const kissed = message.author.id === user.id ? "themselfs" : user.username;

    const embed = new MessageEmbed()
      .setColor("#FFD700")
      .setDescription(`${message.author} has Kissed **${kissed}**`)
      .setImage(`${data.url}`)
      .setFooter(`Powered by nekos.life`)
    
    message.channel.send(embed);
  },
};