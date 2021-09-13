const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "baka",
  alias:["baka"],
  description: "Baka somebody",
  category: "Fun",
  usage:"baka <@mention>",  
  run: async(client, message, args) => {
    const data = await fetch("https://nekos.life/api/v2/img/baka").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const baka = message.author.id === user.id ? "themselfs" : user.username;

    const embed = new MessageEmbed()
      .setColor("#FFD700")
      .setDescription(`${message.author} Baka **${baka}**`)
      .setImage(`${data.url}`)
      .setFooter(`Powered by nekos.life`)

    message.channel.send({ embed });
  },
};