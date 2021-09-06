export default function appendMoviesMarkUp(Refs, movies, tepmplate) {
  Refs.innerHTML = tepmplate(movies);
}
