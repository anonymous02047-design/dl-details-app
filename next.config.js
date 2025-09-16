/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const repositoryName = 'dl-details-app'

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  assetPrefix: isProd ? `/${repositoryName}/` : '',
  basePath: isProd ? `/${repositoryName}` : '',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
