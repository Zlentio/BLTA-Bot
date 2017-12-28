const Discord = require("discord.js");
const bot = new Discord.Client();
const embed = new Discord.RichEmbed()
var client = new Discord.Client();
const sql = require("sqlite");
sql.open("./score.sqlite");

client.login("", output);

function output(error, token) {
    if (error) {
      console.log("There was an error: " + error);
      return;
    }else
      console.log("Logged in: " + token);
    } 

    client.on("ready", function() {
        console.log("bot stats: Online!");
      });


    client.on('disconnect', function() {
        console.log("An error cause your bot to go offline! ");
      }); 

const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.


client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setGame(`+help`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Administrator", "Moderator", "Developers", "Helper"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention!
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the kick!");
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry **${message.author}** I couldn't kick because of : ${error}`));
    message.reply(`**${member.user.tag}** has been kicked by **${message.author.tag}**. **Reason**: ${reason}`);


  }
  
  if(command === "ban") {
    if(!message.member.roles.some(r=>["Administrator", "Moderator", "Developers", "Helper"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ban!");
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry **${message.author}** I couldn't ban because of : ${error}`));
    message.reply(`**${member.user.tag}** has been banned by **${message.author.tag}** **Reason**: ${reason}`);
  }
  
  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});

client.on('guildMemberRemove', member => {
  
      let guild = member.guild;
  
      member.guild.fetchAuditLogs({
          limit: 1
      }).then(logs => {
  
          var logArray = Array.from(logs.entries.values());
  
          console.log("createdTimestamp: " + logArray[0].createdTimestamp);
          console.log("createdAt: " + logArray[0].createdAt);
  
  
      }).catch(console.error);
  
  });

    client.on('message', message => {
      if (message.content === "+help") {
          message.author.sendMessage("\n**Commands**: \nblagh blah blah.");
          console.log("a user has executed a help command!");
      }
    ;

      if (message.content === "+bot") {
          message.channel.send({embed: {
          color: 3447003,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          },
          title: "BLTA Bot",
          url: "",
          description: "This bot is designed customly for Blta's Discord. It has many misc and moderation features. +help",
          fields: [{
              name: "Blta's Discord",
              value: "Blta's Discord is a discord for the fans of Blta. Go [subscribe to him](https://www.youtube.com/channel/UCvw1oB6JlGWHDetlel5V_Bg)."
            },

          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Zlentio"
          }
        }
      });}

if (message.content == '+avatar') {
  const embed4 = new Discord.RichEmbed()
  embed4.setTitle('This is your avatar.')
  embed4.setColor(0xe2f442)
  embed4.setImage(`${message.member.user.avatarURL}`)
  embed4.setFooter('v1.1')
  message.mentions.users.first()
  message.channel.send({embed: embed4})
};

const prefix = "+";


  sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
    if (!row) {
      sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    } else {
      let curLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));
      if (curLevel > row.level) {
        row.level = curLevel;
        sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
        message.reply(`You've leveled up to level **${curLevel}**!`);
      }
      sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
    }
  }).catch(() => {
    console.error;
    sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
      sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    });
  });

  if (!message.content.startsWith(prefix)) return;
  
    if (message.content.startsWith(prefix + "level")) {
      sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
        if (!row) return message.reply("You are currently level 0");
        message.reply(`You are currently level ${row.level}`);
      });
    } else
  
    if (message.content.startsWith(prefix + "points")) {
      sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
        if (!row) return message.reply("sadly you do not have any points yet! Start talking in chat.");
        message.reply(`you currently have ${row.points} points!`);
      });
    }
  ;

  if (message.content == '+thonk') {
    const embed4 = new Discord.RichEmbed()
    embed4.setTitle('Thonk')
    embed4.setColor(0xe2f442)
    embed4.setImage(`https://cdn.discordapp.com/attachments/389475974460342284/395698076557246464/blta_thonk.png`)
    embed4.setFooter('What are you thonking about?')
    message.mentions.users.first()
    message.channel.send({embed: embed4})
  };

    })


client.login(config.token);
