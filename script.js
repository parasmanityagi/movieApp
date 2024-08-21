/*
============================================================================================
// Toggle User Menu
// Toggles visibility of the user menu and closes it when clicking outside
============================================================================================
*/
let usernameDiv = document.querySelector(".username");
let menu = document.querySelector(".menu");


let closeMenuOnClickOutside = (event) => {
  if (!menu.contains(event.target) && !usernameDiv.contains(event.target)) {
    menu.classList.add("hidden");
  }
};

usernameDiv.addEventListener("click", () => menu.classList.toggle("hidden"));
document.addEventListener("click", closeMenuOnClickOutside);


/*
============================================================================================
// Toggle Home Page , Movie Page , Watch Later Page and History page
// Switches between the homepage , the movie page , the watch later page , the history page
============================================================================================
*/
let homePage = document.querySelector(".homepage");
let backBtn = document.querySelector(".back_btn");
let moviePage = document.querySelector(".movie_page");
let movieDiv = document.querySelector(".movie_div");
let watchLaterPage = document.querySelector('.watch_later')
let watchlaterOpenBtn = document.querySelector('.bi-film').parentElement;
let watchLaterBackbtn = document.querySelector('.watch_later').children[0].children[0];
let openHistory = document.querySelector('.history_btn');
let historyPage = document.querySelector('.history')
let closeHistory = document.querySelector('.history').children[0].children[0];

watchlaterOpenBtn.addEventListener('click', () => {
  if (!homePage.classList.contains('hidden')) homePage.classList.add("hidden");
  if (!moviePage.classList.contains('hidden')) moviePage.classList.add("hidden");
  if (!historyPage.classList.contains('hidden')) historyPage.classList.add("hidden");
  if (watchLaterPage.classList.contains('hidden')) watchLaterPage.classList.remove("hidden");
  closeMenuOnClickOutside('');
  showWatchlater();
})

watchLaterBackbtn.addEventListener("click", () => {
  if (homePage.classList.contains('hidden')) homePage.classList.remove("hidden");
  if (!moviePage.classList.contains('hidden')) moviePage.classList.add("hidden");
  if (!historyPage.classList.contains('hidden')) historyPage.classList.add("hidden");
  watchLaterPage.classList.add("hidden");
});

backBtn.addEventListener("click", () => {
  if (homePage.classList.contains('hidden')) homePage.classList.remove("hidden");
  moviePage.classList.add("hidden");
  if (!watchLaterPage.classList.contains('hidden')) watchLaterPage.classList.add("hidden");
  if (!historyPage.classList.contains('hidden')) historyPage.classList.add("hidden");
});

openHistory.addEventListener('click', () => {
  if (!homePage.classList.contains('hidden')) homePage.classList.add("hidden");
  if (!moviePage.classList.contains('hidden')) moviePage.classList.add("hidden");
  if (!watchLaterPage.classList.contains('hidden')) watchLaterPage.classList.add("hidden");
  if (historyPage.classList.contains('hidden')) historyPage.classList.remove('hidden');
  closeMenuOnClickOutside('');
  showHistory();
})

closeHistory.addEventListener('click', () => {
  if (homePage.classList.contains('hidden')) homePage.classList.remove("hidden");
  if (!moviePage.classList.contains('hidden')) moviePage.classList.add("hidden");
  if (!watchLaterPage.classList.contains('hidden')) watchLaterPage.classList.add("hidden");
  if (!historyPage.classList.contains('hidden')) historyPage.classList.add('hidden');
  closeMenuOnClickOutside('');
})


/*
============================================================================================
// Fetch , Show All Movies and add event listeners to "Watch Now" buttons
// Fetches movies from the API and displays them on the homepage
============================================================================================
*/
import { api_key, base_url, historyCard, movieCard, singleMovieCard, watchlatermovieCard } from "./dotenv.js";
let movies = JSON.parse(localStorage.getItem("movies")) || [], genres = JSON.parse(localStorage.getItem("genres")) || [],
  watchLater = JSON.parse(localStorage.getItem("watchLater")) || [], history = JSON.parse(localStorage.getItem("history")) || [],
  storeSearch = JSON.parse(localStorage.getItem("storeSearch")) || [];
