const { MessageEmbed } = require("discord.js");
const { redlight } = require("../../JSON/colours.json");
const db = require('quick.db');

module.exports = {
        name: "mute",
        alias:["silent"],
        description: "Mutes a member in the discord!",
        usage: "mute <@mention | user ID> <reason>",
        category: "Administrator",
    run: async (bot, message, args) => {
        try {
            if (!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send({
              embed :{
                color : `RED`,
                description : "❌You Don't Have `MANAGE_SERVER` Permmissions To Mute Someone!"
              }
            });

            if (!message.guild.me.hasPermission("MANAGE_SERVER")) return message.channel.send({
              embed : {
                color : `RED`,
                description : "❌I Don't Have `MANAGE_SERVER` Permissions To Mute Someone!"
              }
            })
            if (!args[0]) return message.channel.send({
              embed : {
                description : `❌Please Enter A User To Be Muted!`
              }
            });

            var mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!mutee) return message.channel.send({
              embed : {
                description : `❌Please Enter A Valid User To Be Muted!`
              }
            });

            if (mutee === message.member) return message.channel.send({
              embed :{
                description : `❌You Cannot Mute Yourself!`
              }
            })
            if (mutee.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send({
              embed : {
                description :`❌Cannot Mute This User!`
              }
            })

            let reason = args.slice(1).join(" ");
            if (mutee.user.bot) return message.channel.send({
              embed : {
                description : `❌Cannot Mute Bots!`
              }
            });
            const userRoles = mutee.roles.cache
                .filter(r => r.id !== message.guild.id)
                .map(r => r.id)

            let muterole;
            let dbmute = await db.fetch(`muterole_${message.guild.id}`);
            let muteerole = message.guild.roles.cache.find(r => r.name === "Muted")

            if (!message.guild.roles.cache.has(dbmute)) {
                muterole = muteerole
            } else {
                muterole = message.guild.roles.cache.get(dbmute)
            }

            if (!muterole) {
                try {
                    muterole = await message.guild.roles.create({
                        data: {
                            name: "Muted",
                            color: "#514f48",
                            permissions: []
                        }
                    })
                    message.guild.channels.cache.forEach(async (channel) => {
                        await channel.createOverwrite(muterole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            SPEAK: false,
                            CONNECT: false,
                        })
                    })
                } catch (e) {
                    console.log(e);
                }
            };

            if (mutee.roles.cache.has(muterole.id)) return message.channel.send({
              embed : {
                description : `User Is Already Muted!`
              }
            })

            db.set(`muteeid_${message.guild.id}_${mutee.id}`, userRoles)
          try {
            mutee.roles.set([muterole.id]).then(() => {
                mutee.send({
                  embed : {
                    color : 'RED',
                 description : `👋Hello, You Have Been Muted🔇 In ${message.guild.name}
                 Reason: \`${reason || "No Reason"}\``
                  }
                })
                  .catch(() => null)
            })
            } catch {
                 mutee.roles.set([muterole.id])                               
            }
                if (reason) {
                const sembed = new MessageEmbed()
                    .setColor("RED")
                    .setAuthor(mutee.user.tag, mutee.user.displayAvatarURL())
                    .setDescription(`**${mutee.user.username}** was successfully muted for ${reason}`)
                message.channel.send(sembed);
                } else {
                    const sembed2 = new MessageEmbed()
                    .setColor("RED")
                    .setAuthor(mutee.user.tag, mutee.user.displayAvatarURL())
                    .setDescription(`**${mutee.user.username}** was successfully muted`)
                message.channel.send(sembed2);
                }
            
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;

            let embed = new MessageEmbed()
                .setColor('RED')
                .setAuthor(`Member Mute ${mutee.user.tag}`, mutee.user.displayAvatarURL())
                .setDescription(`**${mutee.user.username}** was been Mute
                Reason: \`${reason || "No Reason"}\``)
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setTimestamp()

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch {
            return;
        }
    }
}