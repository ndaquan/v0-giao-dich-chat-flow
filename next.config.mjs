/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    turbopack: {
      resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs'],
    },
  },
}

export default nextConfig
