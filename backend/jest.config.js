module.exports = {
  reporters: [
    "default",
    [
      'jest-junit',
      {
        pageTitle: "Backend Unit Test Report",
        outputDirectory: './reports',
        outputName: 'test-results.xml',
        includeFailureMsg: true,
        includeSuiteFailure: true
      }
    ],
    [
      'jest-html-reporter',
      {
        outputPath: './reports/jest-backend-html-report.html',  // Path for HTML report
        pageTitle: "Jest Backend HTML Test Report",
        includeFailureMsg: true,
        includeSuiteFailure: true
      }
    ]
  ]
  };