const { MessageEmbed } = require("discord.js");
const statusAnimation = {
  Chicken_roll: `<a:Chicken_roll:741771530379329566>`,
  amelia_stars: `<a:amelia_stars:767224079530852372>`
};
const Statustext = {
  Chicken_roll: "Chicken_roll",
  amelia_stars: "amelia_stars"
};
module.exports = {
  name: "ruleswa",
  alias: ["rw"],
  description: "WhatsApp Rules",
  category: "Admin",
  usage:"ruleswa",
  run: async (client, msg, args) => {
    const Embed = new MessageEmbed()
      .setTitle(`✧  *  ✦ ･ﾟ *Campfire at Night 🔥* ･ﾟ✦  *  ✧`)
      .setURL(`https://chat.whatsapp.com/JrPZMEfCkdsBAZDvR1mtzZ`)
      .setAuthor(`Rules WhatsApp`,msg.guild.iconURL({ dynamic:true}))
      .setDescription(`${statusAnimation.Chicken_roll}__**RULES**__${statusAnimation.Chicken_roll}
> ✅\`Use polite language during Voice Chat\`
> ✅\`Use Eng/Ind language\`
> ✅\`Free send Arts\`
> ✅\`Chat whatever\`
> ✅\`PM allowed\`

> ⛔\`No Gore\`
> ⛔\`No Sara, Racist\`
> ⛔\`No excessive toxic\`
> ⛔\`No NSFW/Porn 18+\`
> ⛔\`No Stickers fight/spam\`
🌲🌲🏕️🌲🌲

\`\`\`Grup chat ini dibuat untuk memberikan informasi tentang apapun, dan mempererat komunikasi antar sesama.\`\`\``)
      .addField(`Join WhatsApp Group?`, `You Can [Click Here](https://chat.whatsapp.com/JrPZMEfCkdsBAZDvR1mtzZ) to join.`)
      .setFooter(`🔰I Hope You Enjoy It🔰`)
      .setThumbnail(`https://media.discordapp.net/attachments/706347774572232755/864020382255022100/580b57fcd9996e24bc43c543.png?width=463&height=463`)
      .setColor("#FFD700")
    msg.channel.send(Embed);
  },
};