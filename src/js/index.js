const API_KEY = '#';

/* Приходят объекты, из которых деструктуризируем results
и уже их используем в паре с шаблонизатором для создания разметки */

function getPopularMovies() {
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
    return fetch(url)
        .then(response => response.json())
        .then(({ results }) => {
            console.log(results);
        })
        .catch(console.log)
}

/* Приходят объекты, из которых деструктуризируем results 
и уже их используем в паре с шаблонизатором для создания разметки */

function getSpecificMovie(movieTitle) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieTitle}`;
    return fetch(url)
        .then(response => response.json())
        .then(({ results }) => {
            console.log(results);
        })
        .catch(console.log)
}

/* Приходит объект с описанием конкретного фильма */

function getMovieDescription(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
    return fetch(url)
        .then(response => response.json())
        .then(console.log)
        .catch(console.log)
}

