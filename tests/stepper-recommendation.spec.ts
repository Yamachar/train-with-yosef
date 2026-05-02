import { expect, test } from "@playwright/test";

test("completes the 5-step form and shows recommendation", async ({ page }) => {
  await page.goto("/plans/online");
  const nextButton = page.getByTestId("stepper-next");

  await expect(page.getByText("Step 1 of 5")).toBeVisible();
  await page.getByTestId("option-muscle-building").click();
  await expect(nextButton).toBeEnabled();
  await nextButton.click();

  await expect(page.getByText("Step 2 of 5")).toBeVisible();
  await page.getByTestId("option-intermediate").click();
  await expect(nextButton).toBeEnabled();
  await nextButton.click();

  await expect(page.getByText("Step 3 of 5")).toBeVisible();
  await page.getByTestId("option-4-5-days-week").click();
  await expect(nextButton).toBeEnabled();
  await nextButton.click();

  await expect(page.getByText("Step 4 of 5")).toBeVisible();
  await page.getByTestId("option-full-gym").click();
  await expect(nextButton).toBeEnabled();
  await nextButton.click();

  await expect(page.getByText("Step 5 of 5")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Your Recommended Plan" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Performance Online" })).toBeVisible();
});
