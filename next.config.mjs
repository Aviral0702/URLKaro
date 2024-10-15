const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/URLKaro/' : '',
  basePath: isProd ? '/URLKaro' : '',
  output: 'export'
};

export default nextConfig;