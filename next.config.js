/**
 * @type {import('next').NextConfig}
 */

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
    // Only use export output in production
    ...(isProduction ? { output: 'export' } : {}),
    basePath: isProduction ? '/resume-website' : '',
    // Use 'out' directory to match GitHub Actions workflow
    distDir: isProduction ? 'out' : '.next',
    images: {
        unoptimized: true,
    },
    // Add trailingSlash for better compatibility
    trailingSlash: true,
}

module.exports = nextConfig