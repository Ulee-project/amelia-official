const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name:"koala",
  alias:["koala"],
  category:"Animal",
  description:"Get Fresh koala Images",
  usage:"koala",
  run: async(client, message, args) => {
        const data = await fetch("https://some-random-api.ml/animal/koala").then(res => res.json());

        const embed = new MessageEmbed()
            .setAuthor(`| 🐨Koala~`, message.guild.iconURL({ dynamic: true }))
            .setColor("#FFD700")
            .setImage(`${data.image}`)
            .setFooter(`Powered by nekos.life`)

        message.channel.send(embed);
    }
};