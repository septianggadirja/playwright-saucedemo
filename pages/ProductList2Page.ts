import { expect, Locator, Page } from '@playwright/test';

export class ProductList2Page {
    readonly page: Page;
    readonly textTitleProducts: Locator;
    readonly textProductName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.textTitleProducts = page.locator('[data-test="title"]');
        this.textProductName = page.locator('[data-test*="title-link"]');
    }

    async userIsOnProductList2Page() {
        await expect(this.textTitleProducts).toBeVisible();
        await expect(this.textProductName.first()).toBeVisible();
    }

    async goToProductDetailPage(){
        const totalProducts = await this.textProductName.count();
        const randomIndex = Math.floor(Math.random() * totalProducts);
        const productName = await this.textProductName.nth(randomIndex).textContent();
        console.log("Product Name: " + productName);
        await this.textProductName.nth(randomIndex).click();
    }
}
