module.exports = {
    reporters: [
      "default",
      [
        'jest-junit',//"jest-html-reporter",
        {
          pageTitle: "Backend unit Test Report",
          outputDirectory: './reports',
          outputName: 'test-results.xml', //#outputPath: process.env.REPORTS_DIR || "./reports/test-report.html",       
          includeFailureMsg: true,
          includeSuiteFailure: true
        }
      ]
    ]
  };