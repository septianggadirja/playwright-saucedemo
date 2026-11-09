import {expect, Locator, Page} from "@playwright/test";

export class FinishCheckoutPage {
  readonly page: Page;
  readonly textTitleCheckoutComplete: Locator;
  readonly textCheckoutCompleteMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.textTitleCheckoutComplete = page.locator('//span[@data-test="title" and text()="Checkout: Complete!"]');
    this.textCheckoutCompleteMessage = page.locator('//h2[@data-test="complete-header" and text()="Thank you for your order!"]');
  }

    async userIsOnFinishCheckoutPage() {
      await expect(this.textTitleCheckoutComplete).toBeVisible();
      await expect(this.textCheckoutCompleteMessage).toBeVisible();
    }
}