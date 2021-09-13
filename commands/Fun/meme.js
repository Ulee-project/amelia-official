const { MessageEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");
const statusAnimation =
{
	'meme' : `<:meme:767211992107974656>`
};
  
const StatusText =
{
    'meme' : 'meme'
}
module.exports = {
  name: "meme",
  alias: ["meme(k)"],
  description: "Get a meme from reddit!",
  category: "Fun",
  usage:"meme",
  run: async (bot, message, args) => {
    const subReddits = ["dankmeme", "meme", "me_irl"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);
        const embed = new MessageEmbed()
      .setTitle(`${statusAnimation.meme} | Meme from reddit/${random}`)
      .setURL(`https://reddit.com/r/${random}`)
      .setColor("#FFD700")
      .setFooter(`Powered by Reddit`)
      .setImage(img);
    message.channel.send(embed);
  },
};