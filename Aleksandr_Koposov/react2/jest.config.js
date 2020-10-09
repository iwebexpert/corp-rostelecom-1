module.exports = {
    clearMocks: true,
    coverageDirectory: "coverage",
    moduleDirectories: [
        "node_modules"
    ],
    roots: [
        "<rootDir>/tests"
    ],
    moduleFileExtensions: [
        "js",
        "jsx",
    ],
    moduleNameMapper: {
        "\\.s?css$": "<rootDir>/tests/__mocks__/styleMock.js",
        "^components/(.*)$": "<rootDir>/src/components/$1",
        "^store/(.*)$": "<rootDir>/src/store/$1",
        "^actions/(.*)$": "<rootDir>/src/store/actions/$1",
        "^reducers/(.*)$": "<rootDir>/src/store/reducers/$1",
        "^containers/(.*)$": "<rootDir>/src/containers/$1",
    },
    setupFilesAfterEnv: [
        "<rootDir>/tests/setup.js"
    ],
    snapshotSerializers: [
        "enzyme-to-json/serializer"
    ],
}
