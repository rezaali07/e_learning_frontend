// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Directory where test files are stored
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  use: {
    headless: false, // Set to true to run tests without a visible browser
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'on',
  },
});
