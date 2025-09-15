/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",   // correct Unsplash domain for optimized images
      "unsplash.com",          // fallback in case direct links are used
      "randomuser.me",         // testimonial avatars
      "localhost",             // local dev
      "fonts.gstatic.com",     // Google fonts
      "fonts.googleapis.com"   // Google fonts
    ],
  },
};

module.exports = nextConfig;
