const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withImages = require('next-images');

// module.exports = withPWA(
//   {
//     reactStrictMode: true,
//     images: {
//       domains: ['lh3.googleusercontent.com'],
//     },
//     pwa: {
//       dest: 'public',
//       runtimeCaching,
//       disable: !process.env.ENABLE_PWA && process.env.NODE_ENV === 'development',
//     },
//   },
//   (),
// );
const withFonts = require('next-fonts');

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: !process.env.ENABLE_PWA && process.env.NODE_ENV === 'development',
  },
});
// module.exports = withFonts({
//   enableSvg: true,
//   webpack(config, options) {
//     return config;
//   },
// });

// module.exports = withImages({
//   fileExtensions: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
//   webpack(config, options) {
//     return config;
//   },
// });
