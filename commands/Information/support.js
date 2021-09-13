const { MessageEmbed } = require("discord.js");
const statusAnimation =
{
  'whatsapp' : `<:whatsapp:708045531020001280>`,
  'discord' : `<:discord:708169961700589628>`,
  'instagram' : `<:instagram:709976308670791720>`,
  'facebook' : `<:facebook:735487953710874706>`
};
  
const StatusText =
{
    'whatsapp' : 'whatsapp',
    'discord' : 'discord',
    'instagram' : 'instagram',
    'facebook' : 'facebook'
}
module.exports = {
  name: "support",
  alias: ["sup"],
  description: "Visit us for your support",
  category: "Information",
  usage:"support",
  run: async (client, msg, args) => {
    const Embed = new MessageEmbed()
      msg.channel.send(`${statusAnimation.discord} If you experience problems in **<@${client.user.id}>** bots you can report the problem but must join the server first. **:** https://discord.gg/VzUR95y`);
  },
};