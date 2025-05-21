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
    // Ensure static assets are properly handled
    assetPrefix: isProduction ? '/resume-website' : '',
    // Configure webpack to handle static assets
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            type: 'asset/resource',
        });
        return config;
    },
}

module.exports = nextConfig