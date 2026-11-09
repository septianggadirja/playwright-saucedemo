import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
    readonly buttonCheckout: Locator;
    readonly textProductName: Locator;
    readonly textProductPrice: Locator;
    readonly textTitleCart: Locator;
    readonly buttonRemoveFromCart: Locator;
    ProductName: string = '';
    ProductPrice: string = '';

    constructor(page: Page) {
        this.page = page;
        this.textTitleCart = page.locator('//span[@data-test="title" and text()="Your Cart"]');
        this.buttonCheckout = page.locator('[data-test="checkout"]');
        this.textProductName = page.locator('[data-test="inventory-item-name"]');
        this.textProductPrice = page.locator('[data-test="inventory-item-price"]');
        this.buttonRemoveFromCart = page.locator('#remove-sauce-labs-backpack');
    }

    async userIsOnCartPage() {
        await expect(this.textTitleCart).toBeVisible();
    }

    async verifyProductInCart(ProductName: string, ProductPrice: string) {
        const actualProductName = await this.textProductName.textContent();
        const actualProductPrice = await this.textProductPrice.textContent();
        expect(actualProductName).toBe(ProductName);
        expect(actualProductPrice).toBe(ProductPrice);
    }

    async userClickCheckoutButton() {
        await this.buttonCheckout.click();
    }
}