const fetchAllMovies = async () => {
  try {
    let response = await fetch(`${base_url}/discover/movie?api_key=${api_key}`);
    let movies = await response.json();
    localStorage.setItem("movies", JSON.stringify(movies.results));
    return movies.results;
  } catch (error) {
    console.error("Error fetching all movies:", error);
  }
};

if (movies.length === 0) {
  movies = await fetchAllMovies();
}

async function showAllMovies(movies) {
  let movieDisplay = document.querySelector(".movie-list");
  movieDisplay.innerHTML = '';
  if (movies.length === 0) {
    let moviesHtml = document.createElement("div");
    moviesHtml.classList.add('bg-gray-800', 'rounded-lg', 'flex', "justify-center", 'items-center', 'shadow-lg', 'w-48', 'h-64');
    moviesHtml.innerHTML = `No Results Found!`;
    movieDisplay.appendChild(moviesHtml);
  }

  movies.forEach(data => {
    let moviesHtml = document.createElement("div");
    moviesHtml.setAttribute('id', data.id);
    moviesHtml.classList.add('movie-item', 'bg-gray-800', 'rounded-lg', 'overflow-hidden', 'shadow-lg', 'w-48', 'h-64');
    moviesHtml.innerHTML = movieCard(data.backdrop_path, data.title, data.overview, data.id, watchLater);
    movieDisplay.appendChild(moviesHtml);
  });

  addWatchNowListeners();
  addToWatchLaterListeners();
}
showAllMovies(movies);


// Function to add event listeners to "Watch Now" buttons
function addWatchNowListeners() {
  const watchNowButtons = document.querySelectorAll(".watch-now");
  watchNowButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const movieId = event.target.closest(".movie-item").getAttribute("id");
      if (!homePage.classList.contains('hidden')) homePage.classList.add('hidden');
      if (!watchLaterPage.classList.contains('hidden')) watchLaterPage.classList.add('hidden');
      moviePage.classList.remove('hidden');
      showSingleMovie(movieId);
    });
  });
}





/*
============================================================================================
// Toggle Genre Selection and Filter Movies by Genre
// This function allows users to toggle the selection of genres. When a genre is selected, it filters and displays the movies associated with that genre. 
// If the genre is unselected, it displays all movies.
============================================================================================
*/
const toggleGenreSelection = () => {
   let genresTags = document.querySelectorAll(".slide");
  let activeGenreId = null, activeGenreName = null;

  genresTags.forEach((tag, idx) => {
    tag.addEventListener("click", () => {
      // If there's already an active genre, remove its active styles
      if (activeGenreId !== null && activeGenreName !== null) {
        genresTags[activeGenreId].classList.remove("bg-red-700");
        genresTags[activeGenreId].classList.add("hover:bg-violet-700");
      }

      // If the clicked genre is the same as the active one, deactivate it
      if (activeGenreId === idx && activeGenreName === genresTags[idx].textContent) {
        activeGenreId = null;
        activeGenreName = null;
        showAllMovies(movies);
      } else {
        // Otherwise, set the clicked genre as the active one
        tag.classList.add("bg-red-700");
        tag.classList.remove("hover:bg-violet-700");
        activeGenreId = idx;
        activeGenreName = tag.textContent;

        let filterGenre = genres.filter(({ name }) => name == activeGenreName);
        let filteredGenreId = filterGenre[0].id;

        let filteredMovies = movies.filter(({ genre_ids }) => {
          return genre_ids.includes(filteredGenreId)
        });
        showAllMovies(filteredMovies)
      }
    });


  });
};




