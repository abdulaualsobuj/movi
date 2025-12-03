import { getMovieReviewData } from "./data.js";
// console.log(getMovieReviewData());

let sortDes = false;

function init() {
  const movieReviewData = getMovieReviewData();
  registerHandlers(movieReviewData);
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
  const sorted = flatReviewData.toSorted((a, b) => b.on - a.on);
  const movieListElement = document.querySelector("#movielist UL");

  addMovieReviewData(movieListElement, sorted);
}

function registerHandlers(movieReviewData) {
  const sortButton = document.getElementById("sortBtn");
  const groupButton = document.getElementById("groupBtn");

  sortButton.addEventListener("click", () => sortByReview(movieReviewData));
  groupButton.addEventListener("click", () => groupReviewByTitle(movieReviewData)
  );
}
function sortByReview(movieReviewData) {
  // console.log("sortByReview");
  sortDes = !sortDes;
  const flatReviewData = movieReviewData.flat();

  let sortReviewData = sortDes
    ? flatReviewData.toSorted((a, b) => b.rating - a.rating)
    : flatReviewData.toSorted((a, b) => a.rating - b.rating);

  const movieListElement = document.querySelector("#movielist UL");
  removeAllChildNodes(movieListElement);

  addMovieReviewData(movieListElement, sortReviewData);
}
function groupReviewByTitle(movieReviewData) {
  // console.log("groupReviewByTitle", movieReviewData)
  const flatReviewData = movieReviewData.flat();
  const groupedRivews = Object.groupBy(flatReviewData, ({ title }) => title);
  const titlekeys = Reflect.ownKeys(groupedRivews);

  const movieListElement = document.querySelector("#movielist UL");

  removeAllChildNodes(movieListElement);

  titlekeys.forEach((title) => {
    const liElement = document.createElement("li");
    liElement.classList.add("card", "mx-3");
    const hElement = document.createElement("h2");
    hElement.classList.add("text-3xl");
    hElement.innerText = title;
    liElement.appendChild(hElement);

    const reviews = groupedRivews[title];
    reviews.forEach((review) => {
      const peraElement =document.createElement("p");
      peraElement.classList =("mx-2", "my-2");
      
      const message  =`👍<strong>${review.by}</strong> has given <strong>${review.rating}</strong> rating with a comment <i>${review.content}</i>`;
      peraElement.innerHTML = message;
      liElement.appendChild(peraElement);
    })

    movieListElement.appendChild(liElement);
  });
} 

function addMovieReviewData(movieListElement, movieRevie) {
  // console.log(movieListElement);

  movieRevie.map((movie) => {
    // console.log(movie);

    const liElement = document.createElement("li");
    liElement.classList.add("card", "p-2");

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
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

init();
