const statusAnimation = {
  youtube: `<:youtube:734037069537607791>`
};
const Statustext = {
  youtube: "youtube"
};
module.exports = {
  name: "nowplaying",
  alias:["np"],
  category: "Music",
  description: "Get info of now playing music",
  usage:"nowplaying",
  run: async(client, message) => {
     const serverQueue = client.queue.get(message.guild.id);
    let lup;
    if(serverQueue.loop === true) lup = "Enable"
    if(serverQueue.loop === false) lup = "Disable"
    if (!serverQueue) return message.reply("**❌There is nothing playing.**").catch(console.error);
    const song = serverQueue.songs[0]
      message.channel.send({
        embed : {
          color: "GOLD",
          author : {
            name: `Now Playing ♪`,
            icon_url : "https://cdn.discordapp.com/attachments/713330653466460254/797889727499468800/Music.gif"
          },
          description : `[${song.title} from ${song.channel}.](${song.url})
          Requested: <@${song.playUser}>
          \`[${song.duration}]\``,
          footer:{
              text: `Volume: ${serverQueue.volume}% - Loop: ${lup}`,
          },
          timestamp: new Date(),
          image: {
            url : song.thumbnail,
            }
          },
        }
      )
    }
};