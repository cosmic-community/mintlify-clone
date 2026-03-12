/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  // Changed: Removed 'eslint' key - no longer supported in Next.js 16 config
}

module.exports = nextConfig