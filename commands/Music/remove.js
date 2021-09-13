module.exports = {
  name: "remove",
  alias:["rmv"],
  category: "Music",
  description: "Remove song from the queue",
  usage:"remove <Queue Number>",
  run: async (client, message, args) => {
    if (!args.length) return message.channel.send({
      embed : {
        description : `${message.author} Usage: ${client.prefix}${module.exports.usage}`
      }
    });
    const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send({
      embed : {
        description : `${message.author} ❌No queue.`
      }
    }).catch(console.error);
    const { channel } = message.member.voice;
    if(channel.id !== serverQueue.channel.id || !channel) return message.channel.send({
      embed : {
        description : `❌You need join same voice channel with me!`
      }
    })
    const song = serverQueue.songs.splice(args[0] - 1, 1);
    serverQueue.textChannel.send({
      embed: {
        color:"GOLD",
      description: `${message.author} ❌ Removed **[${song[0].title}](${song[0].url})** from the Queue.`
    }
  })
  }
};