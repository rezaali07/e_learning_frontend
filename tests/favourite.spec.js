import { expect, test } from "@playwright/test";

const PRODUCT_URL = "http://localhost:4000/product/67bf41c27a02749e00c424a4";
const FAVOURITES_URL = "http://localhost:4000/favourites";

test.describe("Favourite Items Page Tests", () => {

  test("1️⃣ Add product to favourites and verify", async ({ page }) => {
    await page.goto(PRODUCT_URL);

    // Click 'Add to Favourites' button
    await page.click(".wishlist");

    // Navigate to favourites page
    await page.goto(FAVOURITES_URL);

    // Verify the favourite item is present
    await expect(page.locator(".FavouriteItemsCard")).toBeVisible();
  });

  test("2️⃣ Remove product from favourites", async ({ page }) => {
    await page.goto(PRODUCT_URL);

    // Click 'Add to Favourites' button
    await page.click(".wishlist");

    // Navigate to favourites page
    await page.goto(FAVOURITES_URL);

    // Ensure favourite item exists before removing
    const favouriteItem = page.locator(".FavouriteItemsCard");
    await expect(favouriteItem).toBeVisible();

    // Click the "Remove" button inside the FavouriteItemsCard
    await page.click(".FavouriteItemsCard p"); // ✅ Correct selector

    // Wait for the item to disappear
    await expect(favouriteItem).not.toBeVisible();
  });


  test("3️⃣ Add to cart from favourites", async ({ page }) => {
    await page.goto(PRODUCT_URL);

    // Click 'Add to Favourites' button
    await page.click(".wishlist");

    // Navigate to favourites page
    await page.goto(FAVOURITES_URL);

    // Ensure favourite item exists
    await expect(page.locator(".FavouriteItemsCard")).toBeVisible();

    // Click "Add To Cart" button
    await page.click(".favouritesButton");
  });

});
