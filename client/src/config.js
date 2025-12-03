// client/src/config.js

const isProduction = process.env.NODE_ENV === 'production';

// If we are live on Vercel, use the Render Backend. 
// If we are coding locally, use localhost:5000.
export const API_URL = isProduction 
  ? "https://tution-master.onrender.com//api" 
  : "http://localhost:5000/api";

export const SITE_NAME = "Tution Mater";