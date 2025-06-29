module.exports = {
    testEnvironment: "jsdom",  // Ensure jsdom is used for React testing
    verbose: true,  // Enable verbose output
    setupFiles: ["<rootDir>/jest.setup.js"], // Optional, only if you need setup
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",  // Ensure Babel is set up to transform JS/JSX
    },
  };
  