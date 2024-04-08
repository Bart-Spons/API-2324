function displayQuizAttempts() {
    const quizAttemptsContainer = document.getElementById('quizAttempts');
    const quizData = JSON.parse(localStorage.getItem('quizData')) || [];

    // Clear existing content
    quizAttemptsContainer.innerHTML = '';

    // Check if there's any data to display
    if (quizData.length === 0) {
        quizAttemptsContainer.innerHTML = '<p>No quiz attempts to display.</p>';
        return;
    }

    // Create a list of quiz attempts
    const list = document.createElement('ul');
    quizData.forEach(attempt => {
        const item = document.createElement('li');
        item.textContent = `Name: ${attempt.name}, Score: ${attempt.score}/${attempt.totalQuestions}, Date: ${attempt.date}`;
        list.appendChild(item);
    });

    quizAttemptsContainer.appendChild(list);
}

// Call this function when you want to display the quiz attempts, e.g., on page load
displayQuizAttempts();

// I want to clear the data from the list
function clearQuizAttempts() {
    localStorage.removeItem('quizData');
    displayQuizAttempts();
}

// Add a click event listener to the button
document.getElementById('clearButton').addEventListener('click', clearQuizAttempts);
