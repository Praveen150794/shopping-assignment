module.exports = {
    "preset": "react-native",
    "setupFilesAfterEnv": [
        "./setupTests.js"
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        "\\.[jt]sx?$": "babel-jest"
    },
    // ...
};