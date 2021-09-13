const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name:"feed",
  alias:["feed"],
  category:"Fun",
  description:"Get Fresh feed Images",
  usage:"feed",
  run: async(client, message, args) => {
    const data = await fetch("https://nekos.life/api/v2/img/feed").then((res) =>
      res.json()
    );
    
     const user = message.mentions.users.first() || message.author;
     const feed = message.author.id === user.id ? "themselfs" : user.username;
    
    const embed = new MessageEmbed()
      .setColor("#FFD700")
      .setDescription(`${message.author} Feed **${feed}**`)
      .setImage(`${data.url}`)
      .setFooter(`Powered by nekos.life`)

    message.channel.send({ embed });
  },
};