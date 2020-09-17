module.exports = {
	name: 'leave',
	description: 'Leaves the voice channel',
	async execute() {
		if (vConnection) {
            vConnection.disconnect();
        }
	},
};