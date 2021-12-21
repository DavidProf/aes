module.exports = {
    exportPathMap: function () {
        return {
            "/": { page: "/" },
        }
    },
    /**
     * comment out the following line to fix project for owned domains
     * uncomment to fix project for github pages domain like user.github.io/project
     */
    // basePath: '/aes',
    // assetPrefix: '/aes/',
    webpack: (config) => {
        config.module.rules = config.module.rules.map(rule => {
            if (rule.loader === 'babel-loader') {
                rule.options.cacheDirectory = false
            }
            return rule
        })
        return config
    }
}