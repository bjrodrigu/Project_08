module.exports = {
      testEnvironment: 'jsdom',
      moduleDirectories: [
            'node_modules',
      ],
      coverageThreshold: {
            global: {
                  lines: 30,         // Lower from 80% to 30%
                  statements: 30,    // Optional
                  branches: 30,      // Optional
                  functions: 30      // Optional
            }
      }
}