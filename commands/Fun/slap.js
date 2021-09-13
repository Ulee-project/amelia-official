const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "slap",
  alias:["slap"],
  description: "Slap somebody",
  category: "Fun",
  usage:"slap <@mention>",  
  run: async(client, message, args) => {
    const data = await fetch("https://nekos.life/api/v2/img/slap").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const slapped = message.author.id === user.id ? "themselfs" : user.username;

    const embed = new MessageEmbed()
      .setColor("#FFD700")
      .setDescription(`${message.author} has Slapped **${slapped}**`)
      .setImage(`${data.url}`)
      .setFooter(`Powered by nekos.life`)

    message.channel.send({ embed });
  },
};