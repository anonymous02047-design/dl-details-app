/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  output: 'export',
  trailingSlash: true,
  distDir: 'dist',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/dl-details-app' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/dl-details-app' : ''
}

module.exports = nextConfig
