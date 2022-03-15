# Stock Portfolio

## Setup

    npm install

## Running locally for development

```
# Terminal 1:
npm run dev

# Terminal 2:
ng serve

# open http://localhost:4200
```

## Deploying to App Engine

```
cd stock_porfolio_frontend
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