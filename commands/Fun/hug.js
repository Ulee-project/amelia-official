const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "hug",
    alias: ["hug"],
    description: "Shows a picture of people hugging",
    category: "Fun",
    usage:"hug <@mention>",
    run: async (client, message, args) => {
    const data = await fetch("https://nekos.life/api/hug").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const hugged = message.author.id === user.id ? "themselfs" : user.username;

    const embed = new MessageEmbed()
      .setColor("#FFD700")
      .setDescription(`${message.author} has hugged **${hugged}**`)
      .setImage(`${data.url}`)
      .setFooter(`Powered by nekos.life`)

    message.channel.send(embed);
  },
};