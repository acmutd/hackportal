const runtimeCaching = require('next-pwa/cache');
const withFonts = require('next-fonts');

const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching,
  disable: !process.env.ENABLE_PWA && process.env.NODE_ENV === 'development',
});

(module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com'],
  },

  webpack(config, options) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
})),
  withFonts({
    enableSvg: true,
    webpack(config, options) {
      return config;
    },
  });
