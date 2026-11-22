// hpfe pklx g5ki jyzf 7pzs v32g qzg4 u3uq
import { test, expect } from "@playwright/test";
import { generateSync } from "otplib";

export function getTotp(): string {
  const secret = 'oxsi dmrz dktn o3rr dio4 snuh lvtt cbcj'.replace(/\s/g, '').toUpperCase();
  return generateSync({ secret });
}

test("test", async ({ page }) => {
  await page.goto('https://agency-pro-staging.sequis.co.id/backyard/login?next=Ap%2FBLe%2BckxwdCFCSKA4Xiz03VW5oO9hmUTGfkOus6RgBYJeU12Kp9bd6xNNnEekvuLImUtUwvTsnlfsEVaZEpEgjGuaE%2BvJdWADOvg%3D%3D');
  await page.getByRole('button', { name: 'G Sign in with Google' }).click();
  await page.getByRole('textbox', { name: 'Email or phone' }).fill('muhammad.anggadirja@sequislife.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('seQuis@2023!');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByText('2-Step Verification', { exact: true }).click();
  await page.getByRole('button', { name: 'Try another way' }).click();
  await page.getByRole('link', { name: 'Get a verification code from' }).click();
  const totpCode = getTotp();
  console.log("Generated TOTP Code:", totpCode);
  await page.getByRole('textbox', { name: 'Enter code' }).fill(totpCode);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('link', { name: 'Project Logo' }).click();
});
