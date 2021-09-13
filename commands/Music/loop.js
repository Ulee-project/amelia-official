module.exports = {
  name: "loop",
  alias:["repeat"],
  category: "Music",
  description: "Toggle music loop",
  usage: "loop",
  run: async(client, message) => {
    const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send({
      embed : {
        description : `${message.author} ❌No song is playing`
      }
    })
      .catch(console.error);
    const { channel } = message.member.voice;
    if(channel.id !== serverQueue.channel.id || !channel) return message.channel.send({
      embed : {
        description : `${message.author}❌You need join same voice channel with me!`
      }
    })
    // toggle from false to true and reverse
    serverQueue.loop = !serverQueue.loop;
    return serverQueue.textChannel.send({
      embed: {
        color:"GOLD",
        description: `🔁 Loop is ${serverQueue.loop ? "\`Enable\`" : "\`Disable\`"}`
      }
    })
      .catch(console.error);
  }
};
