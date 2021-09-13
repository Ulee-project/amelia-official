const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "invite",
  alias: ["add"],
  description: "Get a link to invite the bot to your server",
  category: "Utility",
  usage:"invite",
  run: async (client, msg, args) => {
    const Embed = new MessageEmbed()
      .setAuthor(`Invite ${client.user.username}`,client.user.displayAvatarURL({ format: "png" }))
      .setDescription(`Want to invite me to your server? [Click here](https://discord.com/api/oauth2/authorize?client_id=706346679263035392&permissions=2147483639&scope=bot)`)
      .setColor("#FFD700")
      .setFooter(`Thank you for Inviting me!`)
    msg.channel.send(Embed);
  },
};