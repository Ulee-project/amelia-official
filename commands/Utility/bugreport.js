const { MessageEmbed } = require("discord.js");
const { reportsChannelId } = require("../../config.json");

module.exports = {
    name: "bugreport",
    description: "Report a bug to your staff",
    category: "Utility",
    alias:["bug"],
    usage:"bugreport <provide>",
    run: async(client, message, args) => {
      message.delete({ timeout: 5000 });
        const bug = args.join(" ");

        if (!bug) return message.channel.send({
          embed : {
            color : `RED`,
            description : `${message.author} ❌Please provide a bug. Try ${client.prefix}${module.exports.usage}`
          }
        }).then(msg => msg.delete({ timeout: 5000 })).catch(() => null);

        const embed = new MessageEmbed()
            .setColor("#FFD700")
            .setTitle(`${message.author.username} has reported a bug`)
            .setDescription(bug)
            .setFooter(message.author.username)
            .setTimestamp();

        client.channels.cache.get(reportsChannelId).send(embed);

      message.channel.send({
        embed : {
          color : `#FFD700`,
          author : {
            name : `Bug Report`,
            icon_url : message.author.displayAvatarURL({ dynamic : true }),
          },
          description : `${message.author} ✅Thanks for giving us the bug report.`,
          timestamp: new Date(),
        }
      }).then(msg => msg.delete({ timeout: 20000 })).catch(() => null);
    }
};