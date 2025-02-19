const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer"); // Import Allure plugin

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://magento.softwaretestingboard.com", // Set base URL for easy navigation
    viewportWidth: 1366, // Define default screen size
    viewportHeight: 768,
    defaultCommandTimeout: 10000, // Timeout for waiting commands (10 sec)
    pageLoadTimeout: 30000, // Timeout for page load (30 sec)
    retries: {
      runMode: 2, // Retries in CLI mode
      openMode: 1, // Retries in Cypress UI mode
    },
    env: {
      username: "testuser", // Environment variable (Can be used in tests)
      password: "Test@1234",
      allure: true, // Enable Allure Reporting
    },
    reporter: "mochawesome", // Keep Mochawesome for JSON & HTML reports
    reporterOptions: {
      reportDir: "cypress/reports", // Report directory
      overwrite: false,
      html: true,
      json: true,
    },
    setupNodeEvents(on, config) {
      allureWriter(on, config); // Enable Allure plugin
      return config;
    },
    specPattern: [
      "cypress/integrations/e2e/registration.js",
      "cypress/integrations/e2e/search.js",
      "cypress/integrations/e2e/wishlist.js",
      "cypress/integrations/e2e/order.js"
    ],
  },
});
