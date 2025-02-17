const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://magento.softwaretestingboard.com",  // Set base URL for easy navigation
    viewportWidth: 1366,  // Define default screen size
    viewportHeight: 768,
    defaultCommandTimeout: 10000,  // Timeout for waiting commands (10 sec)
    pageLoadTimeout: 30000,  // Timeout for page load (30 sec)
    retries: {
      runMode: 2,  // Retries in CLI mode
      openMode: 1,  // Retries in Cypress UI mode
    },
    env: {
      username: "testuser",  // Environment variable (Can be used in tests)
      password: "Test@1234"
    },
    reporter: "mochawesome",  // Reporting
    reporterOptions: {
      reportDir: "cypress/reports",  // Report directory
      overwrite: false,
      html: true,
      json: true
    },
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
    specPattern: 'cypress/integrations/e2e/*',  // Test file pattern
  },
});
