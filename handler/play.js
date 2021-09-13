const ytdlDiscord = require("ytdl-core-discord");
const statusAnimation = {
YouTube: `<:YouTube:735293606973276180>`
};
const Statustext = {
  YouTube: "YouTube"
};
module.exports.play = async (song, client, message) => {
  const queue = client.queue.get(message.guild.id);
  const Discord = require("discord.js");
  if (!song) {
    queue.channel.leave();
    message.client.queue.delete(message.guild.id);
    return queue.textChannel.send({embed: {
      color:`RED`,
      description: `:no_entry_sign: Music ended and left the voice channel, ❌ There are no more tracks.`,
    }
  })
      .catch(console.error).then(msg => msg.delete({ timeout: 60000 })).catch(() => null);
  }





  try {
    var stream = await ytdlDiscord(song.url);
  } catch (error) {
    if (queue) {
      queue.songs.shift();
      module.exports.play(queue.songs[0], message);
    }
  }

  const dispatcher = queue.connection
    .play(stream, { type: "opus" })
    .on("finish", () => {
      if (playingMessage && !playingMessage.deleted)
        playingMessage.delete().catch(console.error);

      if (queue.loop) {
        // if loop is on, push the song back at the end of the queue
        // so it can repeat endlessly
        let lastSong = queue.songs.shift();
        queue.songs.push(lastSong);
        module.exports.play(queue.songs[0], client, message);
      } else {
        // Recursively play the next song
        queue.songs.shift();
        module.exports.play(queue.songs[0], client, message);
      }
    })
    .on("error", err => {
      console.error(err);
      queue.songs.shift();
      module.exports.play(queue.songs[0], client, message);
    });
  dispatcher.setVolumeLogarithmic(queue.volume / 100);

  const serverQueue = client.queue.get(message.guild.id);
  try {
    var playingMessage = await queue.textChannel.send({
      embed: {
        color: `#FFD700`,
        author: {
         name: `Now playing ♪`,
         icon_url: "https://cdn.discordapp.com/attachments/713330653466460254/797889727499468800/Music.gif"
      },
        description: `[${song.title}](${song.url}) - \`[${song.duration}]\`\n<@${song.playUser}>`,
        footer: {
          text: `Source ♪ - ${song.channel} | ${parseInt((serverQueue.songs.length) - 1)} songs in queue`
        },
        timestamp: new Date(),
        thumbnail: {
          url: song.thumbnail
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};