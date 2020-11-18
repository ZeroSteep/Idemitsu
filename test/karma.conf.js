module.exports = function(config) {
    config.set({
        frameworks: ['jasmine-jquery', 'jasmine'],
        plugins: [
            'karma-chrome-launcher'
        ],
        browsers: ['Chrome'],
        files: ['public/**/scripts.min.js']
    });
};