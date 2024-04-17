function displayQuizAttempts(sortBy = 'date') {
    const quizAttemptsContainer = document.getElementById('quizAttempts');
    let quizData = JSON.parse(localStorage.getItem('quizData')) || [];

    // Sorteerlogica
    switch (sortBy) {
        case 'name':
            quizData.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'score':
            quizData.sort((a, b) => b.score - a.score); // Hoogste score eerst
            break;
        case 'date':
            quizData.sort((a, b) => new Date(b.date) - new Date(a.date)); // Nieuwste eerst
            break;
    }

    // Bouw de tabel
    quizAttemptsContainer.innerHTML = quizData.length === 0 ? '<p>No quiz attempts to display.</p>' : buildTable(quizData);
}

// function buildTable(data) {
//     let table = '<table><tr><th>Name</th><th>Score</th><th>Date</th></tr>';
//     data.forEach(attempt => {
//         table += `<tr><td>${attempt.name}</td><td>${attempt.score}/${attempt.totalQuestions}</td><td>${attempt.date}</td></tr>`;
//     });
//     table += '</table>';
//     return table;
// }
function buildTable(data) {
    let table = '<table><tr><th>Name</th><th>Score</th><th>Date</th></tr>';
    data.forEach(attempt => {
        // Format the date to only include year, month, and day
        const formattedDate = new Date(attempt.date).toISOString().split('T')[0];

        table += `<tr><td>🤵🏻‍♂️ ${attempt.name}</td><td>🏆 ${attempt.score}/${attempt.totalQuestions}</td><td>🗓️ ${formattedDate}</td></tr>`;
    });
    table += '</table>';
    return table;
}


// Event listeners voor de sorteerknoppen
document.getElementById('sortByName').addEventListener('click', () => displayQuizAttempts('name'));
document.getElementById('sortByScore').addEventListener('click', () => displayQuizAttempts('score'));
document.getElementById('sortByDate').addEventListener('click', () => displayQuizAttempts('date'));
document.getElementById('clearButton').addEventListener('click', clearQuizAttempts);

// Toon initiële data gesorteerd op datum
displayQuizAttempts();


// Clear all the data
function clearQuizAttempts() {
    localStorage.removeItem('quizData');
    displayQuizAttempts();
}


