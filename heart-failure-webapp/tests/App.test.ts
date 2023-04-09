import { chromium } from 'playwright';
import { test, expect, Page } from '@playwright/test';


test.describe('Heart Disease Prediction App', () => {
  let browser, page;

  
  test.beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:5173/');
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test('should display a form', async () => {
    const form = await page.$('form');
    expect(form).not.toBeNull();
  });

  test('should display a submit button', async () => {
    const submitButton = await page.$('[type="submit"]');
    expect(submitButton).not.toBeNull();
  });

  test('should display alert with fill out all form fileds message', async () => {
    await page.click('form button[type="submit"]');
    
  });

  test('should display result after form submission', async () => {
    await page.fill('form input[name="age"]', '50');
    await page.selectOption('form select[name="sex"]', { value: 'Male' });
    await page.fill('form input[name="restingBP"]', '120');
    await page.fill('form input[name="cholesterol"]', '190');

    
    const fastingBloodSugarInput = await page.$('form input[name="fastingBloodSugar"]');
    console.log(`Value before: ${await fastingBloodSugarInput.getAttribute('value')}`);
    await page.selectOption('form input[name="fastingBloodSugar"]', { value: 'Yes' });
    console.log(`Value after: ${await fastingBloodSugarInput.getAttribute('value')}`);



    await page.fill('form input[name="maxHR"]', '80');
    await page.selectOption('form input[name="exerciseInducedAngina"]', {value:'No'});
    await page.fill('form input[name="oldPeak"]', '0.2');
    await page.selectOption('form input[name="chestPainType"]', {value:'ASY'});
    await page.selectOption('form input[name="restingECG"]',{value: 'Normal'});
    await page.selectOption('form input[name="ST_Slope"]', {value:'Up'});

    await page.click('form button[type="submit"]');

    const alert = await page.waitForAlert();
    await alert.accept();
  });
});
