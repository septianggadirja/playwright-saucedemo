import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

const APP_USERNAME = process.env.APP_USERNAME!;
const APP_PASSWORD = process.env.APP_PASSWORD!;

//pakai type untuk mendefinisikan tipe data dari object invalidCredentials dan kalo lupa diisi atau typo akan muncul error
type InvalidCredentials = {
  scenario: string;
  username: string | null;
  password: string | null;
  expectedErrorMessage?: string; // ? mean Optional property for expected error message
};

const invalidCredentials: InvalidCredentials[] = [
  {
    scenario: "username dan password tidak diinput",
    username: null,
    password: null,
    expectedErrorMessage: "Epic sadface: Username is required",
  },
  {
    scenario: "password kosong",
    username: "standard_user",
    password: "",
    expectedErrorMessage: "Epic sadface: Password is required",
  },
  {
    scenario: "username tidak terdaftar",
    username: "anggaiseng",
    password: "secret_sauce",
    expectedErrorMessage:
      "Epic sadface: Username and password do not match any user in this service",
  },
  {
    scenario: "password salah",
    username: "standard_user",
    password: "anggaiseng",
    expectedErrorMessage:
      "Epic sadface: Username and password do not match any user in this service",
  },
];

for (const credentials of invalidCredentials) {
  test(`User failed to login with invalid credentials - ${credentials.scenario} @regression`, async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await test.step("GIVEN User go to login page", async () => {
      await loginPage.userGoToLoginPage();
    });
    await test.step("WHEN user is on login page", async () => {
      await loginPage.userIsOnLoginPage();
    });
    await test.step("AND user input invalid username and password", async () => {
      await loginPage.userinputUserName(credentials.username ?? "");
      await loginPage.userinputPassword(credentials.password ?? "");
    });
    await test.step("AND user click login button", async () => {
      await loginPage.buttonLogin.click();
    });
    await test.step("THEN user should see error message", async () => {
      await loginPage.getErrorMessage(credentials.expectedErrorMessage ?? "");
    });
  });
}

test("User successfully login with valid credentials @test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await test.step("GIVEN User go to login page", async () => {
    await loginPage.userGoToLoginPage();
  });
  await test.step("WHEN user is on login page", async () => {
    await loginPage.userIsOnLoginPage();
  });
  await test.step("AND user input valid username and password", async () => {
    await loginPage.userinputUserName(APP_USERNAME);
    await loginPage.userinputPassword(APP_PASSWORD);
  });
  await test.step("AND user click login button", async () => {
    await loginPage.buttonLogin.click();
  });
});