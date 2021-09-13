const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "tickle",
  alias:["tickle"],
  description: "Tickle other people",
  category: "Fun",
  usage:"tickle <@mention>",  
  run: async(client, message, args) => {
    const data = await fetch("https://nekos.life/api/v2/img/tickle").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const tickle = message.author.id === user.id ? "themselfs" : user.username;

    const embed = new MessageEmbed()
      .setColor("#FFD700")
      .setDescription(`${message.author} Tickled **${tickle}**`)
      .setImage(`${data.url}`)
      .setFooter(`Powered by nekos.life`)

    message.channel.send({ embed });
  },
};