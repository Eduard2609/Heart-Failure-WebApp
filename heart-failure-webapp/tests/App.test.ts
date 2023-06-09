import { chromium } from 'playwright';
import { test, expect, Page } from '@playwright/test';


test.describe('Heart Failure Web App', () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.beforeEach(async () => {
    await page.goto('http://localhost:5173/');
  });

  test ('should complete the form', async () => {
    const browser = await chromium.launch({
  
    });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:5173/');
  await page.getByLabel('Age:').click();
  await page.getByLabel('Age:').fill('55');
  await page.getByText('Sex:--Please choose an option--MaleFemale').click();
  await page.getByRole('combobox', { name: 'Sex:' }).selectOption('Male');
  await page.getByLabel('Resting Blood Pressure:').click();
  await page.getByLabel('Resting Blood Pressure:').fill('80');
  await page.getByLabel('Cholesterol:').click();
  await page.getByLabel('Cholesterol:').fill('200');
  await page.getByText('Fasting Blood Sugar:--Please choose an option--YesNo').click();
  await page.getByRole('combobox', { name: 'Fasting Blood Sugar:' }).selectOption('No');
  await page.getByLabel('Maximum Heart Rate:').click();
  await page.getByLabel('Maximum Heart Rate:').fill('120');
  await page.getByText('Exercise-Induced Angina:--Please choose an option--YesNo').click();
  await page.getByRole('combobox', { name: 'Exercise-Induced Angina:' }).selectOption('Yes');
  await page.getByText('Oldpeak:').click();
  await page.getByPlaceholder('The ST depression induced by exercise relative to rest').fill('0.2');
  await page.getByText('Chest Pain Type:--Please choose an option--ASYATANAPTA').click();
  await page.getByRole('combobox', { name: 'Chest Pain Type:' }).selectOption('ASY');
  await page.getByText('Resting ECG:--Please choose an option--LVHNormalST').click();
  await page.getByRole('combobox', { name: 'Resting ECG:' }).selectOption('Normal');
  await page.getByText('ST Slope:--Please choose an option--DownFlatUp').click();
  await page.getByRole('combobox', { name: 'ST Slope:' }).selectOption('Up');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('The model predicted that the person is not likely to have heart disease, with a').click();
  
  // ---------------------
  await context.close();
  await browser.close();
  });

  test ('complete the form', async () => {
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
});

});