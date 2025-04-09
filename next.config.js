/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "assets.aceternity.com", 
      "static.bymj.io", 
      "statics.solscan.io", 
      "images.pexels.com",
      "cdn-images-1.medium.com"
    ]
  }
};

export default nextConfig;
