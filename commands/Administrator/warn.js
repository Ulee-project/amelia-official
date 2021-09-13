const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "warn",
  alias:["warn"],
  category: "Administrator",
  usage: "warn <@mention> <reason>",
  description: "Warn anyone who do not obey the rules",
  run: async (client, message, args) => {
    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send({
        embed : {
          color : `RED`,
          description : "❌You should have admin perms to use this command!"
        }
      })
    }
    
    const user = message.mentions.members.first()
    
    if(!user) {
      return message.channel.send({
        embed : {
          description : `❌Please Mention the person to who you want to warn - warn @mention <reason>`
        }
      })
    }
    
    if(message.mentions.users.first().bot) {
      return message.channel.send({
        embed : {
          description :`❌You can not warn bots`
        }
      })
    }
    
    if(message.author.id === user.id) {
      return message.channel.send({
        embed : {
          description : `❌You can not warn yourself`
        }
      })
    }
    
    if(user.id === message.guild.owner.id) {
      return message.channel.send({
        embed : {
          description : `❌You jerk, how you can warn server owner -_-`
        }
      })
    }
    
    const reason = args.slice(1).join(" ")
    
    if(!reason) {
      return message.channel.send({
        embed : {
          description : `❌Please provide reason to warn - warn @mention <reason>`
        }
      })
    }
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    if(warnings === 3) {
      return message.channel.send(`${message.mentions.users.first().username} already reached his/her limit with 3 warnings`)
    }
    
    if(warnings === null) {
      db.set(`warnings_${message.guild.id}_${user.id}`, 1)
      user.send(`You have been warned in **${message.guild.name}** for ${reason}`)
      await message.channel.send(`You warned **${message.mentions.users.first().username}** for \`${reason}\``)
    } else if(warnings !== null) {
        db.add(`warnings_${message.guild.id}_${user.id}`, 1)
       user.send(`You have been warned in **${message.guild.name}** for ${reason}`)
      await message.channel.send(`You warned **${message.mentions.users.first().username}** for \`${reason}\``)
    }
    
  
  } 
}