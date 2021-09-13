require("moment-duration-format");
const { version, MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "botinfo",
    alias:["binfo"],
    usage:"botinfo",
    description: "Shows info about the bot",
    category: "Information",
    run: async(client, message, args) => {
        const uptime = moment
            .duration(client.uptime)
            .format(" D [days], H [hrs], m [mins], s [secs]");
        const nodev = process.version;
        const createdAt = moment(client.user.createdAt).format("MM/DD/YYYY");

        const embed = new MessageEmbed()
            .setColor("#FFD700")
            .setFooter(message.author.username)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setAuthor(`${client.user.username} Statistic`,client.user.displayAvatarURL())
            .setDescription(`Below is the bot statistical information that can be displayed at this time
If you want to invite bots to your server, please [click here](https://discord.com/api/oauth2/authorize?client_id=706346679263035392&permissions=2147483639&scope=bot).`)
            
         .addField("**General Information**",`Bot Uptime: **\`${uptime}\`**
Status: **\`${client.user.presence.status}\`**
Users: **\`${client.users.cache.size}\`**
Channels: **\`${client.channels.cache.size}\`**
Servers: **\`${client.guilds.cache.size}\`**
            `)
        
        .addField("**Bot Information:**", `Bot Id: **\`${client.user.id}\`**
Prefix: **\`${client.prefix}\`**
Total Command: **\`${client.commands.size}\`**
Voice connections: **\`${client.voice.connections.size}\`**
            `)
            
        .addField(
                "**System Information**",
                `Created on: **\`${createdAt}\`**
RAM Usage:  **\`${(
                    process.memoryUsage().heapUsed /
                    1024 /
                    1024
                ).toFixed(2)}MB\`**
Node: **\`${nodev}\`**
Discord.js: **\`${version}\`**`
            )
        
        .addField("**Support Information**",
                 `Need help? join our server [click here](https://discord.gg/VzUR95y).`)
        .setImage(`https://top.gg/api/widget/706346679263035392.png?`)
        .setFooter(`Copyright © ${client.user.username}. All Rights Reserved.`)
        .setTimestamp();
        message.channel.send(embed);
    }
};