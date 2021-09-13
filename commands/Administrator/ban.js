const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
        name: "ban",
        alias: ["b"],
        category: "Administrator",
        description: "Bans a member from the server",
        usage: "ban <@mention | user ID> <reason>",
    run: async (client, message, args) => {
        try {
            if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send({
              embed : {
                color : `RED`,
                description : "❌You Don't Have `BAN_MEMBERS` Permissions To Ban Users!"
              }
            });
            if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send({
              embed : {
                color : `RED`,
                description : "❌I Don't Have `BAN_MEMBERS` Permissions To Ban Users!"
              }
            });
            if (!args[0]) return message.channel.send({
              embed : {
                description : `❌Please Provide A User To Ban!`
              }
            })

            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!banMember) return message.channel.send({
              embed : {
                description : `❌User Is Not In The Guild`
              }
            });
            if (banMember === message.member) return message.channel.send({
              embed : {
                description : `❌You Cannot Ban Yourself`
              }
            })

            var reason = args.slice(1).join(" ");

            if (!banMember.bannable) return message.channel.send({
              embed : {
                description : `❌Can't Kick That User`
              }
            })
            try {
            banMember.send({
              embed: {
                color : "RED",
                author: {
                  name : `👋Hello ${banMember.user.username}`,
                  icon_url : banMember.user.displayAvatarURL()
                },
              description : `You have been Banned from **${message.guild.name}**
              Reason: \`${reason || "No Reason"}\``,
                footer: {
                  url : message.guild.iconURL()
                },
                timestamp: new Date()
              }
            })
              .then(() =>
                message.guild.members.ban(banMember, { days: 7, reason: reason })).catch(() => null)
            } catch {
                message.guild.members.ban(banMember, { days: 7, reason: reason })
            }
            if (reason) {
            var sembed = new MessageEmbed()
                .setColor("RED")
                .setAuthor(banMember.user.tag, banMember.user.displayAvatarURL())
                .setDescription(`**${banMember.user.username}** has been banned for \`${reason}\``)
                .setFooter(`ID: ${banMember.id}`)
                .setTimestamp();
            message.channel.send(sembed)
            } else {
                var sembed2 = new MessageEmbed()
                .setColor("RED")
                .setAuthor(banMember.user.tag, banMember.user.displayAvatarURL())
                .setDescription(`**${banMember.user.username}** has been banned`)
                .setFooter(`ID: ${banMember.id}`)
                .setTimestamp();
            message.channel.send(sembed2)
            }
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (channel == null) return;

            if (!channel) return;

            const embed = new MessageEmbed()
            .setAuthor(`Member Banned ${banMember.user.tag}`, banMember.user.displayAvatarURL())
                .setDescription(`**${banMember.user.username}** has been Banned from **${message.guild.name}**
                Reason: \`${reason || "No Reason"}\``)
                .setColor("RED")
                .setFooter(`ID: ${banMember.id}`)
                .setTimestamp();
            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
};