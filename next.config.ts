import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
      { protocol: "https", hostname: "www.aviasales.ru" },
      { protocol: "https", hostname: "aviasales.id" },
      { protocol: "https", hostname: "media.aviasales.com" },
      { protocol: "https", hostname: "img.hotellook.com" },
      { protocol: "https", hostname: "cdn.travelstart.co.za" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "thumb.wikimedia.org" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
};

export default nextConfig;
