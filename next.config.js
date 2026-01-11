/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/dental-implant',

  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
