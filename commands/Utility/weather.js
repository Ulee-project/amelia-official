const Discord = require("discord.js");
const weather = require("weather-js");

module.exports = {
  name: "weather",
  alias:["weather"],
  category: "Utility",
  description: "Responds with weather information for a specific location.",
  usage: "weather <city>",
  run: async(client, message, args) => {
    let city = args.join(" ");
    let degreetype = "C"; // You can change it to F. (fahrenheit.)

    await weather.find({search: city, degreeType: degreetype}, function(err, result) {
        if (!city) return message.channel.send({
          embed : {
            description : `Please insert the city.`
          }
        });
        if (err || result === undefined || result.length === 0) return message.channel.send({
          embed : {
            description : `❌Unknown city. Please try again.`
          }
        });

        let current = result[0].current;
        let location = result[0].location;

        const embed = new Discord.MessageEmbed()
        .setAuthor(current.observationpoint)
        .setDescription(`> ${current.skytext}`)
        .setThumbnail(current.imageUrl)
        .setTimestamp()
        .setColor("#FFD700")

        embed.addField("Latitude", location.lat, true)
        .addField("Longitude", location.long, true)
        .addField("Feels Like", `${current.feelslike}° Degrees`, true)
        .addField("Degree Type", location.degreetype, true)
        .addField("Winds", current.winddisplay, true)
        .addField("Humidity", `${current.humidity}%`, true)
        .addField("Timezone", `GMT ${location.timezone}`, true)
        .addField("Temperature", `${current.temperature}° Degrees`, true)
        .addField("Observation Time", current.observationtime, true)

        return message.channel.send(embed);
    })
}
};