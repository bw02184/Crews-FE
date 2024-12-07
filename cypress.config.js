const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    baseUrl: 'http://localhost:3000',
    experimentalSessionAndOrigin: true, // 세션 및 리다이렉트 지원 활성화
    experimentalStudio: true,
  },
});
