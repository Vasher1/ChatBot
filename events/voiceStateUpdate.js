const { Readable } = require('stream');
const SILENCE_FRAME = Buffer.from([0xF8, 0xFF, 0xFE]);
var speaking = false;

module.exports = async function voiceStateUpdateProcessor(oldState, newState){
  if(speaking) return;

  if(!oldState.channelID){       // someone joined voice chat      

      if(newState.id !== "756202508958826586"){
        newState.member.voice.channel.join().then(function(connection){
          
          connection.play(new Silence(), { type: 'opus' });

          const dispatcher = connection.play(GetGreeting(newState.id));
  
          speaking = true;
  
          dispatcher.on('finish', () => {
            speaking = false;
            connection.disconnect();
          });
  
        }).catch(function(err){
          console.log(err)
        });
      }

  } else if (newState.channelID && newState.channelID != oldState.channelID){ // someone moved channels
  
  }
}

function GetGreeting(id){
  switch(id){
    case '132370382329085953': // adam
      return 'C:/Users/AdamM/Dropbox/SkyNet/Greetings/HeavenlyChoir.ogg'
    case '339849283270475776': // tom
      return 'C:/Users/AdamM/Dropbox/SkyNet/Greetings/JezSaying-WTFDOYOUWANTUIRRITAITINGFUCKER.wav'
    case '346738058806296577': // kevin
      return 'C:/Users/AdamM/Dropbox/SkyNet/Greetings/geese.ogg'
    default:
      return 'C:/Users/AdamM/Dropbox/SkyNet/Greetings/JezAsks-HowWasYourDay.wav'
  }
}

/*
    case'252924625212801024': // ben

    case '692495156770766859': // eleni
    
    case '147544425575219200': // roo

    case '346738480040247297': // marina

    case '393482616147279872': // sky
*/


class Silence extends Readable {
  _read() {
    this.push(SILENCE_FRAME);
    this.destroy();
  }
}