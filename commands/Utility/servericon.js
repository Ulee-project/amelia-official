const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "servericon",
  alias:["si"],
  usage:"servericon",
  description: "Shows the server icon",
  category: "Utility",
  run: async (bot, message) => {
    const icon = message.guild.iconURL({ dynamic: true });

    const embed = new MessageEmbed()
      .setTitle(`${message.guild.name}'s icon`)
      .setTimestamp()
      .setImage(icon)
      .setFooter(message.author.username)
      .setColor("#FFD700");

    message.channel.send(embed);
  },
};