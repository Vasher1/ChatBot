module.exports = {
	name: 'join',
	description: 'Joins the users voice channel',
	async execute(message) {
		if (message.member.voice.channel) {
            vConnection = await message.member.voice.channel.join();
        }
	},
};