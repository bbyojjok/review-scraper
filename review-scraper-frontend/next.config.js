/** @type {import('next').NextConfig} */

const API_URL = process.env.API_URL;

module.exports = (phase, { defaultConfig }) => {
  const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: [
        'is1-ssl.mzstatic.com',
        'is2-ssl.mzstatic.com',
        'is3-ssl.mzstatic.com',
        'is4-ssl.mzstatic.com',
        'is5-ssl.mzstatic.com',
        'is6-ssl.mzstatic.com',
        'is7-ssl.mzstatic.com',
        'is8-ssl.mzstatic.com',
        'is9-ssl.mzstatic.com',
        'play-lh.googleusercontent.com',
      ],
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination:
            phase === 'phase-production-server'
              ? `${API_URL}/api/:path*`
              : 'http://localhost:8082/api/:path*',
        },
      ];
    },
  };

  return nextConfig;
};
