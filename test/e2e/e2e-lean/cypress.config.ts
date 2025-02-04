import { defineConfig } from 'cypress'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild'
import mochawesome from 'cypress-mochawesome-reporter/plugin';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    chromeWebSecurity: false,
    async setupNodeEvents(on, config) {
      // Override baseUrl dynamically if provided via --env baseUrl
      if (config.env.baseUrl) {
        config.baseUrl = config.env.baseUrl;
      }
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)]
      })
      on('file:preprocessor', bundler)
      await addCucumberPreprocessorPlugin(on, config)
      mochawesome(on);
      on('after:screenshot', (details) => {
        console.log('Screenshot taken:', details.path)
      })
      return config
    },
    specPattern: 'cypress/e2e/**/*.feature',
    screenshotsFolder: 'cypress/reports/screenshots',
    videosFolder: 'cypress/reports/videos',
    screenshotOnRunFailure: true,
    video: true,    
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      reporterEnabled: 'mocha-junit-reporter, cypress-mochawesome-reporter',
      mochaJunitReporterReporterOptions: {
        mochaFile: 'cypress/reports/junit-results-[hash].xml',
      },
      cypressMochawesomeReporterReporterOptions: {
        reportDir: 'cypress/reports/mochawesome',
        charts: true,
        reportPageTitle: 'Cypress Report',
        embeddedScreenshots: true,
        inlineAssets: true,
        saveJson: false,
      },
    },
  }
})
