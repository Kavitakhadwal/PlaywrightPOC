


import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import LoginPage from '../src/pages/LoginPage';
import CartPage from '../src/pages/CartPage';

const testDataPath = path.resolve(__dirname, '../TestData/loginDemo_TestData.json');
const users = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));

const storageStatePath = path.resolve(__dirname, '../TestData/storageState.json');

test('Login and save state storage', async ({ page }) => {
	const loginPage = new LoginPage(page);
	await loginPage.goto('https://www.amazon.in/');
	await loginPage.gotoLogin();
	await loginPage.login(users[0].email, users[0].password);
	// Optionally, add something to cart here if needed
	await page.context().storageState({ path: storageStatePath });
});

test('Access cart with saved state', async ({ browser }) => {
	const context = await browser.newContext({ storageState: storageStatePath });
	const page = await context.newPage();
	const cartPage = new CartPage(page);
	await cartPage.goto('https://www.amazon.in/');
	await cartPage.gotoCart();
	// You can now access the cart without logging in again
	const cartCount = await cartPage.getCartCount();
	expect(cartCount).toBeGreaterThanOrEqual(0); // Adjust as needed
	await context.close();
});


