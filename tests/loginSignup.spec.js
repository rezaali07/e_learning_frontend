import { expect, test } from '@playwright/test';
import crypto from 'crypto';

const BASE_URL = 'http://localhost:4000';
const AVATAR_PATH = 'Z:\\complete web project\\React-CLOTH-EC-MangoDB-master\\frontend_cloth\\src\\Assets\\profile.png';

test.describe('Login and Signup Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/login`);
    });

    test('Login page should load properly', async ({ page }) => {
        await expect(page).toHaveTitle(/Login or Signup/i);
        await expect(page.locator('.loginForm')).toBeVisible();
    });

    test('User can login with valid credentials', async ({ page }) => {
        await page.fill('input[placeholder="Email"]', 'testuser1@gmail.com');
        await page.fill('input[placeholder="Password"]', '123456789');
        await page.click('input[type="submit"]');

        await page.waitForURL(BASE_URL, { timeout: 60000 });
        await expect(page).toHaveURL(BASE_URL);
    });

    test('Error message should appear for incorrect login', async ({ page }) => {
        await page.fill('input[placeholder="Email"]', 'testadmin@gmail.com');
        await page.fill('input[placeholder="Password"]', 'wrongpassword');
        await page.click('input[type="submit"]');

        await expect(page.locator('.Toastify__toast-body')).toHaveText(/Invalid password/i, { timeout: 2000 });

    });

    test('User can register and login successfully', async ({ page }) => {
        const registerTab = page.locator('text=REGISTER').first();
        await registerTab.waitFor({ state: 'visible' });
        await registerTab.scrollIntoViewIfNeeded();
        await registerTab.click();

        const randomEmail = `user_${crypto.randomBytes(4).toString('hex')}@gmail.com`;
        const password = 'testpassword';

        await page.fill('input[name="name"]', 'Test User');
        await page.fill('input[name="email"]', randomEmail);
        await page.fill('input[name="password"]', password);

        // Upload image using absolute path
        await page.setInputFiles('input[name="avatar"]', AVATAR_PATH);

        const registerButton = page.locator('input[type="submit"][value="Register"]');
        await registerButton.waitFor({ state: 'visible' });
        await registerButton.scrollIntoViewIfNeeded();
        await registerButton.click({ force: true });

        // Wait for a success message

        await page.waitForSelector('.Toastify__toast-body', { timeout: 60000 });
        await expect(page.locator('.Toastify__toast-body')).toHaveText(/Please login to continue/i, { timeout: 60000 });

        // Log in immediately after registration
        await page.fill('input[placeholder="Email"]', randomEmail);
        await page.fill('input[placeholder="Password"]', password);
        await page.click('input[type="submit"]', { force: true });

        await page.waitForURL(BASE_URL, { timeout: 60000 });
        await expect(page).toHaveURL(BASE_URL);

    });

    test('Redirects admin users to dashboard', async ({ page }) => {
        await page.fill('input[placeholder="Email"]', 'testadmin@gmail.com');
        await page.fill('input[placeholder="Password"]', '123456789');
        await page.click('input[type="submit"]');

        await page.waitForURL(`${BASE_URL}/dashboard`, { timeout: 60000 });
        await expect(page).toHaveURL(`${BASE_URL}/dashboard`);
    });

});



