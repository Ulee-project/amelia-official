const Discord = require("discord.js");

module.exports = async (client, msg) => {
  if (msg.author.bot) return;
  if (!msg.guild) return;
  
  let prefix;
    if (msg.channel.type == "text") {
      let gprefix = await client.db.fetch(`prefix_${msg.guild.id}`);
      if (gprefix === null) gprefix = "a!";
      prefix = gprefix;
    } else {
      prefix = `a!`;
    }

   client.prefix = prefix;

  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  const embed = new Discord.MessageEmbed()
    if (msg.content.match(prefixMention)) {
    msg.channel.send({
      embed: {
        author : {
          name : `${client.user.username} Prefix`,
          icon_url : `${client.user.displayAvatarURL({ dynamic: true })}`
        },
        footer : {
          text : `Copyright © ${client.user.username}. All Rights Reserved.`
        },
        description: `_Hey! ${msg.author}_

\`-\` _My prefix in this guild is \`${client.prefix}\`_
\`-\` _Server ID \`${msg.guild.id}\`_
\`-\` _Type \`${client.prefix}help\` for the list of commands._`,
        color: `#FFD700`
      }
    });
  }
  
  if (msg.content == `<@${client.user.id}>`) {
    const embed = new Discord.MessageEmbed()
      .setDescription(`:wave: | My prefix is \`${client.prefix}\``)
      .setColor(`#FFD700`)
    msg.channel.send(embed).then(msg => msg.delete({ timeout: 5000 })).catch(() => null);
  }
  if (msg.content == client.prefix) {
    const embed = new Discord.MessageEmbed()
      .setDescription(
        `${msg.author} _That's my prefix._`
      )
      .setColor(`#FFD700`)
    return msg.channel.send(embed).then(msg => msg.delete({ timeout: 10000 })).catch(() => null);
  }

  let args = msg.content
    .slice(client.prefix.length)
    .trim()
    .split(" ");
  let cmd = args.shift().toLowerCase();
  if (!msg.content.startsWith(client.prefix)) return;

  //wrong commands
  try {
    const file = client.commands.get(cmd) || client.aliases.get(cmd);
    if (!file) return msg.channel.send({
    embed : {
      description : 
    `${msg.author} ❌Sorry, the command you want does not exist.`
    }
    }).then(msg => msg.delete({ timeout: 5000 })).catch(() => null);
   
  //cooldown commands 
    const now = Date.now();
    if (client.db.has(`cooldown_${msg.author.id}`)) {
      const expirationTime = client.db.get(`cooldown_${msg.author.id}`) + 3000;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return msg.channel.send({
          embed : {
            description : `${msg.author} ❗️ Please wait \`${timeLeft.toFixed(
            1
          )}\` more second(s) before reusing the \`${file.name}\` command.`
          }
        }).then(msg => msg.delete({ timeout: 5000 })).catch(() => null);
      }
    }

    client.db.set(`cooldown_${msg.author.id}`, now);
    setTimeout(() => {
      client.db.delete(`cooldown_${msg.author.id}`);
    }, 3000);

    file.run(client, msg, args);
  } catch (err) {
    console.error(err);
  } finally {
    console.log(
      `[${msg.author.tag}] using [${cmd}] in ${msg.channel.name} | ${msg.guild.name}`
    );
  }
};
