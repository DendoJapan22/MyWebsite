import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      // /works was retired as a separate page when the site moved to an LP structure.
      // Keep external bookmarks working by sending them to the home anchor.
      { source: "/works", destination: "/#works", permanent: true },
    ];
  },
};

export default nextConfig;
