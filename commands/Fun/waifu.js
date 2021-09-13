const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const statusAnimation = {
Rainbow_Weeb: `<a:Rainbow_Weeb:741771797325676594>`
};
const Statustext = {
  Rainbow_Weeb: "Rainbow_Weeb"
};

module.exports = {
  name:"waifu",
  alias:["waifu"],
  category:"Fun",
  description:"Get Fresh Waifu Images",
  usage:"waifu",
  run: async(client, message, args) => {
    const data = await fetch("https://nekos.life/api/v2/img/waifu").then((res) =>
      res.json()
    );

    const embed = new MessageEmbed()
      .setFooter(`Powered by nekos.life`)
      .setColor("#FFD700")
      .setDescription(`${statusAnimation.Rainbow_Weeb}**Waifu**`)
      .setImage(`${data.url}`)


    message.channel.send({ embed });
  },
};