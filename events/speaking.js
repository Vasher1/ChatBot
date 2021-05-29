const fs = require('fs');
const speech = require('@google-cloud/speech');
const speechClient = new speech.SpeechClient();
const { Readable } = require('stream');
const SILENCE_FRAME = Buffer.from([0xF8, 0xFF, 0xFE]);

module.exports = function speakingProcessor(user, speaking){
    if(speaking && user.id === "346738058806296577"){
        const audio = vConnection.receiver.createStream(user, { mode: 'pcm' });

        let fileName = Math.random().toString(36).substring(7);

        audio.pipe(fs.createWriteStream(fileName.toString()))

        audio.on('finish', function(){
          if(fs.statSync(fileName).size){
            transcribeAudioFile(fileName, user)

            vConnection.play(new Silence(), { type: 'opus' });
          } else{
            fs.unlinkSync(fileName)
          }
        })
    }
}


async function transcribeAudioFile(filename, user){      
  /**
  * Note that transcription is limited to 60 seconds audio.
  * Use a GCS file for audio longer than 1 minute.
  */
  const audio = {
    content: fs.readFileSync(filename).toString('base64'),
  };

  const speechContext = {
    phrases: ['$TIME'],
  };
 
  const request = {
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: 44100,
      languageCode: 'en-CA',
      audioChannelCount: 2,
      speechContext: ['boring', 'nothing', 'fuck', 'cunt', 'angon', 'what', 'consistently']
    },
    interimResults: false, // If you want interim results, set this to true,
    audio: audio
  };

  // Detects speech in the audio file. This creates a recognition job that you
  // can wait for now, or get its result later.
  const [operation] = await speechClient.longRunningRecognize(request);
 
  // Get a Promise representation of the final result of the job
  const [response] = await operation.promise();
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');

  if(transcription){
    console.log(`Transcription: ${transcription}`);

    //user.client.channels.cache.get('393476127005474828').send(transcription)

    fs.readFile("stats.json", function (error, content) {
      var data = JSON.parse(content);

      if(transcription.toUpperCase().includes("BORING")){
        data.Boring++
      }

      if(transcription.toUpperCase().includes("NOTHING")){
        data.Nothing++
      }

      if(transcription.toUpperCase().includes("FUCK")){
        data.Fuck++
      }

      if(transcription.toUpperCase().includes("CUNT")){
        data.Cunt++
      }

      if(transcription.toUpperCase().includes("ANGON")){
        data.Angon++
      }

      if(transcription.toUpperCase().includes("WHAT")){
        data.What++
      }

      if(transcription.toUpperCase().includes("CONSISTENTLY")){
        data.Consistently++
      }

      const string = JSON.stringify(data);

      fs.writeFile('stats.json', string, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
      });

    });
  }

  fs.unlinkSync(filename)
}
  
class Silence extends Readable {
  _read() {
    this.push(SILENCE_FRAME);
    this.destroy();
  }
}
