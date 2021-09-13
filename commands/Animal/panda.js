const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name:"panda",
  alias:["panda"],
  category:"Animal",
  description:"Shows a picture of a panda",
  usage:"panda",
  run: async(client, message, args) => {
     const data = await fetch("https://some-random-api.ml/img/panda").then(res => res.json());

        const embed = new MessageEmbed()
            .setAuthor(`| 🐼Panda~`, message.guild.iconURL({ dynamic: true }))
            .setColor("#FFD700")
            .setImage(`${data.link}`)
            .setFooter(`Powered by nekos.life`)

        message.channel.send(embed);
    }
};