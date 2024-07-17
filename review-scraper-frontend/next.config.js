/** @type {import('next').NextConfig} */

module.exports = (phase, { defaultConfig }) => {
  const nextConfig = {
    i18n: {
      locales: ['ko'],
      defaultLocale: 'ko',
    },
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
    output: 'standalone',
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8082/api/:path*',
          // phase === 'phase-production-server'
          //   ? `${process.env.NEXT_PUBLIC_API_BASEURL}/api/:path*`
          //   : 'http://localhost:8082/api/:path*',
        },
      ];
    },
  };

  return nextConfig;
};
