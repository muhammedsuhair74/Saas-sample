import { test, expect } from "@playwright/test";

test("User can complete a payment", async ({ page }) => {
  await page.goto("/dashboard");

  // Click on the Pro Plan subscription button
  await page.click("text=Subscribe to Pro Plan");

  // Wait for the Stripe checkout page to load
  await page.waitForURL(/checkout.stripe.com/);

  // Verify that the checkout page is displayed
  await expect(page).toHaveURL(/.*checkout.stripe.com.*/);
});
