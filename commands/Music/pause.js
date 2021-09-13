module.exports = {
  name: "pause",
  alias:["ps"],
  category: "Music",
  description: "Pause the currently playing music",
  usage:"pause",
  run: async(client, message) => {
    if (!message.member.voice.channel)
      return message.channel.send({
        embed : {
          description : `${message.author} ❌You must join the voice channel first before using the command!`
        }
      })
        .catch(console.error);

    const serverQueue = client.queue.get(message.guild.id);
    const { channel } = message.member.voice;
    if(channel.id !== serverQueue.channel.id) return message.channel.send({
      embed : {
        description : `${message.author}❌You need join same voice channel with me!`
      }
    })
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause(true);
      return serverQueue.textChannel.send({
        embed: {
          color: 'GOLD',
          description: `${message.author} ⏸ Paused the Music.`
        }
        })
        .catch(console.error);
    }
    return message.reply("**❌There is nothing playing.**").catch(console.error);
  }
};