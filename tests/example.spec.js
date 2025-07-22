// tests/example.spec.js
import { expect, test } from '@playwright/test';

test('Homepage should load properly', async ({ page }) => {
  await page.goto('http://localhost:4000'); // Change this URL if needed
  await expect(page).toHaveTitle(/E-Learning /i); // Update with the actual title of your site
});
