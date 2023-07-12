const searchMovieForm = document.querySelector("#searchForm");

searchMovieForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = document.querySelector("#searchMovie");
  fetchMovieData(search.value);
  search.value = "";
});

const fetchMovieData = async (search) => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${search}&apikey=b9629df5`
    );
    const data = await response.json();
    cloneMovieData(data.Search);
  } catch (error) {
    const parentCard = document.querySelector(".cards-parent");
    parentCard.innerHTML = "<h1>Oops...Not found!</h1>";
  }
};

const cloneMovieData = (movies) => {
  const parentCard = document.querySelector(".cards-parent");
  const movieCardTemplate = document.querySelector("#movie-card-template");
  parentCard.innerHTML = "";

  movies.map((movie) => {
    if (movie.Poster === "N/A") return;
    const cardClone = movieCardTemplate.content.cloneNode(true); //for deep cloning nodes
    makeCard(cardClone, movie);
    parentCard.appendChild(cardClone);
  });
};

const makeCard = (cardClone, movie) => {
  const cardImg = cardClone.querySelector(".card-image");
  const cardTitle = cardClone.querySelector("#title span");
  const cardYear = cardClone.querySelector("#year span");
  const cardType = cardClone.querySelector(".movie-type span");

  cardImg.src = movie.Poster;
  cardTitle.innerHTML = movie.Title;
  cardYear.innerHTML = movie.Year;
  cardType.innerHTML = movie.Type.toUpperCase();
};
