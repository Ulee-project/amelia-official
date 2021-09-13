const { MessageEmbed } = require('discord.js');

module.exports = {
        name: "flipcoin",
        alias: ['flip'],
        category: 'Fun',
        description: 'flips a coin',
        usage: 'flipcoin',
    run: async (client, message, args) => {
        const n = Math.floor(Math.random() * 2);
        let result;
        if (n === 1) result = 'Heads';
        else result = 'Tails';
        const embed = new MessageEmbed()
            .setColor("#FFD700")
            .setDescription(`**${message.member.displayName} Flipped \`${result}\`**!`)
        message.channel.send(embed);
    }
};