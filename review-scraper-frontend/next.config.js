/** @type {import('next').NextConfig} */

const isDevelopment = process.env.NODE_ENV === 'development';
const backUrl = isDevelopment ? 'localhost' : '43.200.52.112';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['is2-ssl.mzstatic.com', 'play-lh.googleusercontent.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://backUrl:8082/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
