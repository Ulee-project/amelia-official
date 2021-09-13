const { MessageEmbed } = require("discord.js");
const statusAnimation = {
  Chicken_roll: `<a:Chicken_roll:741771530379329566>`
};
const Statustext = {
  Chicken_roll: "Chicken_roll"
};
module.exports = {
  name: "donate",
  alias: ["donasi"],
  description: "Donate so that admin can eat",
  category: "Information",
  usage:"donate",
  run: async (client, msg, args) => {
    const Embed = new MessageEmbed()
      .setAuthor(`Donate ${client.user.username}`,client.user.displayAvatarURL({ dynamic:true}))
      .setDescription(`${statusAnimation.Chicken_roll} You can donate by going to the link https://saweria.co/donate/Uleekun`)
      .setFooter(`Donate so that admin can eat :)`)
      .setColor("#FFD700")
    msg.channel.send(Embed);
  },
};