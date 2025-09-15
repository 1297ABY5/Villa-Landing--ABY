/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",   // portfolio & hero images
      "randomuser.me",         // testimonial avatars
      "localhost"              // keep for local dev
    ],
  },
};

module.exports = nextConfig;
