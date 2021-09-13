const { MessageEmbed } = require("discord.js");
const { formatDate } = require("../../functions");

module.exports = {
  name: "userinfo",
  description: "Get user info",
  usage: "userinfo <user>",
  category: "Information",
  alias: ["user"],
  run: async(client, message, args) =>  {
    const member =
      message.guild.members.cache.get(args.join(" ")) ||
      message.mentions.members.first() ||
      message.member;

    if (!member) return message.channel.send("**❌User wasn't found!**");

    const joinedAt = formatDate(member.user.joinedAt);
    const createdAt = formatDate(member.user.createdAt);
    const avatar = member.user.displayAvatarURL();
    const roles =
      member.roles.cache
        .filter((r) => r.id !== message.guild.id)
        .map((r) => r)
        .join(", ") || "None";
    const roleCount = member.roles.cache.filter(r => r.id !== message.guild.id).size;
    const { username, id, tag } = member.user;

    const embed = new MessageEmbed()
      .addField("🔹ID", id, true)
      .addField("🔹Username", `<@${id}>`, true)
      .addField("🔹Tag", tag)
      .addField("🔹Created At", createdAt, true)
      .addField("🔹Joined At", joinedAt, true)
      .addField(`🔹Roles (${roleCount})`, roles)
      .setAuthor(`${username}'s info`)
      .setColor("#FFD700")
      .setThumbnail(avatar, { dynamic: true })
      .setTimestamp();

    message.channel.send(embed);
  },
};