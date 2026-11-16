import { networkInterfaces } from "node:os";

/**
 * This machine's current LAN addresses (e.g. 192.168.18.42).
 *
 * `next dev` only fully trusts localhost. Anyone opening the dev server via the
 * network IP gets the HTML, but the dev server refuses the connections the page
 * needs to start its JavaScript: the header never turns solid, tabs do not switch,
 * the mobile menu does not open. Allowing our own LAN addresses fixes that for
 * colleagues on the office network. Read at startup, so it follows the machine
 * if the router hands out a new IP. Has no effect on production builds.
 */
const lanAddresses = Object.values(networkInterfaces())
  .flat()
  .filter((net) => net && (net.family === "IPv4" || net.family === 4) && !net.internal)
  .map((net) => net.address);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  allowedDevOrigins: lanAddresses,
  images: {
    // Team photos are hosted on Cloudinary. Once you know your cloud name, narrow the
    // path to `/<cloud-name>/**` so only your own images can be served through the site.
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" }],
  },
};

export default nextConfig;
