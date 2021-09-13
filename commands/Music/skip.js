module.exports = {
  name: "skip",
  alias:["s"],
  category: "Music",
  description:"Skip currently playing song with vote",
  usage:"skip",
  run: async(client, message) => {
    let serverQueue = client.queue.get(message.guild.id);
    if (!message.member.voice.channel) return message.channel.send({
      embed : {
        description : `${message.author} ❌You must join the voice channel first before using the command!`
      }
    })
    if(message.member.voice.channel.id !== serverQueue.channel.id) return message.channel.send({
      embed : {
        description : `${message.author} ❌You need join same voice channel with me!`
      }
    })
    if (!serverQueue) return message.channel.send({
      embed : {
        description : `❌There is nothing playing.`
      }
    })
    let song = serverQueue.songs[0]   
    let jumem = serverQueue.channel.members.filter(member => !member.user.bot).size
    if (serverQueue.songs[0].vote.includes(message.author.id)) return message.channel.send({
      embed : {
        description : `${message.author}, you have already voted! \`${song.vote.length}/${jumem}\` votes.`
      }
    });
    
    song.vote.push(message.author.id);
        message.channel.send({
          embed: {
            color:"GOLD",
            description: `${message.author} voted! \`${song.vote.length}/${jumem}\` votes.`
          }
        })
        if (song.vote.length >= jumem) return serverQueue.connection.dispatcher.end();
    
}
};