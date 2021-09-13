const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "cuddle",
  alias:["cuddle"],
  description: "cuddle somebody",
  category: "Fun",
  usage:"cuddle <@mention>",  
  run: async(client, message, args) => {
    const data = await fetch("https://nekos.life/api/v2/img/cuddle").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const cuddle = message.author.id === user.id ? "themselfs" : user.username;

    const embed = new MessageEmbed()
      .setColor("#FFD700")
      .setDescription(`${message.author} Cuddles with **${cuddle}**`)
      .setImage(`${data.url}`)
      .setFooter(`Powered by nekos.life`)

    message.channel.send({ embed });
  },
};