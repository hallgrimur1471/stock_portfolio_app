'use strict';

// [START gae_node_request_example]
const express = require('express');

// Reads .env and adds values to process.env
require('dotenv').config();

const app = express();

app.use(express.static(process.cwd() + "/stock_portfolio_frontend/dist/stock_portfolio_frontend/"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/stock_portfolio_frontend/dist/stock_portfolio_frontend/index.html");

  // TODO: redirect to /search/home
});

app.get("/api/example", (req, res) => {
  //res.setHeader('Conent-Type', 'application/json');
  //res.end(JSON.stringify({ "example": "value" }));
  res.json({ example: "value" });
});

// Shows details of the <ticker> searched
app.get("/api/search/<ticker>", (req, res) => {

});

// Displays the watchlist of the user
app.get("/api/search/<ticker>", (req, res) => {

});

// Displays the portfolio of the user
app.get("/api/portfolio", (req, res) => {

});

// Start the server
const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;
