const canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");

module.exports ={
  name:"wasted",
  alias:["die"],
  description:"wasted yourself",
  category:"Fun",
  usage:"wasted",
  async run(client, message, args) {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    let wasted = await canvacord.Canvas.wasted(user.displayAvatarURL({ format: "png", dynamic: false }));
    let attachment = new MessageAttachment(wasted, "wasted.gif");
    return message.channel.send(attachment);
}
};
