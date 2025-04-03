import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Pastikan API URL ada di .env
  withCredentials: true, // Jika menggunakan cookies untuk auth
});

export default api;
