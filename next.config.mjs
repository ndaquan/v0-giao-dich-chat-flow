/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Tắt cache Turbopack để tránh lỗi trong v0 sandbox
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
