let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = 5; // Adjust if you plan to have more questions

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('startButton').addEventListener('click', startQuiz);
});

function startQuiz() {
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

async function fetchMoviesAndDisplayQuestion() {
    // Fetch movies specifically for the quiz
    const movies = await fetch('/quiz/movies').then(response => response.json());

    displayQuestion(movies);
}

function displayQuestion(movies) {
    const questionText = document.getElementById('questionText');
    questionText.innerText = `Which of these movies is the oldest? (Question ${currentQuestionIndex + 1} of ${totalQuestions})`;

    const movieOptions = document.getElementById('movieOptions');
    movieOptions.innerHTML = ''; // Clear previous options

    movies.forEach(movie => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.innerText = `${movie.title} (${movie.release_date})`;
        button.addEventListener('click', () => checkAnswer(movie, movies[0]));
        li.appendChild(button);
        movieOptions.appendChild(li);
    });
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
    document.getElementById('quizSection').style.display = 'none'; // Hide quiz section
    const scoreSection = document.getElementById('scoreSection');
    if (!scoreSection) {
        alert(`Your score: ${score}/${totalQuestions}`);
        return;
    }
    scoreSection.innerText = `Your score: ${score}/${totalQuestions}`; // Display score
    scoreSection.style.display = 'block';
}
