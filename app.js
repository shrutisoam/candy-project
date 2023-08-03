const express = require('express');
const cors = require('cors');
const candyRouter = require('./routes/candyRouter');
const sequelize = require('./config/database'); // Correct relative path to the database.js file
const path = require('path');

const app = express();
const port = 12000;

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse incoming request bodies as JSON
app.use(express.urlencoded({ extended: false })); // Middleware to handle URL-encoded data
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', candyRouter); // Change '/routes' to '/' or another appropriate path

// Start the server
sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
