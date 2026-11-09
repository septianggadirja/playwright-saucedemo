import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly inputUserName: Locator;
    readonly inputPassword: Locator;
    readonly buttonLogin: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputUserName = page.locator('#user-name');
        this.inputPassword = page.locator('#password');
        this.buttonLogin = page.locator('//input[@id="login-button"]');
        this.errorMessage = page.locator("//h3[@data-test='error']");
    }

    async userGoToLoginPage() {
        await this.page.goto('/');
    }

    async userIsOnLoginPage() {
        await expect(this.inputUserName).toBeVisible();
        await expect(this.inputPassword).toBeVisible();
        await expect(this.buttonLogin).toBeVisible();
    }

    async userinputUserName(username: string) {
        await this.inputUserName.fill(username);
    }

    async userinputPassword(password: string) {
        await this.inputPassword.fill(password);
    }

    async clickLoginButton() {
        await this.buttonLogin.click();
    }

    async getErrorMessage(expectedErrorMessage: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(expectedErrorMessage);
    }

    async loginWithValidCredentials(username: string, password: string) {
        await this.userGoToLoginPage();
        await this.userIsOnLoginPage();
        await this.userinputUserName(username);
        await this.userinputPassword(password);
        await this.clickLoginButton();
    }
}