import { expect, test } from '@playwright/test';
import path from 'path';

const BASE_URL = 'http://localhost:000';

test.describe('Create Product Tests', () => {

  // Login as admin before each test
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[placeholder="Email"]', 'testadmin@gmail.com');
    await page.fill('input[placeholder="Password"]', '123456789');
    await page.click('input[type="submit"]');
    await page.waitForURL(`${BASE_URL}/dashboard`);
  });

  test('Create Product form should render with all inputs', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/product`);
    await page.waitForSelector('input[placeholder="Product Name"]', { state: 'visible' });
    await expect(page.locator('input[placeholder="Product Name"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Price"]')).toBeVisible();
    await expect(page.locator('textarea[placeholder="Description"]')).toBeVisible();
    await expect(page.locator('select')).toBeVisible();
  });

  test('User can input product name, price, and description', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/product`);
    await page.fill('input[placeholder="Product Name"]', 'Test Product');
    await page.fill('input[placeholder="Price"]', '99');
    await page.fill('textarea[placeholder="Description"]', 'This is a test product description.');

    const nameValue = await page.inputValue('input[placeholder="Product Name"]');
    const priceValue = await page.inputValue('input[placeholder="Price"]');
    const descriptionValue = await page.inputValue('textarea[placeholder="Description"]');

    expect(nameValue).toBe('Test Product');
    expect(priceValue).toBe('99');
    expect(descriptionValue).toBe('This is a test product description.');
  });

  test('User can upload and preview images', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/product`);
    await page.fill('input[placeholder="Product Name"]', 'Test Product');
    await page.fill('input[placeholder="Price"]', '99');
    await page.fill('textarea[placeholder="Description"]', 'This is a test product description.');

    const imagePath = path.resolve(__dirname, '../src/Assets/background.jpg');
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(imagePath);

    const previewImage = page.locator('#createProductFormImage img');
    await expect(previewImage).toBeVisible();
  });

  test('User can select a category from the dropdown', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/product`);
    const categorySelect = page.locator('select');
    await categorySelect.selectOption({ index: 1 });
    const selectedCategory = await categorySelect.inputValue();
    expect(selectedCategory).toBe('Denim');
  });

  test('User can create a product', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/product`);

    // Fill out the form
    await page.fill('input[placeholder="Product Name"]', 'Test Product1');
    await page.fill('input[placeholder="Price"]', '99');
    await page.fill('textarea[placeholder="Description"]', 'This is a test product description.');

    const imagePath = path.resolve(__dirname, '../src/Assets/background.jpg');
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(imagePath);

    const categorySelect = page.locator('select');
    await categorySelect.selectOption({ index: 1 });

    // Click the Create button
    await page.click('button[type="submit"]');

  });
});
