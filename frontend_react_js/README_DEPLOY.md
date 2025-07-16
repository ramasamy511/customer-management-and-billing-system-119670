# Frontend React.js - Packaging/Deployment

## Local Development

1. Install:
    ```
    npm install
    ```
2. Start dev server:
    ```
    npm start
    ```
    Visit `http://localhost:3000`

## Production/Distribution Build

Build an optimized static bundle:
```
npm run build
```
Output in `/build` directory.

## Serving Locally from Built Static

After build:
```
npm run serve
```
Serves at http://localhost:3000 or http://localhost:5000.

## Containerized Deployment

Build Docker image:
```
docker build -t customer-frontend .
```
Run (map to port 80 or as needed):
```
docker run -p 8080:80 customer-frontend
```
Use with backend and database containers, or via docker-compose.

## Environment

Environment variables for backend API URL or deployment settings can be provided via `.env`, `REACT_APP_*` if needed.
