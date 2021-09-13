module.exports = {
  name: "skipto",
  alias:["st"],
  category: "Music",
  description: "Skip to the selected queue number",
  usage:"skipto <Queue Number>",
  run: async(client, message, args) => {
    if (!args.length) return message.channel.send({
      embed : {
        description : `${message.author} Usage: ${message.client.prefix}${module.exports.usage}`
      }
    });

    if (!message.member.voice.channel) return message.channel.send({
      embed : {
        description : `${message.author} ❌You must join the voice channel first before using the command!`
      }
    })
    
    const queue = client.queue.get(message.guild.id);
    if (!queue) return message.channel.send({
      embed : {
        description : `${message.author} ❌No queue.`
      }
    }).catch(console.error);

    queue.playing = true;
    queue.songs = queue.songs.slice(args[0] - 2);
    queue.connection.dispatcher.end();
    queue.textChannel.send({
      embed : {
        color:"GOLD",
        description: `${message.author} ⏭ Skipped ${args[0] - 1} songs.`
        }
    })
      .catch(console.error);
  }
};