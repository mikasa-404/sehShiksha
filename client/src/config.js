// config.js

let baseUrl;

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3001';
} else {
  baseUrl = process.env.REACT_APP_API_URL; // Use environment variable in production
}

export default baseUrl;
