const discord = require("discord.js");
const { readdirSync } = require("fs");
const statusAnimation = {
  amelia_stars: `<a:amelia_stars:767224079530852372>`,
  musrik: `<a:musrik:767228110974091274>`,
  amelia_fun: `<a:amelia_fun:768983514573438996>`,
  utility: `<:utility:767237827318120488>`,
  administrator: `<a:administrator:767241297881989130>`,
  Kitten_Cat_roll :`<a:Kitten_Cat_roll:741771529024438353>`,
  king_crown :`<a:king_crown:792386752726958111>`
};
const Statustext = {
  amelia_stars: "amelia_stars",
  musrik: "musrik",
  amelia_fun: "amelia_fun",
  utility: "utility",
  administrator: "administrator",
  Kitten_Cat_roll: "Kitten_Cat_roll",
  king_crown: "king_crown"
  
};

module.exports = {
  name: "help",
  alias: ["h"],
  category: "Information",
  description: "Show list of bot's commands",
  usage: "help <commands>",
  run: async (client, msg, args) => {
    if (!args[0]) {
      const helpembed = new discord.MessageEmbed()
        .setAuthor(`${client.user.username} | Help Commands`, msg.guild.iconURL({ dynamic: true }))
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(
          `_Hi, I'm ${client.user.username}Bot!, Vote us for your [support](https://top.gg/bot/706346679263035392/vote)\nType \`${client.prefix}help <commands>\` to get more help eg. \`${client.prefix}help stats\`\nif you need help or just want to chat please join the [Support Server](https://discord.gg/VzUR95y)._\n`)
        
           .addField(
          `${statusAnimation.administrator} **| Moderator**`,
          client.commands
            .filter(c => c.category === "Administrator")
            .map(m => `_\`${m.name}\`_`)
            .join(", ")
        )
           .addField(
          `${statusAnimation.amelia_stars} **| Information**`,
          client.commands
            .filter(c => c.category === "Information")
            .map(m => `_\`${m.name}\`_`)
            .join(", ")
        )
          .addField(
         `${statusAnimation.Kitten_Cat_roll} **| Animal**`,
         client.commands
           .filter(c => c.category == "Animal")
           .map(m => `_\`${m.name}\`_`)
           .join(", ")
        )
          .addField(
         `${statusAnimation.amelia_fun} **| Fun**`,
         client.commands
           .filter(c => c.category == "Fun")
           .map(m => `_\`${m.name}\`_`)
           .join(", ")
        )
           .addField(
          `${statusAnimation.musrik} **| Music**`,
          client.commands
            .filter(c => c.category === "Music")
            .map(m => `_\`${m.name}\`_`)
            .join(", ")
        )
         .addField(
         `${statusAnimation.utility} **| Utility**`,
         client.commands
           .filter(c => c.category == "Utility")
           .map(m => `_\`${m.name}\`_`)
           .join(", ")
        )
        .setColor("#FFD700")
        .setFooter(
          `Copyright © ${client.user.username}. All Rights Reserved. | ${client.prefix}donate | Total Commands: ${client.commands.size}.`,
          client.user.displayAvatarURL({ format: "png" })
        );

      return msg.channel.send(helpembed);
    } else {
      let cmd =
        client.commands.get(args[0]) ||
        client.commands.get(client.aliases.get(args[0]));

      if (!cmd) return msg.channel.send({
        embed : {
          color : `RED`,
          description : `❌Invalid Command.`
        }
      });
      const embed = new discord.MessageEmbed()
        .setAuthor(
          `${client.user.username}'s Help Menu`, `https://media.discordapp.net/attachments/713330653466460254/850584899621486622/cmd.png`, `https://media.discordapp.net/attachments/713330653466460254/850584899621486622/cmd.png` )
        .setTitle(`${client.prefix}${cmd.name}`)
        .setURL(`https://discord.gg/VzUR95y`)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`**\`\`\`${cmd.description}\`\`\`**`)
        .addField("_Usage_", `**\`${client.prefix}${cmd.usage}\`**`)
        .addField("_Category_", `**\`${cmd.category}\`**`)
        .addField(
          "_Aliases_",
          cmd.alias.length > 0 ? cmd.alias.join(" ") : "None"
        )
        .addField("Still Lost?",`Join our [Server](https://discord.gg/VzUR95y) for Information`)
        .setColor("#FFD700")
      return msg.channel.send(embed);
    }
  }
};
