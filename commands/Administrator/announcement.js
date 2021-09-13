const { MessageEmbed } = require("discord.js");
const { getAnnounceChannel } = require("../../functions");

module.exports = {
  name: "announcement",
  alias:["announce"],
  description: "Announce something in a channel",
  usage: "announcement <channel> <text>",
  category: "Administrator",
  run:async(client, message, args) => {
    if (!args[0]) {
      return message.channel.send({
        embed : {
          description : `❌Please provide text or a valid channel!`
        }
      }
      );
    }

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send({
        embed : {
          color : `RED`,
          description : "❌You Don't Have `MANAGE_MESSAGES` Permissions For That!"        }
      }
      );

    const announceChannel = await getAnnounceChannel(message.guild.id);
    let channel = message.mentions.channels.first();
    let text;

    if (channel) {
      text = args.splice(1).join(" ");
    } else if (announceChannel !== null) {
      channel = announceChannel;
      text = args.join(" ");
    } else {
      return message.channel.send({
        embed : {
          description : `❌Please provide text or a valid channel`
        }
      });
    }

    const embed = new MessageEmbed()
      .setTitle("📢 Announcement 📢")
      .setDescription(text)
      .setFooter(message.author.username)
      .setColor("RED");

    client.channels.cache.get(channel.id).send(embed);
  },
};