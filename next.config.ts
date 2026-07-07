import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"]
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "sokolnikovufa.ru"
          }
        ],
        destination: "https://www.sokolnikovufa.ru/:path*",
        permanent: true
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "sokolnikovufa.vercel.app"
          }
        ],
        destination: "https://www.sokolnikovufa.ru/:path*",
        permanent: true
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "cd-wa1dx.vercel.app"
          }
        ],
        destination: "https://www.sokolnikovufa.ru/:path*",
        permanent: true
      }
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
