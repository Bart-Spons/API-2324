import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

const app = express();

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');


// Define routes
app.get('/', async function (req, res) {
    try {
        // Render the index template and pass the sorted posts data
        res.render('pages/index');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});