const { MessageEmbed } = require("discord.js");
const { play } = require("../../handler/play.js");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(process.env.YT_KEY);
const convertMS = require("pretty-ms");

module.exports = {
  name: "playlist",
  alias:["pl"],
  description: "Play a playlist from youtube",
  category: "Music",
  usage:"playlist <playlist url> / playlist <playlist name>",
  run: async(client, message, args) => {
    const { channel } = message.member.voice;

    if (!args.length)
      return message
        .channel.send({
        embed : {
          description : `${message.author} ❌No argument submitted, Try ${client.prefix}${module.exports.usage}`
        }
      })
        .catch(console.error);
    if (!channel) return message.channel.send({
      embed :{
        description : `❌You must join the voice channel first before using the command!`
      }
    }).catch(console.error);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.channel.send({
        embed : {
          description : `${message.author} ❌I don't have permission to **connect** your voice channel!`
        }
      });
    if (!permissions.has("SPEAK"))
      return message.channel.send({
        embed : {
          description : `${message.author} ❌I don't have permission to **speak** on voice channel!`
        }
      });

    const search = args.join(" ");
    const pattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const url = args[0];
    const urlValid = pattern.test(args[0]);

    const serverQueue = message.client.queue.get(message.guild.id);
    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    };

    let song = null;
    let playlist = null;
    let videos = [];

    if (urlValid) {
      try {
        playlist = await youtube.getPlaylist(url);
        videos = await playlist.getVideos()
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const results = await youtube.searchPlaylists(search, 1);
        playlist = results[0];
        videos = await playlist.getVideos(25);
      } catch (error) {
        console.error(error);
      }
    }

    videos.forEach( async (video) => {
      const songInfo = await ytdl.getInfo(`https://www.youtube.com/watch?v=${video.id}`)
      const convertduration = convertMS(songInfo.videoDetails.lengthSeconds * 1000, { colonNotation: true });
      song = {
          title: songInfo.videoDetails.title,
          channel:songInfo.videoDetails.author.name,
          url:songInfo.videoDetails.video_url,
          thumbnail: songInfo.videoDetails.thumbnails[0].url,
          duration: convertduration,
          playUser:message.author.id,
          vote:[]
      };
      if (serverQueue) {
        serverQueue.songs.push(song);
        if(channel.id !== serverQueue.channel.id) return message.channel.send({
          embed : {
            description : `${message.author} ❌You need join same voice channel with me!`
          }
        })
        message.channel
            .send(`✅ **${song.title}** has been added to the queue by ${message.author}`).then(msg => msg.delete({ timeout: 10000 })).catch(() => null)
            .catch(console.error);
      } else {
        queueConstruct.songs.push(song);
      }
    });

    
    if (!serverQueue) message.client.queue.set(message.guild.id, queueConstruct);
    
    if (!serverQueue) {
      try {
        const connection = await channel.join();
        queueConstruct.connection = connection;
        play(queueConstruct.songs[0],client, message);
      } catch (error) {
        console.error(`Could not join voice channel: ${error}`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send(`Could not join the channel: ${error}`).catch(console.error);
      }
    }
  }
};