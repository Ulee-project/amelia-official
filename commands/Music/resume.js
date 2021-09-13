module.exports = {
  name: "resume",
  alias:["rsm"],
  category: "Music",
  description: "Resume currently playing music",
  usage:"resume",
  run: async(client, message, args) => {
    const serverQueue = client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.channel.send({
        embed : {
          description : `${message.author} ❌You must join the voice channel first before using the command!`
        }
      }).catch(console.error);
    const { channel } = message.member.voice;
    if(channel.id !== serverQueue.channel.id) return message.channel.send({
      embed : {
        description : `${message.author} ❌You need join same voice channel with me!`
      }
    })
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return serverQueue.textChannel.send({
        embed: {
          color:"GOLD",
          description: `${message.author} ▶ Resumed the Music!`
        }
      })
          .catch(console.error);
    return message.channel.send({
      embed : {
        description : `${message.author} ❌There is nothing playing.`
      }
    }).catch(console.error);
    }
  }
};