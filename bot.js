const Discord = require("discord.js");
const bot = new Discord.Client();
const embed = new Discord.RichEmbed()
var client = new Discord.Client();
const sql = require("sqlite");
sql.open("./score.sqlite");
const ms = require("ms");

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


client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setGame(`+help`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});


client.on("message", async message => {
  
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  
  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }
  
  if(command === "kick") {
    if(!message.member.roles.some(r=>["Administrator", "Moderator", "Developers", "Helper"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the kick!");
    
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

  if(command === "mute") {
    if(!message.member.roles.some(r=>["Administrator", "Moderator", "Developers", "Helper"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = msg.mentions.member.first();
    if(!member) return msg.reply("Please mention a user to mute.");
    
    let muteRole = msg.guild.roles.find("name", "Muted");
    if(!muteRole) return msg.reply("Make a role called **Muted**.");
    
    let params = msg.content.split(" ").slice(1);
    let time = params[1];
    if(!time) return msg.reply("Please specify an amount of time to mute the user for.")

  member.addRole(muteRole.id);
  msg.channel.send(`**${member.user.tag}** has been muted by **${member.author.tag}** for ${ms(ms(time), {long: true})}`);

  setTimeout(function() {

  }, ms(time));

    }
  
  if(command === "purge") {

    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
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


client.login(config.token)});
