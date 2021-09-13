const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name:"lizard",
  alias:["lizard"],
  category:"Animal",
  description:"Get Fresh Lizard Images",
  usage:"lizard",
  run: async(client, message, args) => {
    const data = await fetch("https://nekos.life/api/v2/img/lizard").then((res) =>
      res.json()
    );

    const embed = new MessageEmbed()
      .setColor("#FFD700")
      .setAuthor(`| 🦎Lizard~`, message.guild.iconURL({ dynamic: true }))
      .setImage(`${data.url}`)
      .setFooter(`Powered by nekos.life`)

    message.channel.send({ embed });
  },
};