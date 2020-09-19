const fetch = require("node-fetch");
const { movieAPIKey } = require('../config.json');

module.exports = {
	name: 'movie',
	description: 'Selects a random movie to watch',
	async execute(message) {
        var maxId = await getMaxId();
        var skip = true;
        var movie;

        while(skip){
            movie = await getRandomMovie(getRandomInt(maxId));
            
            if(movie.original_language && movie.original_language.includes('en')){
                skip = false;
            }
        }

        message.channel.send(movie.original_title + "\n" + movie.overview + "\n" + `https://www.imdb.com/title/${movie.imdb_id}/`);
	},
};

async function getMaxId(){
    let latestMovie = await fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${movieAPIKey}&language=en-US`)
        .then((response) => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {                                                                                                                                                                                                                                                                                         
            console.error(error);
        });

    return latestMovie.id
}

async function getRandomMovie(id){
    return await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${movieAPIKey}&language=en-US`)
        .then((response) => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error(error);
        });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}