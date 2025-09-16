/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const repositoryName = 'dl-details-app'

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'dist',
  assetPrefix: isProd ? `/${repositoryName}/` : '',
  basePath: isProd ? `/${repositoryName}` : '',
  images: {
    domains: ['localhost'],
    unoptimized: true
  }
}

module.exports = nextConfig
