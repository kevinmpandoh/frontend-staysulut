import axios from "axios";
// import { useLoginModal } from "@/stores/loginModal.store";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Pastikan API URL ada di .env
  withCredentials: true, // Jika menggunakan cookies untuk auth
});

// Interceptor untuk handle response 401 (token expired)
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       if (typeof window !== "undefined") {
//         // Token expired → redirect ke login
//         window.location.href = "/auth/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 500) {
      // Akses store global langsung (jangan dalam komponen)
      console.error("Server error:", err.response.data);
    }
    return Promise.reject(err);
  }
);

export default api;
