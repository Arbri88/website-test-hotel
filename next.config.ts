import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  serverExternalPackages: ['better-sqlite3', '@prisma/adapter-better-sqlite3'],
};

export default nextConfig;
