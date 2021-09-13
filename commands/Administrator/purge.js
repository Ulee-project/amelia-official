const statusAnimation =
{
  'tickgreen' : `<a:tickgreen:741774383634448464>`
};
  
const StatusText =
{
    'tickgreen' : 'tickgreen'
}
module.exports = {
        name: "purge",
        alias: ["clear"],
        category: "Administrator",
        description: "Deletes messages from a channel",
        usage: "purge <amount of messages>",
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({
          embed : {
            color : `RED`,
            description : "❌You Don't Have `MANAGE_MESSAGES` Permissions!"
          }
        })
        if (isNaN(args[0]))
            return message.channel.send({
              embed : {
                description : `❌Please Supply A Valid Amount To Delete Messages! Ex: purge <amount>`
              }
            });

        if (args[0] > 100)
            return message.channel.send({
              embed : {
                description : `❌Please Provide Number Less Than 100!`
              }
            });

        if (args[0] < 1)
            return message.channel.send({
              embed : {
                description : `❌Please Supply A Number More Than 1!`
              }
            });

        message.channel.bulkDelete(args[0])
            .then(messages => message.channel.send(`${statusAnimation.tickgreen}| **Succesfully deleted \`${messages.size}/${args[0]}\` messages**`).then(msg => msg.delete({ timeout: 5000 }))).catch(() => null)
    }
}