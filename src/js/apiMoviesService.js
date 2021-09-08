import Refs from './refs';

const API_KEY = '74b3d185775f996114b8f83bcbb83c33';
const BASE_URL = 'https://api.themoviedb.org/3/';

export default class FetchMovieApi {
  constructor() {
    this.searchQuery = '';
    this.initialPage = 1;
    // this.currentPage = this.initialPage;
  }

  // ==========  By Genres  ==========
  async fetchGenres() {
    const url = `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`;
    try {
      const response = await fetch(url);
      const { genres } = await response.json();
      return genres;
    } catch (error) {
      console.log(error);
    }
  }

  // ==========  By Trend  ==========
  async fetchTrendingMovies(currentPage = 1) {
    try {
      const url = `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${currentPage}`;
      const response = await fetch(url);
      const { results, total_pages} = await response.json();
      Refs.totalPagesButton.innerHTML = total_pages;
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  // ==========  By Keyword  ==========
  async fetchMoviesByKeyWord(query, currentPage = 1) {
    const url = `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=${currentPage}&include_adult=false`;
    try {
      const response = await fetch(url);
      const { results, total_pages } = await response.json();
      Refs.totalPagesButton.innerHTML = total_pages;
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  // ==========  By ID  ==========
  async fetchMoviesById(id) {
    const url = `${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return {
        id: data.id,
        title: data.original_title,
        genres: data.genres.slice(0, 2).map(({ name }) => name),
        about: data.overview,
        popularity: data.popularity,
        vote: data.vote_average,
        votes: data.vote_count,
        release: data.release_date.substring(0, 4),
        poster_path: data.poster_path,
      };
    } catch (error) {
      console.log(error);
    }
  }

  resetPage() {
    this.currentPage = 1;
  }

  incrementPage() {
    this.currentPage += 1;
  }

  decrementPage() {
    this.currentPage -= 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
