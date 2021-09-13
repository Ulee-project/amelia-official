module.exports = {
  name: "stop",
  alias:["dc"],
  category: "Music",
  description: "Stops the music",
  usage:"stop",
  run: async(client, message) => {
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
    const { channel } = message.member.voice;
    if(channel.id !== serverQueue.channel.id) return message.channel.send({
      embed : {
        description  : `${message.author} ❌You need join same voice channel with me!`
      }
    })
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    serverQueue.textChannel.send({embed: {
      color:`#FFD700`,
      description: `**Thank you for using our service**
      
      :stop_button: Music has stopped.`,
      
      image : {
        url : `https://cdn.discordapp.com/attachments/751259712317554698/803931045065523220/20210127_171417.jpg`
      },
      footer : {
        text : `Copyright © ${client.user.username}. All Rights Reserved.`
      }
    }
  })
        .catch(console.error);
  }
};