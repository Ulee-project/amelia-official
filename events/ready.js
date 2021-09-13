module.exports = client => {
  console.log(
    `(💯) Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`
  );
  
  client.user.setActivity(`🍁If there is a will, there is always a way my friend`, { type: "LISTENING" },5000)
}
