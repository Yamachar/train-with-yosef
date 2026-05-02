import { expect, test } from "@playwright/test";

test("checkout API redirects to cancel when price is missing", async ({ request }) => {
  const response = await request.post("/api/checkout", {
    form: {
      planType: "plan-1to1-starter",
      priceId: "",
    },
    maxRedirects: 0,
  });

  expect(response.status()).toBe(303);
  const location = response.headers()["location"];
  expect(location).toContain("/cancel?reason=missing-price");
});

test("checkout API redirects to cancel when booking slot is missing", async ({ request }) => {
  const response = await request.post("/api/checkout", {
    form: {
      planType: "book-session",
      priceId: "",
      displayPrice: "15",
    },
    maxRedirects: 0,
  });

  expect(response.status()).toBe(303);
  const location = response.headers()["location"];
  expect(location).toContain("/cancel?reason=missing-slot");
});
