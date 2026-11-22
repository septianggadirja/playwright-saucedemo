import { expect, Locator, Page } from "@playwright/test";

export class ProductDetailPage {
  readonly page: Page;
  readonly textProductName: Locator;
  readonly textProductPrice: Locator;
  readonly buttonAddToCart: Locator;
  readonly buttonBackToProducts: Locator;
  readonly buttonCart: Locator;
  ProductName: string = "";
  ProductPrice: string = "";

  constructor(page: Page) {
    this.page = page;
    this.textProductName = page.locator('[data-test="inventory-item-name"]');
    this.textProductPrice = page.locator('[data-test="inventory-item-price"]');
    this.buttonAddToCart = page.locator('[data-test="add-to-cart"]');
    this.buttonBackToProducts = page.locator('[data-test="back-to-products"]');
    this.buttonCart = page.locator('[data-test="shopping-cart-link"]');
  }

  async userIsOnProductDetailPage(ProductName: string) {
    await expect(this.page).toHaveURL(/inventory-item.html\?id=/);
    await expect(this.buttonBackToProducts).toBeVisible();
    await expect(this.textProductName.filter({ hasText: ProductName })).toBeVisible();
    await expect(this.textProductPrice).toBeVisible();
    await expect(this.buttonAddToCart).toBeVisible();
    const productName = await this.textProductName.filter({ hasText: ProductName }).textContent();
    console.log("Product Name: " + productName);
    const productPrice = await this.textProductPrice.textContent();
    console.log("Product Price: " + productPrice);
    this.ProductName = productName || "";
    this.ProductPrice = productPrice || "";
  }

  async addProductToCart() {
    await this.buttonAddToCart.click();
  }

  async goToCartPage() {
    await this.buttonCart.click();
  }
}
