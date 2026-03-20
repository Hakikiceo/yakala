import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "ihale.yakala.io" }],
        destination: "https://www.yakala.io/ihale/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
