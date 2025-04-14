import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactStrictMode: false,
  // experimental: {
  //   appDir: true,
  //   serverActions: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // penting agar semua path diizinkan
      },
    ],
  },
};

export default nextConfig;
