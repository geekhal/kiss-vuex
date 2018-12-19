module.exports = {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: ["<rootDir>/src/**/*.js"],
    coverageDirectory: "coverage",
    coverageReporters: ["json", "lcov", "text", "clover"],
    testMatch: ["<rootDir>/__tests__/unit/**/*.(spec|test).(js|jsx)"],
    moduleNameMapper: {
        "^kiss-vuex$": "<rootDir>/src/index.js",
        "^src$": "<rootDir>/src/index.js",
        "^src/(.*)$": "<rootDir>/src/$1"
    },
    moduleDirectories: ["node_modules", "src"],
    moduleFileExtensions: ["js", "jsx", "json"],
    transform: {
        "^.+\\.jsx?$": "<rootDir>/node_modules/babel-jest"
    },
    globals: {
        NODE_ENV: "test"
    }
};
