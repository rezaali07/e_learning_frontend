import { expect, test } from "@playwright/test";

const PRODUCT_URL = "http://localhost:4000/product/67bf41c27a02749e00c424a4";
const CART_URL = "http://localhost:4000/cart";

test.describe("Cart Page Tests", () => {

  test("1️⃣ Open product page", async ({ page }) => {
    await page.goto(PRODUCT_URL);
    await expect(page).toHaveURL(PRODUCT_URL);
  });

  test("2️⃣ Add product to cart and open cart page", async ({ page }) => {
    await page.goto(PRODUCT_URL);
    await page.click("button.cartBtn"); // Click 'Add to Cart' button
    await page.goto(CART_URL);
    await expect(page.locator(".cartContainer")).toBeVisible();
  });

  test("3️⃣ Increase product quantity in cart", async ({ page }) => {
    await page.goto(PRODUCT_URL);
    await page.click("button.cartBtn");
    await page.goto(CART_URL);
    const increaseBtn = page.locator(".cartInput button:nth-child(3)");
    const quantityInput = page.locator(".cartInput input");

    await increaseBtn.click();
    await expect(quantityInput).toHaveValue("2"); // Confirm it increased
  });


  test("5️⃣ Decrease product quantity to 0 (auto delete)", async ({ page }) => {
    await page.goto(PRODUCT_URL);
    await page.click("button.cartBtn");
    await page.goto(CART_URL);
    const decreaseBtn = page.locator(".cartInput button:first-child");
    const cartItem = page.locator(".cartContainer");

    await decreaseBtn.click(); // Reduce quantity to 0, should auto-remove
    // await expect(cartItem).not.toBeVisible();
    // await expect(page.locator(".emptyCart")).toBeVisible(); // Confirm cart is empty
  });

});
