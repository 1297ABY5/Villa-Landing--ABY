/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"], // later add domains for external images
  },
};

module.exports = nextConfig;
