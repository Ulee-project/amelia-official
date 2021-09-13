const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "8ball",
  alias:["8b"],
  description: "There is a big chance I insult you!",
  category: "Fun",
  usage: "8ball <question>",
  run: async (bot, message, args) => {
    let question = message.content.slice(bot.prefix.length + 6);
    if (!question)
      return message.channel.send(`**❌You did not specify your question!**`);
    else {
      let responses = [
        "Yes",
        "No",
        "Definetly",
        "Absoloutely",
        "Not in a million years",
      ];
      let response =
        responses[Math.floor(Math.random() * responses.length - 1)];
      let Embed = new MessageEmbed()
        .setTitle(`8Ball!`)
        .setDescription(`**Your question:** \`${question}\`\n**Reply:** \`${response}\``)
        .setColor(`#FFD700`);
      message.channel.send(Embed);
    }
  },
};