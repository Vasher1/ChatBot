module.exports = {
    name: 'countdown',
    description: 'Plays countdown',
    async execute(message) {
        if (message.member.voice.channel) {

            message.member.voice.channel.join().then(function (connection) {
                const dispatcher = connection.play('C:/Users/AdamM/Dropbox/SkyNet/Random/JezSays-EhhhSaythatagainOkayGo.wav');

                speaking = true;

                dispatcher.on('finish', () => {
                    speaking = false;
                    connection.disconnect();
                });

            }).catch(function (err) {
                console.log(err)
            });
        }
    },
};