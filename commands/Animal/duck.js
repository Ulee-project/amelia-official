const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "duck",
    alias:["duck"],
    description: "Shows a picture of a duck",
    category: "Animal",
    usage:"duck",
    run: async (client, message, args) => {
        const data = await fetch("https://random-d.uk/api/v1/random?type=gif").then(res => res.json());

        const embed = new MessageEmbed()
            .setFooter(`Powered by nekos.life`)
            .setAuthor(`| 🦆 Wek Wek Wek~`, message.guild.iconURL({ dynamic: true }))
            .setColor("#FFD700")
            .setImage(`${data.url}`)

        message.channel.send(embed);
    }
};