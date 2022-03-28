# Stock Portfolio

## Setup

    npm install

## Running locally for development

```
sed -i 's/NODE_ENV=production/NODE_ENV=development/g' .env

# Terminal 1:
npm run dev

# Terminal 2:
cd stock_portfolio_frontend
ng serve

# open http://localhost:4200
```

## Deploying to App Engine

```
sed -i 's/NODE_ENV=development/NODE_ENV=production/g' .env
cd stock_portfolio_frontend
npm run build
cd ..

gcloud app deploy
```

## Additional gcloud commands

```
# Stream logs to terminal:
gcloud app logs tail -s default

# View application in browser:
gcloud app browse
```

## Running the tests

    npm test