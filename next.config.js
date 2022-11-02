const withPWA = require('next-pwa')({
  dest: 'public',
});
const runtimeCaching = require('next-pwa/cache');
const withFonts = require('next-fonts');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com', 's3.amazonaws.com'],
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: !process.env.ENABLE_PWA && process.env.NODE_ENV !== 'production',
  },
};

(module.exports = process.env.NODE_ENV === 'production' ? withPWA(nextConfig) : nextConfig),
  withFonts({
    enableSvg: true,
    webpack(config, options) {
      return config;
    },
  });
