const speakingProcessor = require('../events/speaking.js');
const { Readable } = require('stream');
const SILENCE_FRAME = Buffer.from([0xF8, 0xFF, 0xFE]);

module.exports = {
	name: 'join',
	description: 'Joins the users voice channel',
	async execute(message) {
        if (message.member && message.member.voice.channel) {
            vConnection = await message.member.voice.channel.join();

			console.log("joining voice chat")

			vConnection.play(new Silence(), { type: 'opus' });

			vConnection.on('speaking', (user, speaking) => speakingProcessor(user, speaking))
        }
	},
};


class Silence extends Readable {
	_read() {
	  this.push(SILENCE_FRAME);
	  this.destroy();
	}
}