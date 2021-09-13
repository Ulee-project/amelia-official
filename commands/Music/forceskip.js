module.exports = {
  name:"forceskip",
  alias:["fs"],
  category: "Music",
  description: "Force skip currently song",
  usage: "forceskip ",
  run: async(client, message) => {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.channel.send({
        embed : {
          description : `${message.author} ❌You must join the voice channel first before using the command!`
        }
      })
        .catch(console.error);
    if (!serverQueue)
      return message.channel.send({
        embed : {
          description : `${message.author} ❌There is nothing playing that I could skip for you.`
      }
      })
        .catch(console.error);
    const { channel } = message.member.voice;
    if(channel.id !== serverQueue.channel.id) return message.channel.send({
      embed : {
        description : `${message.author}❌You need join same voice channel with me!`
      }
    })
    serverQueue.connection.dispatcher.end();
    serverQueue.textChannel.send({
      embed: {
        color: "GOLD",
        description: `${message.author} ⏭ Skipped the Song.`
      }
    })
        .catch(console.error);
  }
};