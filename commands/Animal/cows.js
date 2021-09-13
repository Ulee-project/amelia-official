const cowsPack = require("cows");

module.exports = {
    name: "cows",
    description: "Returns a cow ascii",
    category: "Animal",
    alias: ["cow"],
    usage: "cows",
    run: async (bot, message) => {
        const cows = cowsPack();

        const cow = cows[Math.floor(Math.random() * cows.length)];

        message.channel.send(`\`\`\` ${cow}  \`\`\``);
    }
};