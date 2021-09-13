const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../JSON/colours.json");
const db = require('quick.db');

module.exports = {
        name: "unmute",
        aliases: ["unsilent"],
        description: "Unmutes a member in the discord!",
        usage: "unmute <@mention | user ID> <reason>",
        category: "Administrator",
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send({
          embed : {
            color : `RED`,
            description : "❌You Don't Have `MANAGE_SERVER` Permissions To Unmute Someone!"
          }
        });

        if (!message.guild.me.hasPermission("MANAGE_SERVER")) return message.channel.send({
          embed : {
            color : `RED`,
            description : "❌You Don't Have `MANAGE_SERVER` Permissions To Unmute Someone!"
          }
        })
        if (!args[0]) return message.channel.send({
          embed : {
            description : `❌Please Enter A User!`
          }
        })
        let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!mutee) return message.channel.send({
          embed : {
            description :`❌Please Enter A Valid User!`
          }
        });

        let reason = args.slice(1).join(" ");

        let muterole;
        let dbmute = await db.fetch(`muterole_${message.guild.id}`);
        let muteerole = message.guild.roles.cache.find(r => r.name === "Muted")

        if (!message.guild.roles.cache.has(dbmute)) {
            muterole = muteerole
        } else {
            muterole = message.guild.roles.cache.get(dbmute)
        }
      
        let rolefetched = db.fetch(`muteeid_${message.guild.id}_${mutee.id}`)
        if (!rolefetched) return;

        if (!muterole) return message.channel.send({
          embed : {
            description : `❌There Is No Mute Role To Remove!`
          }
        })
        if (!mutee.roles.cache.has(muterole.id)) return message.channel.send({
          embed :{
            description : `❌User is not Muted!`
          }
        })
        try {
        mutee.roles.remove(muterole.id).then(() => {
            mutee.send({
                  embed : {
                    color : 'RED',
                 description : `👋Hello, You Have Been Unmute🔊 In ${message.guild.name}
                 Reason: \`${reason || "No Reason"}\``
                  }
                })
              .catch(() => null)
            let roleadds = rolefetched
            if (!roleadds) return;
            mutee.roles.add(roleadds)
        })
        } catch {
            let roleadds2 = rolefetched
            if (!roleadds2) return;
            mutee.roles.add(roleadds2)                            
          }
            const sembed = new MessageEmbed()
                .setColor("RED")
                .setAuthor(mutee.user.tag, mutee.user.displayAvatarURL())
                .setDescription(`${mutee.user.username} was successfully unmuted.`)
            message.channel.send(sembed);
        

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        let embed = new MessageEmbed()
            .setColor('RED')
                .setAuthor(`Member Unmute ${mutee.user.tag}`, mutee.user.displayAvatarURL())
                .setDescription(`**${mutee.user.username}** was been Unmuted
                Reason: \`${reason || "No Reason"}\``)
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setTimestamp()
      
        var sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send(embed)

    }
}