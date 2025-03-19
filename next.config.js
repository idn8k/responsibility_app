// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   compiler: {
//     styledComponents: true,
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**", // Allow all domains
//       },
//     ],
//     dangerouslyAllowSVG: true, // If you want to allow SVG images
//     unoptimized: true, // Bypass Next.js Image Optimization
//   },
//   reactStrictMode: true,
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/i,
//       issuer: /\.[jt]sx?$/,
//       use: ["@svgr/webpack"],
//     });

//     return config;
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all domains
      },
    ],
    dangerouslyAllowSVG: true, // Allows SVG images
    // Add other custom settings for image handling if needed
  },
  reactStrictMode: true,
  webpack(config) {
    // Add support for importing SVGs as React components
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
