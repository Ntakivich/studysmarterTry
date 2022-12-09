const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: false,
    retries: {
      openMode: 0,
      runMode: 2
    },
    viewportWidth: 1920,
    viewportHeight: 1080
  },
});
