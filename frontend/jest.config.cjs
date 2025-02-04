module.exports = {
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^.+\\.(css|scss|sass|less)$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",    // Archivos dentro de __tests__
    "**/?(*.)+(spec|test).[jt]s?(x)"  // Archivos *.test.js o *.spec.js
  ],
  reporters: [
    "default",
    [

      'jest-junit',//"jest-html-reporter",
      {
        pageTitle: "FrontEnd Component Test Report",
        outputDirectory: './reports',
        outputName: 'test-results.xml', //#outputPath: process.env.REPORTS_DIR || "./reports/test-report.html",       
        includeFailureMsg: true,
        includeSuiteFailure: true
      }
    ],
    [
      'jest-html-reporter',
      {
        outputPath: './reports/jest-front-html-report.html',  // Path for HTML report
        pageTitle: "Jest Frontend HTML Test Report",
        includeFailureMsg: true,
        includeSuiteFailure: true
      }
    ]
  ]
};