const main = () => {
  // Initial Values
  const image_url = "https://image.tmdb.org/t/p/w500";

  const reqApi = (path) => { return `https://api.themoviedb.org/3${path}?api_key=d1652561088b0bfb65a956144d4073cf`; }
  fetch(reqApi("/discover/movie"))
    .then(res => res.json())
    .then(movies => {
      console.log("Movies: ", movies);
    })
    .catch(error => console.log("Error: ", error));


}

export default main;