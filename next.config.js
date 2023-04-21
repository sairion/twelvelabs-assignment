/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/list",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
