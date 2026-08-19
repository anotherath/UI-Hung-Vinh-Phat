import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["100.126.72.36", "100.126.72.36:3000"],
  images: {
    qualities: [75, 88],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "100.126.72.36",
        port: "8090",
        pathname: "/api/files/**"
      },
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  }
};

export default nextConfig;
