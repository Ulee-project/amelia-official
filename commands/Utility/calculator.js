const Discord = require('discord.js');
const math = require('mathjs');

module.exports = {
        name: "calculator",
        alias: ['calc'],
        category:"Utility",
        description: "Shows Calculated Answers Of User's Query",
        usage: "calculator <mathematical>",
    run: async (bot, message, args) => {

        if (!args[0]) return message.channel.send({
          embed : {
            description : `❌Enter Something To Calculate`
          }
        }).then(msg => msg.delete({ timeout: 5000 })).catch(() => null);

        let result;
        try {
            result = math.evaluate(args.join(" ").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/"));
        } catch (e) {
            return message.channel.send({
              embed : {
                color : `RED`,
                description : "Enter Valid Calculation!**\n\n**List of Calculations** - \n1. **sqrt equation** - `sqrt(3^2 + 4^2) = 5`\n2. **Units to Units** - `2 inch to cm = 0.58`\n3. **Complex Expressions Like** - `cos(45 deg) = 0.7071067811865476`\n4. **Basic Maths Expressions** - `+, -, ^, /, decimals` = **2.5 - 2 = 0.5"
              }
            }).then(msg => msg.delete({ timeout: 300000 })).catch(() => null);
        }

        let embed = new Discord.MessageEmbed()
            .setColor("#FFD700")
            .setAuthor(`${bot.user.username} Calculator`, message.author.displayAvatarURL({ dynamic: true }))
            .addField("**Operation**", `\`\`\`Js\n${args.join("").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/")}\`\`\``)
            .addField("**Result**", `\`\`\`Js\n${result}\`\`\``)
            .setFooter(`Requested ${message.author.username}`);
        message.channel.send(embed);
    }
}