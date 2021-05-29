module.exports = {
	name: 'leave',
	description: 'Leaves the voice channel',
	async execute() {
		if (vConnection) {

			console.log("leaving voice chat")

            vConnection.disconnect();
        }
	},
};