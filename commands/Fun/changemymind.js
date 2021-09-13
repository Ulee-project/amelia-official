const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "changemymind",
  description: "Change my mind",
  category: "Fun",
  alias: ["cmm"],
  usage:"changemymind <provide text>",
  run: async(client, message, args) => {
    const text = args.join(" ");

    if (!text) return message.channel.send({
      embed : {
        color : `RED`,
        description : `${message.author} :x:Please provide text, Try : ${client.prefix}${module.exports.usage}`
      }
    });

    const sendMsg = await message.channel.send("Processing Image...");

    const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}`
    ).then((res) => res.json());

    sendMsg.delete();
    const embed = new MessageEmbed()
      .setFooter(message.author.username)
      .setColor("#FFD700")
      .setDescription(`**Change My Mind**`)
      .setImage(`${data.message}`)
      .setTimestamp();

    message.channel.send({ embed });
  },
};