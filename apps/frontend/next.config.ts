import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@chess/contracts"],
};

export default nextConfig;
