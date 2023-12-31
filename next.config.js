/** @type {import('next').NextConfig} */

module.exports = {
    output: 'export',
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'tailwindui.com', 
          port: '',
          pathname: '/img/**',
        },
        {
          protocol: 'https',
          hostname: 'fakestoreapi.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
  }
