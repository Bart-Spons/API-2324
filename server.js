import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';
// import powerInfo from 'node-power-info';

dotenv.config();

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory
app.set('view engine', 'ejs');


app.get('/', async (req, res) => {
    res.render('pages/index', { title: 'API Website' });


});

// Movies route: Fetch movie data and display it
app.get('/movies', async (req, res) => {
    const apiKey = process.env.API_KEY;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.render('pages/movies', { movies: data.results, title: 'Popular Movies' });
    } catch (error) {
        console.error('Fetching movies failed:', error);
        res.status(500).send('Failed to fetch movies');
    }
});


app.get('/search', async (req, res) => {
    const { search } = req.query; // Get the search query from the request's query string
    if (!search) {
        return res.render('pages/search', { movies: [], title: 'Search Movies', searchQuery: '' });
    }

    const apiKey = process.env.API_KEY; // Make sure you have your TMDb API key
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(search)}&page=1&include_adult=false`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        // Render an EJS template with the search results
        res.render('pages/search', { movies: data.results, title: 'Search Results for "' + search + '"', searchQuery: search });
    } catch (error) {
        console.error('Searching movies failed:', error);
        res.status(500).send('Failed to search movies');
    }
});

// Endpoint for the quiz page
app.get('/quiz', async (req, res) => {
    res.render('pages/quiz', { title: 'Welcome to my quiz' });
});

app.get('/quiz/movies', async (req, res) => {
    const apiKey = process.env.API_KEY;
    // Top rated (everyone knows many of them)
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;


    try {
        const response = await fetch(url);
        const data = await response.json();
        let movies = data.results;

        // Shuffle the movies array to randomize the quiz options
        for (let i = movies.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [movies[i], movies[j]] = [movies[j], movies[i]]; // Swap elements & choose random movies
            // After fetching movies from TMDb API


        }

        // Select the first 4 movies after shuffling
        const selectedMovies = movies.slice(0, 4);

        res.json(selectedMovies);
    } catch (error) {
        console.error('Fetching top rated movies for quiz failed:', error);
        res.status(500).send('Failed to fetch top rated movies for the quiz');
    }
});

app.get('/highscore', async (req, res) => {
    res.render('pages/highscore', { title: 'High Scores' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
