import { expect, Locator, Page } from "@playwright/test";

export class ProductListPage {
  readonly page: Page;
  readonly textProductName: Locator;
  readonly textProductPrice: Locator;
  readonly buttonAddToCart: Locator;
  readonly buttonRemoveFromCart: Locator;
  readonly buttonCart: Locator;
  readonly buttonBurger: Locator;
  readonly buttonLogout: Locator;
  ProductName: string = "";
  ProductPrice: string = "";

  constructor(page: Page) {
    this.page = page;
    this.textProductName = page.locator(
      "(//div[@data-test='inventory-item']//a/div)",
    );
    this.textProductPrice = page.locator(
      "(//div[@data-test='inventory-item-price'])",
    );
    this.buttonAddToCart = page.locator("(//button[text()='Add to cart'])");
    this.buttonRemoveFromCart = page.locator("(//button[text()='Remove'])");
    this.buttonCart = page.locator("//a[@class='shopping_cart_link']");
    this.buttonBurger = page.locator("#react-burger-menu-btn");
    this.buttonLogout = page.locator("#logout_sidebar_link");
  }

  async userIsOnProductListPage() {
    await expect(this.textProductName.first()).toBeVisible();
    await expect.soft(this.textProductPrice.first()).not.toBeVisible();
    await expect(this.buttonAddToCart.first()).toBeVisible();
  }

  async addProductToCart(ProductName: string) {
    if (ProductName == "random") {
      const totalProducts = await this.textProductName.count();
      const random = Math.floor(Math.random() * totalProducts) + 1;
      const index = random.toString();
      const textProductName = this.page.locator(
        `(//div[@data-test='inventory-item']//a/div)[${index}]`,
      );
      const textProductPrice = this.page.locator(
        `(//div[@data-test='inventory-item-price'])[${index}]`,
      );
      const buttonAddToCart = this.page.locator(
        `(//button[text()='Add to cart'])[${index}]`,
      );
      this.ProductName = (await textProductName.textContent()) || "";
      this.ProductPrice = (await textProductPrice.textContent()) || "";
      console.log("Product Name: " + this.ProductName);
      console.log("Product Price: " + this.ProductPrice);
      await buttonAddToCart.click();
    } else {
      const textProductName = this.page.locator(
        `(//div[@data-test='inventory-item']//a/div[contains(text(), '${ProductName}')])`,
      );
      const textProductPrice = this.page.locator(
        `(//div[@data-test='inventory-item']//a/div[contains(text(), '${ProductName}')])/ancestor::div[@class="inventory_item_label"]/following-sibling::div//div[@data-test='inventory-item-price']`,
      );
      const buttonAddToCart = this.page.locator(
        `(//div[@data-test='inventory-item']//a/div[contains(text(), '${ProductName}')])/ancestor::div[@class="inventory_item_label"]/following-sibling::div//div[@data-test='inventory-item-price']/following-sibling::button`,
      );
      this.ProductName = (await textProductName.textContent()) || "";
      this.ProductPrice = (await textProductPrice.textContent()) || "";
      console.log("Product Name: " + this.ProductName);
      console.log("Product Price: " + this.ProductPrice);

      await buttonAddToCart.click();
    }
  }

  async productSuccessAddToCart() {
    await expect(this.buttonRemoveFromCart).toBeVisible();
  }

  async userGoToCartPage() {
    await this.buttonCart.click();
  }

  async userLogout() {
    await this.buttonBurger.click();
    await this.buttonLogout.click();
    // await this.page.waitForTimeout(5000); // 5000 ms = 5 detik
  }
}
