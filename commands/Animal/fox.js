const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "fox",
  description: "Shows a picture of a fox",
  category: "Animal",
  alias:["fox"],
  usage:"fox",
  run: async (bot, message) => {
    const data = await fetch("https://randomfox.ca/floof/").then(res => res.json());

        const embed = new MessageEmbed()
            .setAuthor(`| 🦊Fox~`, message.guild.iconURL({ dynamic: true }))
            .setColor("#FFD700")
            .setImage(`${data.image}`)
            .setFooter(`Powered by nekos.life`)

        message.channel.send(embed);
    }
};