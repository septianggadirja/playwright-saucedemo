import {expect, Locator, Page} from "@playwright/test";

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly textTitleCheckoutOverview: Locator;
  readonly textProductName: Locator;
  readonly textPaymentInfo: Locator;
  readonly textShippingInfo: Locator;
  readonly textTax: Locator;
  readonly textTotal: Locator;
  readonly buttonFinish: Locator;

  constructor(page: Page) {
    this.page = page;
    this.textTitleCheckoutOverview = page.locator('[data-test="title"]');
    this.textProductName = page.locator('[data-test="inventory-item-name"]');
    this.textPaymentInfo = page.locator('[data-test="payment-info-value"]');
    this.textShippingInfo = page.locator('[data-test="shipping-info-value"]');
    this.textTax = page.locator('[data-test="tax-label"]');
    this.textTotal = page.locator('[data-test="total-label"]');
    this.buttonFinish = page.locator('[data-test="finish"]');
  }

  async userIsOnCheckoutOverviewPage() {
    await expect(this.textTitleCheckoutOverview).toBeVisible();
  }

  async verifyProductInCheckoutOverview(ProductName: string) {
    const actualProductName = await this.textProductName.textContent();
    expect(actualProductName).toBe(ProductName);
  }

  async userFinishCheckout() {
    await this.buttonFinish.click();
  }
}