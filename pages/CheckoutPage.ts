import {expect, Locator, Page} from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly inputFirstName: Locator;
  readonly inputLastName: Locator;
  readonly inputPostalCode: Locator;
  readonly buttonContinue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputFirstName = page.locator('[data-test="firstName"]');
    this.inputLastName = page.locator('[data-test="lastName"]');
    this.inputPostalCode = page.locator('[data-test="postalCode"]');
    this.buttonContinue = page.locator('[data-test="continue"]');
  }

  async userIsOnCheckoutPage() {
    await expect(this.inputFirstName).toBeVisible();
    await expect(this.inputLastName).toBeVisible();
    await expect(this.inputPostalCode).toBeVisible();
    await expect(this.buttonContinue).toBeVisible();
  }

  async userInputCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.inputFirstName.fill(firstName);
    await this.inputLastName.fill(lastName);
    await this.inputPostalCode.fill(postalCode);

    console.log("First Name: " + firstName);
    console.log("Last Name: " + lastName);
    console.log("Postal Code: " + postalCode);
  }

  async userClickContinueButton() {
    await this.buttonContinue.click();
  }
}
