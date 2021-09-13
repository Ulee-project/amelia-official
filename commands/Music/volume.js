module.exports = {
  name: "volume",
  alias: ["vol"],
  category: "Music",
  description: "Change volume of currently playing music",
  usage:"volume <0 - 100>",
  run: async(client, message, args) =>  {
    const serverQueue = client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.channel.send({
        embed : {
          description : `${message.author} ❌You must join the voice channel first before using the command!`
        }
      }).catch(console.error);
    if (!serverQueue) return message.channel.send({
      embed : {
        description : `${message.author} ❌No song is playing.`
      }
    }).catch(console.error);
    
    if (!args[0])
      return message.reply({
        embed: {
          color: "GOLD",
          description: `🔊 The current volume is: \`${serverQueue.volume}%\``
        }
        }).catch(console.error);
    if (isNaN(args[0])) return message.channel.send({
      embed : {
        description : `${message.author} Please use a number to set volume.`
      }
    }).catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return message.channel.send({
        embed : {
          description : `${message.author} Please use a number between \`0 - 100\`.`
        }
      }).catch(console.error);
    const { channel } = message.member.voice;
    if(channel.id !== serverQueue.channel.id) return message.channel.send({
      embed : {
        desciption : `${message.author} ❌You need join same voice channel with me!`
      }
    })
    serverQueue.volume = args[0];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return serverQueue.textChannel.send({
      embed: {
        color: "GOLD",
        description: `Volume set to: \`${args[0]}%\``
      }
    })
        .catch(console.error);
  }
};