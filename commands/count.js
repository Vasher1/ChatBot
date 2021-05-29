const fs = require('fs');

module.exports = {
	name: 'count',
	description: 'Prints the count of jez words',
	execute(message) {
		fs.readFile("stats.json", function (error, content) {
            var data = JSON.parse(content);

            message.author.send(`Current total of chatisms... \n Boring : ${data.Boring} \n Nothing : ${data.Nothing} \n Fuck : ${data.Fuck} \n Cunt : ${data.Cunt} \n Angon : ${data.Angon} \n What : ${data.What} \n Consistently : ${data.Consistently}`)
        });
	},
};