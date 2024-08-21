export const api_key = "7b2b0ce79ea5fa6bf7c46a036b67236c";
export const base_url = "https://api.themoviedb.org/3";

// templates
// - movie card
export function movieCard(img, title, desc, movieId, watchLater) {

    // Determine the icon class based on whether the movie is in watchLater
    let watchLaterIconClass = watchLater.includes(movieId) ? 'bi-x' : 'bi-plus';
    let watchLaterTitle = watchLater.includes(movieId) ? 'Remove from Watch Later' : 'Add to Watch Later';

    return `
        <img src="https://image.tmdb.org/t/p/w500${img}" alt="${title}" class="w-full" />
        <div class="movie-info p-2">
            <div>
                <i class="favourite bi bi-heart hidden mr-2 cursor-pointer" title="favourite"></i>
                <i title="${watchLaterTitle}" class="watch_later_add_remove_btn text-xl bi ${watchLaterIconClass} cursor-pointer" data-movie-id="${movieId}"></i>    
            </div>
            <div class="movie-title text-lg font-bold text-white overflow-hidden">${title}</div>
            <p class="description text-gray-400 overflow-hidden">${desc}</p>
            <button class="watch-now text-blue-500 text-sm cursor-pointer">Watch Now >></button>
        </div>
    `;
}





// template to show single movie
export function singleMovieCard(title='unknown movie', desc='good movie', genres = "Unknown Genre", date="01/01/2000") {
  // Generate the HTML for the genres
  const genresHtml = genres
    .map(
      (genre) =>
        `<div class="my-1 border-[1px] w-fit rounded-md border-[#4e0bec] px-2 capitalize text-[12px] sm:text-[14px]">
            ${genre}
        </div>`
    )
    .join(""); // Join the array into a single string

  return `
        <div class="w-full sm:w-1/2 relative">
            <video class="w-full" src="./assets/video.mp4" controls></video>
        </div>
        <div class="w-full sm:w-1/2">
            <h1 class="text-sm sm:text-xl font-bold mb-1 capitalize">${title}</h1>
            <div><i class="favourite bi-heart mr-2 cursor-pointer"></i><i class="add_to_watch_later text-xl bi bi-plus cursor-pointer"></i></div>
            <div class="flex flex-row gap-2 flex-wrap">
                ${genresHtml} <!-- Inject the generated genres HTML here -->
            </div>
            <div class="text-[12px] sm:text-[14px]"><strong>Release at : </strong>${date}</div>
            <p class="text-justify capitalize text-[12px] sm:text-[14px] mt-1 text-gray-400 pr-2">
                <strong class="text-white">description : </strong>${desc}
            </p>
        </div>
    `;
}




// - template watch later movie card
export function watchlatermovieCard(img, title, desc) {
    return `
        <img src="https://image.tmdb.org/t/p/w500${img}" alt=${title} class="w-full" />
        <div class="movie-info p-2">
            <div><i class="favourite bi-heart hidden mr-2 cursor-pointer" title="favourite"></i><i title="Remove from Watch Later" class="remove_from_watch_later text-xl bi bi-x cursor-pointer"></i></div>
            <div class="movie-title text-lg font-bold text-white overflow-hidden">${title}</div>
            <p class="description text-gray-400 overflow-hidden">${desc}</p>
            <button class="watch-now text-blue-500 text-sm cursor-pointer">Watch Now >></button>
        </div>
    `;
}


// template to show movie in history
export function historyCard(title, desc, img){
    return`
        <div class="flex flex-row gap-2">
            <img class="w-32 sm:w-48" src="https://image.tmdb.org/t/p/w500${img}" alt=${title}>
            <div>
                <h1 class="movie-title font-bold">${title}</h1>
                <p class="description text-gray-400 overflow-hidden text-[13px] sm:text-sm">${desc}</p>
            </div>
        </div>
        <div class="w-full sm:w-fit">
            <button class="remove_from_history float-end rounded-lg cursor-pointer bg-red-500 px-2 sm:px-6 py-0.5 text-[13px] sm:text-sm sm:py-1">Remove</button>
        </div>
    `;
}