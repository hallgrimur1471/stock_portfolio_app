'use strict';

// [START gae_node_request_example]
const express = require('express');
const http = require('http');
const https = require('https');
const { nextTick } = require('process');
// Reads .env and adds values to process.env
require('dotenv').config();

const app = express();
app.set('json spaces', 2);

app.use(express.static(process.cwd() + "/stock_portfolio_frontend/dist/stock_portfolio_frontend/"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/stock_portfolio_frontend/dist/stock_portfolio_frontend/index.html");
  // TODO: redirect to /search/home ?
});

app.get("/api/example", (req, res) => {
  res.json({ example: "value" });
});

async function getFinnhub(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      try {
        if (res.statusCode !== 200) {
          throw new Error(`API call to ${url} failed with status code ${res.statusCode}`);
        }

        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });

        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            resolve(parsedData);
          } catch (err) {
            reject(err);
          }
        });

      } catch (err) {
        reject(err);
      }
    })
  });
}

// Company's Description
app.get("/api/description", (req, res, next) => {
  let symbol = req.query.symbol;
  let key = process.env.FINHUB_API_KEY;
  let url = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${key}`;

  getFinnhub(url)
    .then((data) => {
      res.json(data);
    })
    .catch(next);
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
