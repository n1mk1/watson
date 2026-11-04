// @ts-check
const fs = require('fs');
const { defineConfig, devices } = require('@playwright/test');

// Saved login from `npm run login -- <APP_URL>` (see AGENTS.md). Used only if it exists.
const authFile = '.auth/user.json';

module.exports = defineConfig({
  testDir: './tests/e2e',
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.APP_URL,
    storageState: fs.existsSync(authFile) ? authFile : undefined,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
