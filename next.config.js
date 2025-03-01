/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    assetPrefix: '/Business_Card/',
    basePath: '/Business_Card',
    images: {
      unoptimized: true,
    },
    trailingSlash: true,
  }
  
  module.exports = nextConfig