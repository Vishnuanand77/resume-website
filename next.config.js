/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',

    // Optional: Change the output directory `out` -> `dist`
    distDir: 'dist',
    images: {
        unoptimized: true,
    },
    // Add basePath if your site is not served from the root
    // basePath: '/resume-website',
    // Add trailingSlash for better compatibility
    trailingSlash: true,
}
   
module.exports = nextConfig