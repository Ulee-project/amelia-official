const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "queue",
  alias: ["q"],
  category: "Music",
  description: "Show the music queue and now playing.",
  usage:"queue",
  run: async(client, message) => {
    const serverQueue = client.queue.get(message.guild.id);
    
    if (!serverQueue) return message.channel.send({
      embed : {
        color : `RED`,
        title: `Queue for ${message.guild.name}`,
        url: `https://discord.gg/VzUR95y`,
        description : `❌The queue is empty`,
        timestamp: new Date(),
        footer : {
          text : `Volume: 0%`,
          icon_url : `${message.author.displayAvatarURL()}`
        }
      }
    }).catch(console.error);
    
    let queueEmbed = new MessageEmbed()
      .setTitle(`Queue for ${message.guild.name}`)
      .setURL(`https://discord.gg/VzUR95y`)
      .setDescription(serverQueue.songs.map((song, index) => `\`${index + 1}.\` [${song.title}](${song.url}) | \`[${song.duration}]\``))
      .setFooter(`Volume: ${serverQueue.volume}%`,`${message.author.displayAvatarURL()}`)
      .setColor(`#FFD700`)

    queueEmbed.setTimestamp();
    return message.channel.send(queueEmbed);
  }
};