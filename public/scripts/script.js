document.getElementById('startButton').addEventListener('click', function () {
    const name = document.getElementById('nameInput').value;
    if (name.trim() === '') {
        alert('Please enter your name.');
        return;
    }

    // Hide the start section and show the quiz section
    document.getElementById('startSection').style.display = 'none';
    document.getElementById('quizSection').style.display = 'block';

    // Fetch movies and display the first question
    fetchMoviesAndDisplayQuestion();
});



function checkAnswer(selectedMovie, correctMovie) {
    if (selectedMovie.id === correctMovie.id) {
        alert('Correct! This is the oldest movie.');
    } else {
        alert('Incorrect. Try again!');
    }
}

async function fetchMoviesAndDisplayQuestion() {
    // Fetch movies specifically for the quiz
    const movies = await fetch('/quiz/movies').then(response => response.json());

    const questionText = document.getElementById('questionText');
    questionText.innerText = "Which of these movies is the oldest?";

    const movieOptions = document.getElementById('movieOptions');
    movieOptions.innerHTML = ''; // Clear previous options

    movies.forEach((movie, index) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.innerText = movie.title + " (" + movie.release_date + ")";
        button.addEventListener('click', () => checkAnswer(movie, movies[0]));
        li.appendChild(button);
        movieOptions.appendChild(li);
    });
}

