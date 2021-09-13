const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "poll",
    description: "Create a poll",
    category: "Utility",
    alias:["poll"],
    usage:'poll <provide text>',
    run: async (client, message, args) => {
      message.delete();
        const question = args.join(" ");

        if (!question) return message.reply({
          embed : {
            color : `RED`,
            description : `${message.author} ❌Please provide a poll, Try ${client.prefix}${module.exports.usage}`
          }
        }).then(msg => msg.delete({ timeout: 5000 })).catch(() => null);

        const embed = new MessageEmbed()
            .setTitle(question)
            .setFooter(message.author.username)
            .setColor("#FFD700")
            .setTimestamp();

        const sendMessage = await message.channel.send(embed);

        sendMessage.react("✅");
        sendMessage.react("❌");
        sendMessage.react("🤷🏻");
    }
};
