const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "poke",
  alias:["poke"],
  description: "Poke somebody",
  category: "Fun",
  usage:"poke <@mention>",  
  run: async(client, message, args) => {
    const data = await fetch("https://nekos.life/api/v2/img/poke").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const poked = message.author.id === user.id ? "themselfs" : user.username;

    const embed = new MessageEmbed()
      .setColor("#FFD700")
      .setDescription(`${message.author} has Poked **${poked}**`)
      .setImage(`${data.url}`)
      .setFooter(`Powered by nekos.life`)

    message.channel.send({ embed });
  },
};