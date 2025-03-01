/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/Business_Card' : '',
  images: {
    unoptimized: true
  },
  // Disable the next export command
  distDir: 'out'
}

module.exports = nextConfig