const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports = {
        name: "unban",
        description: "Unban a user from the guild!",
        usage: "unban <@mention | user ID] <reason>",
        category: "Administrator",
        alias: ["ub"],
    run: async (client, message, args) => {

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send({
          embed : {
            color : `RED`,
            description : "❌You Don't Have `BAN_MEMBERS` Permissions To Unban Someone!"
          }
        })

        if (!args[0]) return message.channel.send({
          embed : {
            description : `❌Please Enter A Name!`
          }
        })
      
        let bannedMemberInfo = await message.guild.fetchBans()

        let bannedMember;
        bannedMember = bannedMemberInfo.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || bannedMemberInfo.get(args[0]) || bannedMemberInfo.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase());
        if (!bannedMember) return message.channel.send({
          embed : {
            description : `❌Please Provide A Valid Username, Tag Or ID Or The User Is Not Banned!`
          }
        })

        let reason = args.slice(1).join(" ")

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send({
          embed : {
            color : `RED`,
            description : "❌I Don't Have `BAN_MEMBERS` Permissions To Unban Someone!"
          }
        })
        try {
            if (reason) {
                message.guild.members.unban(bannedMember.user.id, reason)
                var sembed = new MessageEmbed()
                    .setColor("RED")
                .setAuthor(bannedMember.user.tag, bannedMember.user.displayAvatarURL())
                .setDescription(`**${bannedMember.user.username}** has been unbanned for \`${reason}\``)
                .setTimestamp();
                message.channel.send(sembed)
            } else {
                message.guild.members.unban(bannedMember.user.id, reason)
                var sembed2 = new MessageEmbed()
                    .setColor("RED")
                .setAuthor(bannedMember.user.tag, bannedMember.user.displayAvatarURL())
                .setDescription(`**${bannedMember.user.username}** has been unbanned`)
                .setTimestamp();
                message.channel.send(sembed2)
            }
        } catch {
            
        }

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        let embed = new MessageEmbed()
            .setAuthor(`Member Unbanned ${bannedMember.user.tag}`, bannedMember.user.displayAvatarURL())
                .setDescription(`**${bannedMember.user.username}** has been Unbanned from **${message.guild.name}**
                Reason: \`${reason || "No Reason"}\``)
                .setColor("RED")
                .setTimestamp();

        var sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send(embed)
    }
}