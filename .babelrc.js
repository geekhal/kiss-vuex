module.exports = {
    plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: false }]
    ],
    presets: [
        [
            "@babel/preset-env",
            {
                modules: false
            }
        ]
    ],
    env: {
        test: {
            plugins: [["@babel/plugin-transform-modules-commonjs"]]
        }
    }
};
