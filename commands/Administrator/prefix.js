const db = require("quick.db");
const Sempack = require("discord.js");
module.exports = {
  name: "prefix",
  description: "Set a server's prefix",
  alias: ["setprefix"],
  category: "Administrator",
  usage: "prefix [newprefix] or prefix reset.",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send({
        embed : {
          color : `RED`,
          description : "❌You Don't Have `ADMINISTRATOR` Permissions!"
        }
      });

    if (!args[0])
      return message.channel.send({
        embed : {
          color: `GREEN`,
          description : `Usage: \`${client.prefix}prefix set <prefix>\`\nExample: \`${client.prefix}prefix set !\`\n\nChange the guild prefix.\n\nSub-Command:\n\nreset: set the default prefix\nset: set the prefix of your choice`
        }
      }
      );

    if (args[0] === "set") {
      db.set(`prefix_${message.guild.id}`, args[1]);

      let embed = new Sempack.MessageEmbed()
        .setTitle("Prefix Change")
        .setColor("GREEN")
        .setDescription(`✅The new prefix for the guild is \`${args[1]}\`.`);
      message.channel.send(embed);
    }

    if (args[0] === "reset") {
      db.delete(`prefix_${message.guild.id}`);

      message.channel.send({
        embed : {
          color : `GREEN`,
          description : `✅Succesffully set new prefix to \`a!\``
        }
      });
    }
  }
};
