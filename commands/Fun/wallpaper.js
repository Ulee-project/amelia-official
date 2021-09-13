const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name:"wallpaper",
  alias:["wallpaper"],
  category:"Fun",
  description:"Get Wallpaper Images",
  usage:"wallpaper",
  run: async(client, message, args) => {
    const data = await fetch("https://nekos.life/api/v2/img/wallpaper").then((res) =>
      res.json()
    );

    const embed = new MessageEmbed()
      .setColor("#FFD700")
      .setImage(`${data.url}`)
      .setFooter(`Powered by nekos.life`)

    message.channel.send({ embed });
  },
};