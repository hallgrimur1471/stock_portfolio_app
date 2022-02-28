'use strict';

// [START gae_node_request_example]
const express = require('express');

const app = express();

app.get("/", (req, res) => {
  res.status(200).send('Hello, world!').end();

  // TODO: redirect to /search/home
});

// Shows details of the <ticker> searched
app.get("/search/<ticker>", (req, res) => {

});

// Displays the watchlist of the user
app.get("/search/<ticker>", (req, res) => {

});

// Displays the portfolio of the user
app.get("/portfolio", (req, res) => {

});

// Start the server
const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;
