module.exports = {
    name: 'boo',
    description: 'Plays boo',
    async execute(message) {
        if (message.member && message.member.voice.channel) {
            message.member.voice.channel.join().then(function (connection) {
                const dispatcher = connection.play('C:/Users/AdamM/Dropbox/SkyNet/Random/JezGoesBOOO.wav');

                speaking = true;

                dispatcher.on('finish', () => {
                    speaking = false;
                    connection.disconnect();
                });

            }).catch(function (err) {
                console.log(err)
            });
        } else {
            message.reply("Boo!");
        }
    },
};