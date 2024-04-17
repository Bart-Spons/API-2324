// This script is for the quiz
// Current only for the quiz

let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = 3;

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('startButton').addEventListener('click', startQuiz);
});

function displayQuestion(movies) {
    const questionText = document.getElementById('questionText');
    questionText.innerText = "Which of these top ranked movies is the oldest?";

    const movieOptions = document.getElementById('movieOptions'); // Correctly define movieOptions
    movieOptions.innerHTML = ''; // Clear previous options

    // Identify the oldest movie
    // chat gpt
    const oldestMovie = movies.reduce((oldest, movie) =>
        new Date(oldest.release_date) < new Date(movie.release_date) ? oldest : movie, movies[0]);

    movies.forEach(movie => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        img.alt = movie.title;
        button.appendChild(img);
        button.addEventListener('click', () => checkAnswer(movie, oldestMovie));
        li.appendChild(button);
        movieOptions.appendChild(li);
    });

}


async function fetchMoviesAndDisplayQuestion() {
    const movies = await fetch('/quiz/movies').then(response => response.json());
    displayQuestion(movies);
}


function startQuiz() {
    // first check if the user has entered their name
    const name = document.getElementById('nameInput').value;
    if (name.trim() === '') {
        alert('Please enter your name.');
        return;
    }

    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;

    // Hide the start section and show the quiz section
    document.getElementById('startSection').style.display = 'none';
    document.getElementById('quizSection').style.display = 'block';

    fetchMoviesAndDisplayQuestion();
}




function checkAnswer(selectedMovie, correctMovie) {
    if (selectedMovie.id === correctMovie.id) {
        score++; // Increment score for correct answer
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < totalQuestions) {
        fetchMoviesAndDisplayQuestion(); // Fetch new movies for the next question
    } else {
        showScore(); // No more questions, show final score
    }
}



function showScore() {
    // Assuming you have a playerName variable. Adjust as necessary.
    const playerName = document.getElementById('nameInput').value; // Example of fetching player name

    const quizAttempt = {
        name: playerName,
        score: score,
        totalQuestions: totalQuestions,
        date: new Date().toISOString() // Store the date of the attempt for reference
    };

    // Fetch existing quiz data from localStorage, or initialize an empty array if none exists
    const quizData = JSON.parse(localStorage.getItem('quizData')) || [];
    quizData.push(quizAttempt); // Add the latest quiz attempt to the array

    // Save the updated array back to localStorage
    localStorage.setItem('quizData', JSON.stringify(quizData));

    // Hide quiz section and show score
    document.getElementById('quizSection').style.display = 'none';
    const scoreSection = document.getElementById('scoreSection');
    if (!scoreSection) {
        alert(`Your score: ${score}/${totalQuestions}`);
        return;
    }
    scoreSection.innerText = `Your score: ${score}/${totalQuestions}`; // Display score
    scoreSection.innerHTML = `Your score: ${score}/${totalQuestions} 
    <p>Click on the 'View Highscore' button below to see the overall standing</p>
    <button onclick="window.location.href = '../highscore'">View Highscore</button>`

    // const highscoreButton = document.createElement('button');
    // highscoreButton.innerText = 'View Highscores';
    // highscoreButton.addEventListener('click', () => {
    //     window.location.href = '../highscore'; // Replace with the actual URL of the highscores page
    // });
    // scoreSection.appendChild(highscoreButton);
    scoreSection.style.display = 'block';
}

