const { MessageEmbed } = require("discord.js");
const translate = require("@k3rn31p4nic/google-translate-api");

module.exports = {
  name: "translate",
  alias: ["tr"],
  description: "Translate a sentence",
  usage: "!translate <language/iso> <sentence>",
  category: "Utility",
  run: async (client, message, args) => {
    let language = args[0];
    let text = args.slice(1).join(" ");

    if (!language)
      return message.reply({
        embed : {
          description : `❌What language am I supposed to translate to?`
        }
      });
    if (language.length !== 2)
      return message.reply({
embed : {
  description : "❌Language must be the 2 letter alias. E.g `English` -> `en`"
}});
    if (!text) return message.reply({
      embed : {
        description : `❌What am I supposed to translate?`
      }
    });

    const result = await translate(text, { to: language });

    const embed = new MessageEmbed()
      .setDescription(result.text)
      .setColor('#FFD700')
      .setFooter(`Translate provided by Google.`)
      .setAuthor("Google Translate", message.author.displayAvatarURL());

    message.channel.send(embed);
  }
};