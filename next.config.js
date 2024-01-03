/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: "export", // Add this line to enable static export
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindui.com",
        port: "",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig