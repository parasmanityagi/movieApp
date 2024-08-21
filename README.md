# MovieApp

MovieApp is a web application that allows users to explore, manage, and track their favorite movies. With features like filtering by genre, adding movies to a watch later list, and maintaining a watch history, MovieApp offers a seamless and personalized experience for movie enthusiasts.


## [Live View](https://movie-app03.netlify.app/)



## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

## Features

- **Browse Movies by Genre**: Users can filter movies by genre and view a curated list based on their preferences.
- **Watch Later List**: Save movies to a watch later list and manage your movie-watching queue.
- **Watch History**: Automatically tracks and stores your watch history for easy access and review.
- **Responsive Design**: The app is fully responsive, providing a smooth experience on all devices, including desktops, tablets, and mobile phones.
- **Local Storage**: Data like watch history and watch later lists are stored in the browser's local storage, allowing persistence across sessions.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/parasmanityagi/movieApp.git
   ```
2. **Navigate to the Project Directory**:
   ```bash
   cd movieApp
   ```
3. **Open `index.html`**:
   Simply open `index.html` in your preferred web browser.

## Usage

1. **Browsing Movies**:
   - On the homepage, you can browse through a list of movies. Use the genre filter to narrow down your selection.

2. **Adding to Watch Later**:
   - Click the "+" icon on a movie card to add it to your watch later list. The icon will change to an "x" if the movie is already in the list.

3. **Viewing Watch History**:
   - Your watch history is automatically saved and can be accessed under the history section.

4. **Removing Movies**:
   - You can remove movies from the watch later list by clicking the "x" icon on the movie card. 

## Project Structure

```bash
movieApp/
│
├── assets/                 # Images, icons, and other assets
├── styles.css              # Main stylesheet
├── ├── script.js           # Main JavaScript file
│   └── dotenv.js           # Utility functions
├── index.html              # Main HTML file
├── README.md               # Project documentation
```

## Technologies Used

- **HTML5**: For structuring the content of the app.
- **CSS3**: For styling and responsive design.
- **JavaScript (ES6+)**: For dynamic content manipulation and local storage management.
- **Local Storage**: To persist user data like watch history and watch later lists across sessions.
- **TMDB API**: To fetch movie data.

