/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // https://img.youtube.com/vi/[video-id]/[thumbnail-number].jpg
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "**/*",
      },
    ],
  },
};

export default nextConfig;
