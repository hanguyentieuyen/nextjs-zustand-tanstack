import { test, expect } from "@playwright/test";

test("should display a message when button is clicked", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  const button = await page.getByTestId("test-button");
  await button.click();

  const text = await page.getByTestId("test-show-text");
  await expect(text).toHaveText("Happy lunar new year!");
});
