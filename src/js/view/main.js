const main = () => {
  // Initial Values
  const image_url = "https://image.tmdb.org/t/p/w500";
  const home = document.querySelector('#home-wrapper');
  const detail = document.querySelector('#detail-wrapper');
  const closeDetail = document.querySelector('#close-detail');
  const detailMovie = document.querySelector('.detail-movie');
  const searchBtn = document.querySelector('#searchMovie');
  const searchArea = document.querySelector('.search-movies');

  const dataSource = DataSource();


  const loadMore = document.querySelector('button.load-more')

  const genUrl = (path) => { return `https://api.themoviedb.org/3${path}?api_key=d1652561088b0bfb65a956144d4073cf`; }

  function fetchApi(url, onSuccess, onFailed) {
    fetch(url)
      .then(res => res.json())
      .then(onSuccess)
      .catch(onFailed);
  }

  const errorHanlder = (error) => { return "Error: " + error; };

  function getDiscover(page) {
    const path = "/discover/movie";
    const url = `${genUrl(path)}&page=${page}`;
    fetchApi(url, renderMovie, errorHanlder);
  }

  function getDetail(movieId) {
    const path = `/movie/${movieId}`;
    const url = genUrl(path);
    fetchApi(url, renderDetail, errorHanlder);

  }

  function searchMovie(keyword) {
    const path = "/search/movie";
    const url = `${genUrl(path)}&query=${keyword}`;
    fetchApi(url, renderSearch, errorHanlder);
  }

  function renderSearch(movies) {
    const results = movies.results;
    results.map(search);
  }
  
  function renderMovie(movies) {
    const results = movies.results;
    results.map(movieItem);
  }

  function renderDetail(movieId) {
    detailMovie.innerHTML = '';

    const row = document.createElement('div');
    row.classList = 'row my-5';

    const colImg = document.createElement('div');
    colImg.classList = 'col-md-3';

    const img = document.createElement('img');
    img.classList = 'img img-fluid';
    img.src = image_url + movieId.poster_path;

    const detail = document.createElement('div');
    detail.classList = 'col-md d-flex flex-column';

    const genre = movieId.genres.map(genre => " " + genre.name);
    const production = movieId.production_companies.map(production => " " + production.name);

    detail.innerHTML += `
      <div>
        <h2 class="text-title">${movieId.title}</h2>
        <div class="row">
          <p class="release-date col-md"><span class="h5">Release Date :</span> <br/>${movieId.release_date}</p>
          <p class="genres col-md"><span class="h5">Genres :</span> <br/>${genre}</p>
        </div>
        <p class="genres"><span class="h5">Production Companies :</span> <br/>${production}</p>
        <p class="overview"><span class="h5">Overview :</span> <br/> ${movieId.overview}</p>
      </div>
    `;

    row.appendChild(colImg);
    colImg.appendChild(img)

    row.appendChild(detail);

    detailMovie.appendChild(row);
  }

  function search(movie) {
    if(movie.poster_path){
      const movieItem = document.createElement('div');
      movieItem.classList = 'movie col-sm-2 p-0';
  
      const info = document.createElement('div');
      info.classList = 'info';
      info.setAttribute('data-movie-id', movie.id)
  
      const judul = document.createElement('h5');
      judul.classList = 'judul p-2';
      judul.innerText = movie.title
      judul.setAttribute('data-movie-id', movie.id)
  
      const release = document.createElement('p');
      release.classList = 'lead';
      release.innerText = movie.release_date;
  
      const img = document.createElement('img');
      img.classList = 'img img-fluid';
      img.src = image_url + movie.poster_path;
      
      info.appendChild(judul)
      info.appendChild(release)
  
      movieItem.appendChild(img);
      movieItem.appendChild(info);
  
  
      searchArea.appendChild(movieItem);
    }

  }
  
  function movieItem(movie) {
    if(movie.poster_path){

      const discoverElement = document.querySelector('.discover-movies');
      const movieItem = document.createElement('div');
      movieItem.classList = 'movie col-sm-2 p-0';
  
      const info = document.createElement('div');
      info.classList = 'info';
      info.setAttribute('data-movie-id', movie.id)
  
      const judul = document.createElement('h5');
      judul.classList = 'judul p-2';
      judul.innerText = movie.title
      judul.setAttribute('data-movie-id', movie.id)
  
      const release = document.createElement('p');
      release.classList = 'lead';
      release.innerText = movie.release_date;
  
      const img = document.createElement('img');
      img.classList = 'img img-fluid';
      img.src = image_url + movie.poster_path;
  
      info.appendChild(judul)
      info.appendChild(release)
  
      movieItem.appendChild(img);
      movieItem.appendChild(info);
  
  
      discoverElement.appendChild(movieItem);
    }
  }

  getDiscover();
  let page = 1;
  loadMore.addEventListener('click', function () {
    page++;
    getDiscover(page)
  });

  home.addEventListener('click', function (e) {
    const target = e.target;
    if (target.classList.contains('info')) {
      if (target.dataset.movieId) {
        const movieId = target.dataset.movieId;
        detail.classList.remove('d-none');
        getDetail(movieId)
      }
    }
  });

  searchBtn.addEventListener('click', function () {
    searchArea.innerHTML = '';
    const searchVal = document.querySelector('#search-form').value;
    searchMovie(searchVal);
    const secTitle = document.querySelector('#search-title');
    if(searchVal != ''){
      secTitle.classList.remove('d-none');
    } else {
      secTitle.classList.add('d-none');
    }
  })

  closeDetail.addEventListener('click', function () {
    detail.classList.add('d-none');
  })
}

export default main;