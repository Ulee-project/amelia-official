const { MessageEmbed } = require('discord.js');
const statusAnimation = {
  Online: `<:Online:735377788424552460>`,
  bot: `<:bot:706352736127680602>`,
  verify_blue_style: `<a:verify_blue_style:767559855153610783>`,
  boosting: `<a:boosting:741774381994475601>`
};
const Statustext = {
  Online: "Online",
  bot: "bot",
  verify_blue_style: "verify_blue_style",
  boosting: "boosting"
  
};
module.exports = {
    name: "serverinfo",
  alias:["sinfo"],
  description: "View server information",
  usage: "serverinfo",
  category: "Information",
    run: async (client, message, args) => {
        let region;
        switch (message.guild.region) {
            case "europe":
                region = '🇪🇺 Europe';
                break;
            case "us-east":
                region = '🇺🇸 us-east'
                break;
            case "us-west":
                region = '🇺🇸 us-west';
                break;
            case "us-south":
                region = '🇺🇸 us-south'
                break;
            case "us-central":
                region = '🇺🇸 us-central'
                break;
        }

        const embed = new MessageEmbed()
            .setThumbnail(message.guild.iconURL({dynamic : true}))
            .setColor('#FFD700')
            .setAuthor(`${message.guild.name} server stats`,message.guild.iconURL({ dynamic: true }))
            .addFields(
                {
                    name: "🔹Owner: ",
                    value: `\`${message.guild.owner.user.tag}\``,
                    inline: true
                },
                {
                    name: "🔹Members: ",
                    value: `__**${message.guild.memberCount}**__ \`users!\``,
                    inline: true
                },
                {
                    name: `${statusAnimation.Online}Members Online: `,
                    value: `__**${message.guild.members.cache.filter(m => m.user.presence.status == "online").size}**__ \`users online!\``,
                    inline: true
                },
                {
                    name: `${statusAnimation.bot}Total Bots: `,
                    value: `__**${message.guild.members.cache.filter(m => m.user.bot).size}**__ \`bots!\``,
                    inline: true
                },
                {
                    name: "🔹Creation Date: ",
                    value: `\`${message.guild.createdAt.toLocaleDateString("en-us")}\``,
                    inline: true
                },
                {
                    name: "🔹Server Roles: ",
                    value: `__**${message.guild.roles.cache.size}**__ \`roles in this server.\``,
                    inline: true,
                },
                {
                    name: `🗺 Region: `,
                    value: `__**${message.guild.region}**__`,
                    inline: true
                },
                {
                    name: `${statusAnimation.verify_blue_style}Verification Level: `,
                    value: `\`${message.guild.verificationLevel}\``,
                    inline: true
                },
                {
                    name: `${statusAnimation.boosting}Boosters: `,
                    value: message.guild.premiumSubscriptionCount >= 1 ? `__**${message.guild.premiumSubscriptionCount}**__ \`Boosters\`` : `\`❌No boosters\``,
                    inline: true
                },
                {
                    name: "🔹Emojis: ",
                    value: message.guild.emojis.cache.size >= 1 ? `__**${message.guild.emojis.cache.size}**__ \`emojis!\`` : '\`There are no emojis\`' ,
                    inline: true
                }
            )
        await message.channel.send(embed)
    }
}