/*
============================================================================================
// Fetch and Show Genres
// Fetches genres from the API and displays them in a carousel
============================================================================================
*/
async function fetchGenre() {
  try {
    let response = await fetch(
      `${base_url}/genre/movie/list?api_key=${api_key}`
    );
    let genres = await response.json();
    localStorage.setItem("genres", JSON.stringify(genres.genres));
    return genres.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
}
if (genres.length === 0) {
  genres = await fetchGenre();
}


(async function showGenres() {
  let genresDisplay = document.querySelector(".slides");

  genres.forEach((data) => {
    let genresHtml = document.createElement("div");
    genresHtml.setAttribute("id", data.id);
    genresHtml.classList.add("slide", "hover:bg-violet-700");
    genresHtml.innerHTML = data.name;
    genresDisplay.appendChild(genresHtml);
  });


  toggleGenreSelection();

})();






/*
============================================================================================
// Show Single Movie
// Displays detailed information about a selected movie
============================================================================================
*/
let searchedMovie = [];
async function showSingleMovie(id) {
  moviePage.classList.remove("hidden");
  if (!homePage.classList.contains('hidden')) homePage.classList.remove("hidden");
  if (!watchLaterPage.classList.contains('hidden')) watchLaterPage.classList.add("hidden");
  if (!historyPage.classList.contains('hidden')) historyPage.classList.add("hidden");

  let movie = movies.find((movie) => movie.id == id);
  if (!movie && searchedMovie) {
    movie = searchedMovie;
  }

  let movieGenres = movie.genre_ids.map((genreId) => {
    let genre = genres.find((g) => g.id == genreId);
    return genre ? genre.name : null;
  }).filter(Boolean);

  let movieDisplay = document.createElement('div');
  movieDisplay.classList.add('movie-display', 'flex', 'flex-col', 'sm:flex-row', 'gap-4', 'pt-3', 'px-2', 'sm:px-0');
  movieDisplay.innerHTML = singleMovieCard(movie.title, movie.overview, movieGenres, movie.release_date);

  movieDiv.innerHTML = "";
  movieDiv.appendChild(movieDisplay);
  storeHistory(parseInt(id), 10);
}


/*
============================================================================================
// Fetch Movies by Title
// Fetches movies by title from the API
============================================================================================
*/
const fetchMoviesByTitle = async (title) => {
  try {
    title = title.replaceAll(' ', '+')
    let response = await fetch(`${base_url}/search/movie?query=${title}&api_key=${api_key}`);
    let result = await response.json();
    return result.results;
  } catch (error) {
    console.error("Error fetching movies by title:", error);
  }
};


/*
============================================================================================
// Toggle Search Result
// Toggles the visibility of the search result panel based on the search input
============================================================================================
*/
let searchResult = [];
let searchBtn = document.querySelectorAll(".bi-search");
let searchResultDiv = document.querySelectorAll(".search_result");
let searchDivId = 0;
let previousElement;

searchBtn.forEach((btn, idx) => {
  btn.addEventListener('click', async () => {
    previousElement = btn.previousElementSibling;
    let title = previousElement.value;
    let div = searchResultDiv[idx];
    searchDivId = idx;

    searchResult = await fetchMoviesByTitle(title);
    if (previousElement && previousElement.value !== '' && searchResult.length !== 0) {
      showSearchResult()
      div.classList.remove("hidden")
    } else if (previousElement && previousElement.value !== '' && searchResult.length == 0) {
      searchResult = [{ title: "no search result found" }];
      showSearchResult()
      div.classList.remove("hidden")
    }
  });
});


/*
============================================================================================
// Show Search Result
// Displays the search results and adds click event listeners for each result
============================================================================================
*/
async function showSearchResult() {
  searchResultDiv[searchDivId].innerHTML = "";

  const uniqueResults = [];
  const titles = new Set();

  searchResult.forEach((data) => {
    if (!titles.has(data.title)) {
      uniqueResults.push(data);
      titles.add(data.title);
    }
  });

  uniqueResults.forEach((data) => {
    let para = document.createElement('p');
    para.classList.add('hover:bg-gray-400', 'cursor-pointer', 'px-1', 'capitalize', 'overflow-hidden', 'movie-title');
    para.innerHTML = data.title;
    searchResultDiv[searchDivId].appendChild(para);
  });

  let para = searchResultDiv[searchDivId].querySelectorAll('p');
  para.forEach((tag, idx) => {
    tag.addEventListener('click', async () => {
      if (!tag.innerHTML.match(/No Search Result Found/gi)) {
        let result = await fetchMoviesByTitle(tag.innerHTML);
        storeSearchResult(result[0])
        homePage.classList.add("hidden");
        moviePage.classList.remove("hidden");
        searchResultDiv[searchDivId].classList.add("hidden");
        previousElement.value = '';
        searchedMovie = result[0];
        showSingleMovie(result[0].id)
      }
    })
  })
}




// store search result in local storage
function storeSearchResult(res) {
  let existingEntry = storeSearch.find(item => item.id === res.id);

  if (!existingEntry) {
    storeSearch.push( res );
  }

  localStorage.setItem("storeSearch", JSON.stringify(storeSearch));
};


// remove search result from local storage
function removeSearchResult(id){
  storeSearch = storeSearch.filter(item => item.id !== parseInt(id));
  localStorage.setItem("storeSearch", JSON.stringify(storeSearch));
}


// remove All search results from local storage
function removeAllSearchResult(){
  storeSearch = [];
  localStorage.removeItem("storeSearch");
}


/*
============================================================================================
// Close Search Result on Click Outside
// Closes the search result panel when clicking outside of it
============================================================================================
*/
let closeSearchResultDivOnClickOutside = (event) => {
  if (!searchResultDiv[searchDivId].contains(event.target)) {
    searchResultDiv[searchDivId].classList.add("hidden");
  }
};

document.addEventListener("click", closeSearchResultDivOnClickOutside);



// Additional Methods with Descriptions
/*
============================================================================================
// Store Movie in Watch Later plus icon functionality
============================================================================================
*/
function addToWatchLaterListeners() {
  let addToWatchLaterbtns = document.querySelectorAll('.watch_later_add_remove_btn')
  addToWatchLaterbtns.forEach((tag, idx) => {
    tag.addEventListener('click', () => {
      let movieId = tag.getAttribute('data-movie-id');
      if (tag.classList.contains('bi-plus')) {
        tag.setAttribute('title', 'Remove from Watch Later')

        tag.classList.remove('bi-plus');
        tag.classList.add('bi-x')

        addMovieToWatchLater(movieId);
      } else {
        tag.setAttribute('title', 'Add to Watch Later')

        tag.classList.remove('bi-x')
        tag.classList.add('bi-plus');

        removeMovieFromWatchLater(movieId)
      }

    })
  })
}




/*
==========================================================================================================
// Add Movie to Watch Later
// This method adds a movie ID to the 'watchLater' list 
// If the movie ID is already in the list, it will not be added again.
==========================================================================================================
*/
const addMovieToWatchLater = (movieId) => {
  let watchLater = JSON.parse(localStorage.getItem("watchLater")) || [];

  if (!watchLater.includes(parseInt(movieId))) {
    watchLater.push(parseInt(movieId));
    localStorage.setItem("watchLater", JSON.stringify(watchLater));
    showWatchlater();
  }
};

/*
==========================================================================================================
// Remove Movie from Watch Later
// This method removes a movie ID from the 'watchLater' list
// If the movie ID is not found in the list, no changes are made.
==========================================================================================================
*/
const removeMovieFromWatchLater = (movieId) => {
  let watchLater = JSON.parse(localStorage.getItem("watchLater"));

  if (watchLater.length !== 0) {
    watchLater = watchLater.filter(id => parseInt(id) !== parseInt(movieId));
    localStorage.setItem("watchLater", JSON.stringify(watchLater));
    showWatchlater();
  }
};



/*
==========================================================================================================
// Show Watch Later Movies
// This function displays movies that are in the 'Watch Later' list.
// It takes an optional 'watchLater' array and filters the main 'movies' list to show only those movies.
// If no movies are in the 'Watch Later' list, it displays a "No Results Found" message.
==========================================================================================================
*/
function showWatchlater() {
  let watchLater = JSON.parse(localStorage.getItem("watchLater")) || [];
  let filteredMovies = movies.filter(({ id }) => watchLater.includes(id));
  let movieDisplay = document.querySelector(".watch_later_div");
  movieDisplay.innerHTML = '';

  if (filteredMovies.length === 0) {
    let moviesHtml = document.createElement("div");
    moviesHtml.classList.add('bg-gray-800', 'rounded-lg', 'flex', "justify-center", 'items-center', 'shadow-lg', 'w-48', 'h-64');
    moviesHtml.innerHTML = `No Results Found!`;
    movieDisplay.appendChild(moviesHtml);
  } else {
    filteredMovies.forEach(data => {
      let moviesHtml = document.createElement("div");
      moviesHtml.setAttribute('id', data.id);
      moviesHtml.classList.add('movie-item', 'bg-gray-800', 'rounded-lg', 'overflow-hidden', 'shadow-lg', 'w-48', 'h-64');
      moviesHtml.innerHTML = watchlatermovieCard(data.backdrop_path, data.title, data.overview);
      movieDisplay.appendChild(moviesHtml);
    });
  }


  // eventlistener remove movie from watch later 
  let removeBtns = document.querySelectorAll('.remove_from_watch_later');
  removeBtnlistener(removeBtns);
}
showWatchlater();

// remove btns event listener
function removeBtnlistener(btns) {
  btns.forEach((tag, idx) => {
    tag.addEventListener('click', () => {
      let movieId = tag.parentElement.parentElement.parentElement.getAttribute('id');
      removeMovieFromWatchLater(movieId)
      let movie = document.querySelector(`.movie-item[id="${movieId}"]`);
      let removeTag = movie.getElementsByClassName('watch_later_add_remove_btn');
      removeTag[0].setAttribute('title', 'Add to Watch Later');
      removeTag[0].classList.remove('bi-x');
      removeTag[0].classList.add('bi-plus');
    })
  })
}



// ###############################################################################################################################################################
// Store History in local storage with movie ID and progress
// ###############################################################################################################################################################
function storeHistory(movieId, progress) {
  let existingEntry = history.find(item => item.id === movieId);

  if (existingEntry) {
    existingEntry.progress = progress;
  } else {
    let id = parseInt(movieId)
    history.push({ id, progress });
  }

  localStorage.setItem("history", JSON.stringify(history));
};


// show  history
function showHistory() {
  toggleClearAllBtn();
  let historyDisplay = document.querySelector('.history_div');
  historyDisplay.innerHTML = '';

  // Filter history items where the movieId exists in the movies array
  let items = movies.filter(movie =>
    history.some(historyItem => parseInt(historyItem.id) === movie.id)
  );

  items = items.concat(storeSearch)

  if (items.length === 0) {
    historyDisplay.innerHTML = `<div class="capitalize w-fit">No result found!</div>`;
  } else {
    items.forEach((item) => {
      let node = document.createElement('div');
      node.setAttribute('id', item.id);
      node.classList.add('flex', 'flex-col', 'sm:flex-row', 'border-[0.5px]', 'rounded-md', 'p-1', 'sm:p-2', 'w-full', 'justify-between', 'items-start', 'gap-2');
      node.innerHTML = historyCard(item.title, item.overview, item.backdrop_path);
      historyDisplay.appendChild(node);
    });
  }
  removeMovieBtnlistener();
}





// Remove a Single Movie from History
function removeMovieBtnlistener() {
  let btns = document.querySelectorAll('.remove_from_history');
  btns.forEach((tag, idx) => {
    tag.addEventListener('click', () => {
      let movieId = tag.closest('.border-\\[0\\.5px\\]').getAttribute('id');
      removeMovieFromHistory(movieId);
      removeSearchResult(movieId);
      showHistory();
    })
  })
}

const removeMovieFromHistory = (movieId) => {
  history = history.filter((item) => item.id !== parseInt(movieId));

  localStorage.setItem("history", JSON.stringify(history));
};



// Remove All Movies from History
let clearAll = document.querySelector('.remove_all_history');
function toggleClearAllBtn() { history.length == 0 ? clearAll.classList.add('hidden') : clearAll.classList.remove('hidden'); }
toggleClearAllBtn();
clearAll.addEventListener('click', () => {
  history = [];
  localStorage.removeItem("history");
  toggleClearAllBtn();
  removeAllSearchResult();
  showHistory();
})










