/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

// module.exports = {
//   async rewrites() {
//     if (process.env.NODE_ENV !== 'production') {
//       return [
//         {
//           destination: 'http://192.168.0.40:8088',
//           source: "/",
//         },
//       ];
//     }
//   },
// }