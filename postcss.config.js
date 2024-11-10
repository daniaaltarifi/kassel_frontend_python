const purgecss = require('@fullhuman/postcss-purgecss')({
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Paths to your content
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [] // Extract CSS classes
});

module.exports = {
    plugins: [
        require('postcss-import'),
        process.env.NODE_ENV === 'production' ? purgecss : undefined, // Only run in production
        require('autoprefixer'),
    ].filter(Boolean),
};
