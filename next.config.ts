import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cementegypt.blob.core.windows.net",
      },
      {
        protocol: "https",
        hostname: "cementsgyptstorage6547.blob.core.windows.net",
      },
      {
        protocol: "https",
        hostname: "cement.northeurope.cloudapp.azure.com",
        port: "4433",
      },
    ],
  },
};

export default nextConfig;
