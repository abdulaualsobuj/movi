import { getMovieReviewData } from "./data.js";
console.log(getMovieReviewData());

function init() {
  const movieReviewData = getMovieReviewData();
  paintStatistics(movieReviewData);
  paintMovieData(movieReviewData);
}
function paintStatistics(movieReviewData) {
  const flatReviewData = movieReviewData.flat();
  const totalMovies = movieReviewData.length;
  const totalReviews = flatReviewData.length;
  const totalRating = flatReviewData.reduce((acc, item) => {
    return acc + item.rating;
  }, 0);
  const avrageRating = (totalRating / totalReviews).toFixed(2);

  const totalmoviesElement = document.getElementById("totalMovie");
  addstat(totalmoviesElement, totalMovies);

  const avrageRatingElement = document.getElementById("avrageRating");
  addstat(avrageRatingElement, avrageRating);

  const totalReviewsElement = document.getElementById("totalReview");
  addstat(totalReviewsElement, totalReviews);

  function addstat(elem, value) {
    const spanElement = document.createElement("span");
    spanElement.classList.add("text-6xl");
    spanElement.innerText = value;
    elem.appendChild(spanElement);
  }
}

function paintMovieData(movieReviewData) {
  const flatReviewData = movieReviewData.flat();
  const movieListElement = document.querySelector("#Movielist UL");
  console.log(movieListElement);

  flatReviewData.map((movie) => {
    console.log(movie);

    const liElement = document.createElement("li");
    liElement.classList.add("card", "p-2", );

    const titleElement = document.createElement("p");
    titleElement.classList.add("text-xl", "mb-2");
    titleElement.innerText = `${movie.title} - ${movie.rating}`;
    liElement.appendChild(titleElement);
    movieListElement.appendChild(liElement);

    const reviewElement = document.createElement("p");
    reviewElement.classList.add("mx-2", "mb-2");
    reviewElement.innerText = movie.content;
    liElement.appendChild(reviewElement);
    movieListElement.appendChild(liElement);

    const byElement = document.createElement("p");
    byElement.classList.add("mx-2", "mb-2");
    byElement.innerText = `${movie.by} on ${new Intl.DateTimeFormat(
      "en-BN"
    ).format(movie.on)}`;
    liElement.appendChild(byElement);
    movieListElement.appendChild(liElement);
  });
}
init();
