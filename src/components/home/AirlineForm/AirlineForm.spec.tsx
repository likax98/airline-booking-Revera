import { test, expect, Page } from "@playwright/test";

import { addDays, startOfToday, dateToLocalISOString } from "@/lib/utils/dates";

import { ERROR_MESSAGES, LABELS, MESSAGES } from "./lib";

const URL = "http://localhost:3000";

test("fills and submits the airline form", async ({ page }) => {
  await fillAirlineForm(page);

  await expect(
    page.getByText(MESSAGES.BOOKING_CONFIRMED, { exact: true })
  ).toBeVisible();
});

test("shows error toast when booking fails", async ({ page }) => {
  await page.route("**/api/booking", async (route) => {
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ error: ERROR_MESSAGES.GENERIC_ERROR }),
    });
  });

  await fillAirlineForm(page);

  await expect(page.getByText(MESSAGES.BOOKING_FAILED)).toBeVisible();
});

// If we hardcode the date strings, it will break in the future. So we need to get today + days
export const getCalendarDay = (daysFromToday = 0): string => {
  const target = addDays(startOfToday(), daysFromToday);

  return dateToLocalISOString(target);
};

const fillAirlineForm = async (
  page: Page,
  {
    origin = "Paris",
    destination = "London",
    fromOffset = 0,
    toOffset = 1,
  }: {
    origin?: string;
    destination?: string;
    fromOffset?: number;
    toOffset?: number;
  } = {}
) => {
  const fromDate = getCalendarDay(fromOffset);
  const toDate = getCalendarDay(toOffset);

  await page.goto(URL);

  //We have multiple Select Origin that's why need locator here
  await page.getByText("Select Origin", { exact: true }).click();
  await page.getByRole("option", { name: origin }).click();

  await page.getByText("Select Destination").click();
  await page.getByRole("option", { name: destination }).click();

  await page.getByText("Select From Date").click();
  await page.locator(`[data-day="${fromDate}"]:visible`).click();

  await page.getByText("Select To Date").click();
  await page.locator(`[data-day="${toDate}"]:visible`).click();

  await page.getByRole("button", { name: LABELS.BOOK_FLIGHT }).click();
};
