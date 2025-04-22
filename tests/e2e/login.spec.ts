import { expect, test } from "@playwright/test";

test("Login page should load and allow login", async ({ page }) => {
  await page.goto("/signin");

  // Verify login form exists
  await expect(page).toHaveURL(/.*signin/);
  await expect(page.locator("h1")).toContainText("Sign in");

  // Fill the form
  await page.fill('input[name="email"]', "admin@example.com");
  await page.fill('input[name="password"]', "password");

  // Submit
  await page.click('button[type="submit"]');

  // Validate redirect
  await expect(page).toHaveURL(/.*dashboard/);
});
