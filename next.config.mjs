
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // For migration phase
  },
  eslint: {
    ignoreDuringBuilds: true, // For migration phase
  },
};

export default nextConfig;
