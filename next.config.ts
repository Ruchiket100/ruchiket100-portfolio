import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "i.pinimg.com" },
      { hostname: "cdn.worldvectorlogo.com" },
      { hostname: "cdn.candycode.com" },
      { hostname: "www.writeroo.net" },
      { hostname: "beta.unipune.ac.in" },
    ],
  },
};

export default nextConfig;
