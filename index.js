const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, movieAPIKey } = require('./config.json');
const voiceStateUpdateProcessor = require('./events/voiceStateUpdate.js');
const { join } = require('path');
const client = new Discord.Client();
client.commands = new Discord.Collection();

var vConnection;

client.on('ready', () => {
  console.log('Ready');
  client.user.setActivity("Online!");
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)){
    functionNotValid(message);
  }else{
    try {
      client.commands.get(command).execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply('Oops, I fucked up');
    }
  }
});


// Register events

client.on('voiceStateUpdate', (oldMember, newMember) => voiceStateUpdateProcessor(oldMember, newMember));


client.login(token);


function functionNotValid(message){
  if (message.member.voice.channel) {
    message.member.voice.channel.join().then(function(connection){
      const dispatcher = connection.play("C:/Users/AdamM/Dropbox/SkyNet/Random/JezSays-ThisFunctionisNotAvailable.wav");

      speaking = true;

      dispatcher.on('finish', () => {
        speaking = false;
        connection.disconnect();
      });

    }).catch(function(err){
      console.log(err)
    });
  }
  else{
    message.reply("I don't know how to do that :(");
  }
}