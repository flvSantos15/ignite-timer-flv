import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'y6fsvy',

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5173',
  },

  component: {
    viewportHeight: 600,
    viewportWidth: 800,
    // specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
})
