const Discord = require("discord.js")

module.exports =  {
  name: "avatar",
  alias:["ava"],
  category: "Fun",
  description: "Retrieve user profiles",
  usage: "avatar <@mention>",
  run: async (client, message, args) => {
   let user;
  
  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else if (args[0]) {
    user = message.guild.members.cache.get(args[0]).user;
  } else {
    user = message.author;
  }
  
  let avatar = user.displayAvatarURL({size: 4096, dynamic: true});

  
  const embed = new Discord.MessageEmbed()
  .setAuthor(`Avatar for ${user.tag}`)
  .setDescription(`Nickname : <@${user.id}>
ID : ${user.id}
Avatar URL : [Click Here](${avatar})`)
  .setColor(`#FFD700`)
  .setImage(avatar)
  
  return message.channel.send(embed);
}
}
