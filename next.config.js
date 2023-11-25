/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "avatars.githubusercontent.com",
            },
            {
              protocol: "https",
              hostname: "jsframework.s3.ca-central-1.amazonaws.com",
            },
          ],
    },

}

module.exports = nextConfig
