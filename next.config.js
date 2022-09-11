const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withFonts = require('next-fonts');

(module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com', 's3.amazonaws.com'],
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: !process.env.ENABLE_PWA && process.env.NODE_ENV === 'development',
  },
})),
  withFonts({
    enableSvg: true,
    webpack(config, options) {
      return config;
    },
  });
