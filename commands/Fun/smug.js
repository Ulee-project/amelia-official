const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "smug",
  alias:["smug"],
  description: "Smug",
  category: "Fun",
  usage:"smug",  
  run: async(client, message, args) => {
    const data = await fetch("https://nekos.life/api/v2/img/smug").then((res) =>
      res.json()
    );

    const user = message.mentions.users.first() || message.author;
    const smug = message.author.id === user.id ? "themselfs" : user.username;
    
    const embed = new MessageEmbed()
      .setFooter(`Powered by nekos.life`)
      .setColor("#FFD700")
      .setDescription(`${message.author} Smug **${smug}**`)
      .setImage(`${data.url}`)

    message.channel.send({ embed });
  },
};