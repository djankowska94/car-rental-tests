const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    baseUrl: 'http://qalab.pl.tivixlabs.com/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})