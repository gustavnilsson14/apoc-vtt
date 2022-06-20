$env:NODE_ENV="production"
cd backend
npx nodemon --watch "index.ts" --watch "src/**" --ext "ts,json" --ignore