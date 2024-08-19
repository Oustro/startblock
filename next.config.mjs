/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/jobs",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type",
          },
          {
            key: "Content-Security-Policy",
            value:
              "upgrade-insecure-requests; default-src https: 'self' localhost:*",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
