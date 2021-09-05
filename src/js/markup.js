export default function appendMoviesMarkUp(Refs, movies, tepmplate) {
  Refs.insertAdjacentHTML('beforeend', tepmplate(movies));
}
