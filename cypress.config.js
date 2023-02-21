const { defineConfig } = require("cypress");
const webpack = require('@cypress/webpack-preprocessor')
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const path = require('path');

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  video: false,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/results',
    charts: true,
    reportPageTitle: 'The Family Store - Automation Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      const options = {
        webpackOptions: {
          resolve: {
            alias: {
              '@pageObjects': path.resolve(__dirname, './cypress/e2e/UI/pages/'),
              '@hooks': path.resolve(__dirname, './cypress/e2e/UI/hooks/'),
              '@uiTests': path.resolve(__dirname, './cypress/e2e/UI/tests/'),
              '@apiRequests': path.resolve(__dirname, './cypress/e2e/API/requests/'),
              '@utils': path.resolve(__dirname, './cypress/e2e/Utils/'),
              '@fixtures': path.resolve(__dirname, './cypress/fixtures/')
            },
          },
        },
        watchOptions: {},
      }
      on('file:preprocessor', webpack(options))
      allureWriter(on, config);
      return config;
    },
    baseUrl: 'https://myqa.tfoco.dev',
    retries: {
      openMode: 0,
      runMode: 2
    },
    chromeWebSecurity: false,
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
  }
});
