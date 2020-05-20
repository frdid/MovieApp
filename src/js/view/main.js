import '../component/movie-item.js';
const main = () => {
  // Initial Values
  const image_url = "https://image.tmdb.org/t/p/w500";

  const reqApi = (path) => { return `https://api.themoviedb.org/3${path}?api_key=d1652561088b0bfb65a956144d4073cf`; }
  fetch(reqApi("/discover/movie"))
    .then(res => res.json())
    .then(renderMovie)
    .catch(error => console.log("Error: ", error));

  function renderMovie(movies) {
    const results = movies.results;
    results.map(movieItem);
  }

  function movieItem(movie) {
    console.log(movie)
    const discoverElement = document.querySelector('.discover-movies');
    const movieItem = document.createElement('div');
    movieItem.classList = 'movie col-sm-2 p-0';
    movieItem.setAttribute('data-movie-id', movie.id)

    const info = document.createElement('div');
    info.classList = 'info';
    
    const judul = document.createElement('h3');
    judul.classList = 'judul';
    judul.innerText = movie.title

    const release = document.createElement('p');
    release.classList = 'lead';
    release.innerText = movie.release_date;

    const img = document.createElement('img');
    img.classList = 'img img-fluid';
    img.src = image_url + movie.poster_path;

    movieItem.appendChild(img);

    discoverElement.appendChild(movieItem);
  }

}

export default main;