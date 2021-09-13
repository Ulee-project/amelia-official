const { play } = require("../../handler/play.js");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(process.env.YT_KEY);
const convertMS = require("pretty-ms");
module.exports = {
  name: "play",
  alias: ["p"],
  category: "Music",
  description: "Play youtube music",
  usage: "play <song name> / play <song url>",
  run: async (client, msg, args) => {
    const { channel } = msg.member.voice;
    if (!args.length)
      return msg.channel.send({
        embed : {
          color : `RED`,
          description : `${msg.author} ❌No argument submitted. Try ${client.prefix}${module.exports.usage}`
        }
      });
    if (!channel)
      return msg
        .channel.send({
        embed : {
          description : `${msg.author} ❌You must join the voice channel first before using the command!`
        }
      })
        .catch(console.error);

    const permissions = channel.permissionsFor(client.user);
    /*if (!permissions.has("VIEW CHANNEL"))
      return msg.channel.send({
        embed : {
          description : `${msg.author} ❌I don't have permission to **view** on voice channel!`
        }
      });*/
    if (!permissions.has("CONNECT"))
      return msg.channel.send({
        embed : {
          description : `${msg.author} ❌I don't have permission to **connect** your voice channel!`
        }
      });
    if (!permissions.has("SPEAK"))
      return msg.channel.send({
        embed : {
          description : `${msg.author} ❌I don't have permission to **speak** on voice channel!`
        }
      });

    const search = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
    const url = args[0];
    const urlValid = videoPattern.test(args[0]);

    // Start the playlist if playlist url was provided
    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return client.commands.get("playlist").run(client, msg, args);
    }

    const serverQueue = client.queue.get(msg.guild.id);
    const queueConstruct = {
      textChannel: msg.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    };

    let song = null;
    let songInfo = null;

    if (urlValid) {
      try {
        songInfo = await ytdl.getInfo(url);
        const convertduration = convertMS(songInfo.videoDetails.lengthSeconds * 1000, { colonNotation: true });
        song = {
          title: songInfo.videoDetails.title,
          channel: songInfo.videoDetails.author.name,
          url: songInfo.videoDetails.video_url,
          thumbnail: songInfo.videoDetails.thumbnails[0].url,
          duration: convertduration,
          playUser: msg.author.id,
          vote: []
        };
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const results = await youtube.searchVideos(search, 1);
        songInfo = await ytdl.getInfo(results[0].url);
        const convertduration = convertMS(songInfo.videoDetails.lengthSeconds * 1000, { colonNotation: true });
        song = {
          title: songInfo.videoDetails.title,
          channel: songInfo.videoDetails.author.name,
          url: songInfo.videoDetails.video_url,
          thumbnail: songInfo.videoDetails.thumbnails[0].url,
          duration: convertduration,
          playUser: msg.author.id,
          vote: []
        };
      } catch (error) {
        console.error(error);
        return msg
          .channel.send({
          embed : {
            color : `RED`,
            description : `❌No matches found!`
          }
        })
          .catch(console.error);
      }
    }

    if (serverQueue) {
      //return if member voice not same as bot
      if (channel.id !== serverQueue.channel.id)
        return msg.channel.send({
          embed : {
            description : `${msg.author} ❌You need join same voice channel with me!`
          }
        });
      serverQueue.songs.push(song);
      return serverQueue.textChannel
        .send({
          embed: {
            color: `#FFD700`,
            author: {
              icon_url : "https://cdn.discordapp.com/attachments/706347774572232755/791862138410500116/767228110974091274.gif",
              name : "Add to Queue ♪",
            },
            description: `[${song.title}](${song.url}) - \`[${song.duration}]\`\n<@${song.playUser}>`,
            footer:{
              text: `Source ♪ - ${song.channel}`
            },
            timestamp: new Date(),
            thumbnail: {
              url: song.thumbnail,
            }
          }
        })
        .catch(console.error);
    } else {
      queueConstruct.songs.push(song);
    }

    if (!serverQueue) client.queue.set(msg.guild.id, queueConstruct);
    if (!serverQueue) {
      try {
        queueConstruct.connection = await channel.join();
        play(queueConstruct.songs[0], client, msg);
      } catch (error) {
        console.error(`Could not join voice channel: ${error}`);
        client.queue.delete(msg.guild.id);
        await channel.leave();
        return msg.channel
          .send(`Could not join the channel: ${error}`)
          .catch(console.error);
      }
    }
  }
};
