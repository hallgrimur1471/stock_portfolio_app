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

// Company's Description
app.get("/api/description", (req, res, next) => {
  let symbol = req.query.symbol;
  let key = process.env.FINHUB_API_KEY;
  let url = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${key}`;

  getFinnhub(url, res);
});

// Company's Historical Data
app.get("/api/historical", (req, res, next) => {
  let symbol = req.query.symbol;
  let timeInterval = req.query.resolution; // Example: 1
  let from = req.query.from; // Unix timestamp, example: 163102248
  let to = req.query.to; // Unix timestamp, example: 1631627048
  let key = process.env.FINHUB_API_KEY;
  let url = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${timeInterval}&from=${from}&to=${to}&token=${key}`;

  getFinnhub(url, res);
});

// Company's Latest Price of Stock
app.get("/api/quote", (req, res, next) => {
  let symbol = req.query.symbol;
  let key = process.env.FINHUB_API_KEY;
  let url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${key}`;

  getFinnhub(url, res);
});

// For search autocomplete functionality
app.get("/api/autocomplete", (req, res, next) => {
  let symbol = req.query.symbol;
  let key = process.env.FINHUB_API_KEY;
  let url = `https://finnhub.io/api/v1/search?q=${symbol}&token=${key}`;

  getFinnhub(url, res);
});

// Company's News
app.get("/api/news", (req, res, next) => {
  let symbol = req.query.symbol;
  let from = req.query.from; // Date in YYYY-MM-DD, example value: "2021-09-01"
  let to = req.query.to; // Date in YYYY-MM-DD, example value: "2021-09-09"
  let key = process.env.FINHUB_API_KEY;
  let url = `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${key}`;

  getFinnhub(url, res);
});

// Company's Recommendation Trends
app.get("/api/trends", (req, res, next) => {
  let symbol = req.query.symbol;
  let key = process.env.FINHUB_API_KEY;
  let url = `https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=${key}`;

  getFinnhub(url, res);
});

// Company's Social Sentiment
app.get("/api/social", (req, res, next) => {
  let symbol = req.query.symbol;
  let from = "2022-01-01";
  let key = process.env.FINHUB_API_KEY;
  let url = `https://finnhub.io/api/v1/stock/social-sentiment?symbol=${symbol}&from=${from}&token=${key}`;

  getFinnhub(url, res);
});

// Company's Peers
app.get("/api/peers", (req, res, next) => {
  let symbol = req.query.symbol;
  let key = process.env.FINHUB_API_KEY;
  let url = `https://finnhub.io/api/v1/stock/peers?symbol=${symbol}&token=${key}`;

  getFinnhub(url, res);
});

// Company's Earnings
// TODO: Replace null values for response keys with 0
//       See specs 4.1.9.
app.get("/api/earnings", (req, res, next) => {
  let symbol = req.query.symbol;
  let key = process.env.FINHUB_API_KEY;
  let url = `https://finnhub.io/api/v1/stock/earnings?symbol=${symbol}&token=${key}`;

  getFinnhub(url, res);
});

// Start the server
const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

async function getFinnhub(url, res) {
  _getFinnhub(url)
    .then((data) => {
      res.json(data);
    })
    .catch((statusCode) => {
      if (statusCode) {
        res.status(statusCode);
        res.json({
          error: `API call to Finnhub failed with status code ${statusCode}`
        });
      } else {
        res.status(500);
        res.json({ error: "Unexpected server error" });
      }
    });
}

async function _getFinnhub(url) {
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
        console.log(err.message);
        reject(res.statusCode);
      }
    })
  });
}

module.exports = app;
// [END gae_node_request_example]