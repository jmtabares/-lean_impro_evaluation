# 🚀 Cypress + Cucumber BDD Integration for User Login Tests

This project integrates Cypress and Cucumber to test user login functionality using BDD (Behavior-Driven Development). The project includes both positive and negative test scenarios that simulate different login cases.

## 📂 Project Structure

    /project-root
    ├── cypress
    │ ├── e2e
    │ │ ├── login.feature # Feature file containing Gherkin test cases
    │ │ └── step_definitions
    │ └── login.ts # Step definitions for login scenarios
    ├── cypress.config.ts # Cypress configuration file
    ├── package.json # Project dependencies
    └── README.md # Project instructions

## 📋 Prerequisites

Make sure you have the following installed:
• Node.js (v14+ recommended)
• npm (comes with Node.js)

⚙️ Installation

1. Clone this repository:

- git clone <repository-url>
- cd <repository-directory>

2. Install the dependencies:

- npm install

## 🌟 Running Tests

1. Running Tests via Cypress Test Runner (GUI)

This opens the interactive Cypress GUI, allowing you to manually select and run feature files.

npx cypress open

Steps to follow:
• Once the Cypress window opens, select E2E Testing.
• Choose your browser (e.g., Chrome, Edge, or Firefox).
• Select the login.feature to run the tests.

2. Running Tests via Command Line (CLI)

This runs Cypress headlessly and executes the tests from the command line.
npx cypress run

To run a specific feature file:
npx cypress run --spec cypress/e2e/login.feature

# 🛠 Configuration Overview

Cypress Configuration (cypress.config.ts)

The Cypress configuration is set up to integrate the Cucumber preprocessor with the correct spec patterns and step definitions.

```typrescript
import { defineConfig } from 'cypress'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild'
import mochawesome from 'cypress-mochawesome-reporter/plugin'

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)]
      })
      on('file:preprocessor', bundler)
      await addCucumberPreprocessorPlugin(on, config)
      mochawesome(on)

      return config
    },
    specPattern: 'cypress/e2e/**/*.feature',
    baseUrl: 'http://localhost:5173',
    reporter: 'cypress-mochawesome-reporter'
  }
})
```

## ✅ Test Scenarios

This project includes the following scenarios:

### Login Feature

#### Positive Scenario

- Successful Login: The user enters a valid email and password and is redirected to the welcome page.

#### Negative Scenarios

- Incorrect Email with Correct Password
- Correct Email with Incorrect Password
- Both Email and Password Incorrect
- Empty Email with Correct Password
- Correct Email with Empty Password
- Both Email and Password Fields Empty

### Logout Feature

- Successful Logout
- Failed Logout Due to Session Already Closed

## 📝 Customizing Tests

• Modify feature files under cypress/e2e/.
• Add or modify step definitions under cypress/e2e/<feature_file_name>/.

## 📋 HTML Report

### 📄 Generate HTML Report via CLI

After running the tests, the HTML reports will be generated automatically under cypress/reports.

Open the report using:

npx mochawesome-merge cypress/reports/\*.json | npx mochawesome-report-generator

Or simply open the generated HTML file from cypress/reports.

#### 📚 Optional: Auto-Open Report

You can automatically open the report after running the tests by adding a post-test script to package.json:

{
"scripts": {
"test": "cypress run",
"report": "npx mochawesome-merge cypress/reports/\*.json | npx mochawesome-report-generator && open mochawesome-report/mochawesome.html"
}
}

## To run Cypress tests and record a video of the complete test execution:

### Command to Run Tests with Video Recording

Run all your Cypress tests headlessly and record the video:
npx cypress run

Record a Video for a Specific Feature File
If you only want to record the tests for logout.feature, you can specify the file path:
npx cypress run --spec "cypress/e2e/logout.feature"

### Command for Running Tests and Generating Video with Report

npx cypress run --reporter cypress-mochawesome-reporter

### Viewing the Recorded Video

After the test run, you can access the recorded video in the default location:

    /project-root
      └── cypress
          └── videos
              └── e2e
                  └── logout.feature.mp4  # Recorded video of the logout tests

### Cleaning Up Videos

rm -rf cypress/videos
