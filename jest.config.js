const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // transform: {
    //     '^.+\\.ts?$': 'ts-jest',
    //   },
    testPathIgnorePatterns: ['<rootDir>/dist/']
}

module.exports = config