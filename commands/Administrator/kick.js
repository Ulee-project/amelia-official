const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
        name: "kick",
        category: "Administrator",
        description: "Kicks the user",
        usage: "kick <@mention | user ID> <reason>",
        alias: ["k"],
    run: async (client, message, args) => {
        try {
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send({
              embed : {
                color : `RED`,
                description : "❌You Don't Have `KICK_MEMBERS` Permissions To Kick Members!"
              }
            });
            if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send({
              embed : {
                color : `RED`,
                description : "❌I Do Not Have `KICK_MEMBERS` Permissions To Kick Members!"
              }
            });

            if (!args[0]) return message.channel.send({
              embed : {
                description : `❌Enter A User To Kick!`
              }
            })

            var kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!kickMember) return message.channel.send({
              embed : {
                description : `❌User Is Not In The Guild!`
              }
            });

            if (kickMember.id === message.member.id) return message.channel.send({
              embed : {
                description : `❌You Cannot Kick Yourself!`
              }
            })

            if (!kickMember.kickable) return message.channel.send({
              embed : {
                description : `❌Cannot Kick This User!`
              }
            })
            if (kickMember.user.bot) return message.channel.send({
              embed : {
                description : `❌Cannot Kick A Bot!`
              }
            })

            var reason = args.slice(1).join(" ");
            try {
                const sembed2 = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`👋Hello **${kickMember.user.username}**, You Have Been Kicked From **${message.guild.name}** for - \`${reason || "No Reason!"}\``)
                    .setFooter(message.guild.iconURL())
                    .setTimestamp()
                kickMember.send(sembed2).then(() =>
                    kickMember.kick()).catch(() => null)
            } catch {
                kickMember.kick()
            }
            if (reason) {
            var sembed = new MessageEmbed()
                .setColor("RED")
                .setAuthor(kickMember.user.tag, kickMember.user.displayAvatarURL())
                .setDescription(`**${kickMember.user.username}** has been kicked for ${reason}`)
            message.channel.send(sembed);
            } else {
                var sembed2 = new MessageEmbed()
                .setColor("RED")
                .setAuthor(kickMember.user.tag, kickMember.user.displayAvatarURL())
                .setDescription(`**${kickMember.user.username}** has been kicked`)
            message.channel.send(sembed2);
            }
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`Member Kicked ${kickMember.user.username}`, kickMember.user.displayAvatarURL())
                .setDescription(`**${kickMember.user.username}** has been Kicked
                Reason: \`${reason || "No Reason"}\``)
                .setColor("RED")
                .setFooter(`ID: ${kickMember.id}`)
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
}