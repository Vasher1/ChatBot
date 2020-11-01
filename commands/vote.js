const emojiCharacters = require('../emojiCharacters.js');

module.exports = {
	name: 'vote',
    description: 'Starts a vote with the options given',
    args: true,
	async execute(message, args) {
        var reactions = [];
        var reactionMessage;
        var seconds;
        //var question = args.shift;
        //message.channel.send(`Vote : ` +  question);

        message.channel.send(`Cast your vote by clicking the reactions below...`);

        if(!isNaN(args[args.length - 1])){
            seconds = args.pop();
        }

        await args.forEach((arg, i) => {
            message.channel.send((i + 1) + ") " + arg).then(sent => {
                if(i + 1 === args.length){
                    args.forEach((arg, i) => {
                        reactions.push({
                            emoji: emojiCharacters[i + 1],
                            votes: 0
                        })
                        sent.react(emojiCharacters[i + 1])
                        reactionMessage = sent;
                    });
                
                    if(seconds != 0){
                        sent.awaitReactions(filter, { time: seconds * 1000 })
                        .then(collected => {

                            collected.array().forEach(reaction => {
                                var match = reactions.filter(x => x.emoji == reaction.emoji.name)

                                if(match != null){
                                    match[0].votes = reaction.count
                                }
                            })
                            
                            var winningVote = reactions.sort(compare).pop()

                            if(reactions.every(x => x.votes == winningVote.votes)){
                                message.channel.send("Draw");
                            }
                            else{
                                message.channel.send(winningVote.emoji);
                            }
                        })
                        .catch(err => {
                            console.log("fucked up");
                        });
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
        });

        const filter = (reaction) => {
            var valid = reactions.filter(function(r) {
                return r.emoji === reaction.emoji.name
            })

            return valid.length != 0
        };
    }
}


function compare( a, b ) {
    if ( a.votes < b.votes ){
      return -1;
    }
    if ( a.votes > b.votes ){
      return 1;
    }
    return 0;
}