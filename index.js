const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const voiceStateUpdateProcessor = require('./events/voiceStateUpdate.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

var vConnection;

// Load command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Register events

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName  = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
  || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command){
    return functionNotValid(message);
  }

  if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
  }
  
  try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
    message.reply('Oops, I fucked up');
	}
});

client.on('voiceStateUpdate', (oldMember, newMember) => voiceStateUpdateProcessor(oldMember, newMember));

client.login(token);

// Error function

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