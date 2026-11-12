import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductListPage } from "../pages/ProductListPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { FinishCheckoutPage } from "../pages/FinishCheckoutPage";
import { generateRandomData } from "../utils/common";
import { ProductList2Page } from "../pages/ProductList2Page";
import { ProductDetailPage } from "../pages/ProductDetailPage";

const APP_USERNAME = process.env.APP_USERNAME!;
const APP_PASSWORD = process.env.APP_PASSWORD!;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginWithValidCredentials(APP_USERNAME, APP_PASSWORD);
  const productPage = new ProductListPage(page);
  await productPage.userIsOnProductListPage();
});

test.afterEach(async ({ page }) => {
  const productPage = new ProductListPage(page);
  await productPage.page.goto("/inventory.html");
  await productPage.userLogout();
});

type CheckoutData = {
  productname: string;
};

const checkoutData: CheckoutData[] = [
  { productname: "Backpack" },
  { productname: "random" },
];
for (const orderData of checkoutData) {
  test(
    "User successfully place order with product : " + orderData.productname,
    {
      tag: "@regression",
    },
    async ({ page }) => {
      const productPage = new ProductListPage(page);
      const cartPage = new CartPage(page);
      const checkoutPage = new CheckoutPage(page);
      const checkoutOverviewPage = new CheckoutOverviewPage(page);
      const finishCheckoutPage = new FinishCheckoutPage(page);
      const data = generateRandomData();

      await test.step("GIVEN User is on product list page", async () => {
        await productPage.userIsOnProductListPage();
      });
      await test.step("WHEN User add product to cart", async () => {
        await productPage.addProductToCart(orderData.productname);
        await productPage.productSuccessAddToCart();
        await productPage.userGoToCartPage();
        await cartPage.userIsOnCartPage();
        await cartPage.verifyProductInCart(
          productPage.ProductName,
          productPage.ProductPrice,
        );
      });
      await test.step("AND User click checkout button", async () => {
        await cartPage.userClickCheckoutButton();
        await checkoutPage.userIsOnCheckoutPage();
      });
      await test.step("AND User input checkout information", async () => {
        await checkoutPage.userInputCheckoutInformation(
          data.firstName,
          data.lastName,
          data.postalCode,
        );
      });
      await test.step("AND User click continue button", async () => {
        await checkoutPage.userClickContinueButton();
      });
      await test.step("AND User verify checkout overview", async () => {
        await checkoutOverviewPage.userIsOnCheckoutOverviewPage();
        await checkoutOverviewPage.verifyProductInCheckoutOverview(
          productPage.ProductName,
        );
      });
      await test.step("AND User finish checkout", async () => {
        await checkoutOverviewPage.userFinishCheckout();
      });
      await test.step("AND User is on finish checkout page", async () => {
        await finishCheckoutPage.userIsOnFinishCheckoutPage();
      });
    },
  );
}

test("User add product from product detail page @test", async ({ page }) => {
  const productList2Page = new ProductList2Page(page);
  const productDetailPage = new ProductDetailPage(page);
  const checkoutPage = new CheckoutPage(page);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  const finishCheckoutPage = new FinishCheckoutPage(page);
  const data = generateRandomData();
  const cartPage = new CartPage(page);
  await test.step("GIVEN User is on product list page", async () => {
    await productList2Page.userIsOnProductList2Page();
  });
  await test.step("WHEN User add product to cart", async () => {
    await productList2Page.goToProductDetailPage();
    await productDetailPage.userIsOnProductDetailPage();
    await productDetailPage.addProductToCart();
    await productDetailPage.goToCartPage();
    await cartPage.userIsOnCartPage();
    await cartPage.verifyProductInCart(
      productDetailPage.ProductName,
      productDetailPage.ProductPrice,
    );
    await test.step("AND User click checkout button", async () => {
      await cartPage.userClickCheckoutButton();
      await checkoutPage.userIsOnCheckoutPage();
    });
    await test.step("AND User input checkout information", async () => {
      await checkoutPage.userInputCheckoutInformation(
        data.firstName,
        data.lastName,
        data.postalCode,
      );
    });
    await test.step("AND User click continue button", async () => {
      await checkoutPage.userClickContinueButton();
    });
    await test.step("AND User verify checkout overview", async () => {
      await checkoutOverviewPage.userIsOnCheckoutOverviewPage();
      await checkoutOverviewPage.verifyProductInCheckoutOverview(
        productDetailPage.ProductName,
      );
    });
    await test.step("AND User finish checkout", async () => {
      await checkoutOverviewPage.userFinishCheckout();
    });
    await test.step("AND User is on finish checkout page", async () => {
      await finishCheckoutPage.userIsOnFinishCheckoutPage();
    });
  });
});
