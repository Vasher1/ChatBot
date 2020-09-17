var speaking = false;

module.exports = function voiceStateUpdateProcessor(oldState, newState){
  if(speaking) return;

  if(!oldState.channelID){       // someone joined voice chat      
      // check if they're in a list
      if(true){
        newState.member.voice.channel.join().then(function(connection){
          const dispatcher = connection.play('C:/Users/AdamM/Dropbox/SkyNet/Greetings/JezAsks-HowWasYourDay.wav');

          speaking = true;

          dispatcher.on('finish', () => {
            speaking = false;
            connection.disconnect();
          });
        }).catch(function(err){
          console.log(err)
        });
      };
  } else if (newState.channelID && newState.channelID != oldState.channelID){   // someone moved channels
  
  }
}