
import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import LoginPage from '../src/pages/LoginPage';

const testDataPath = path.resolve(__dirname, '../TestData/loginDemo_TestData.json');
const users = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));

test.describe('Demo login with multiple users', () => {
  for (const user of users) {
    test(`Login as ${user.email}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto('https://www.amazon.in/');
      await loginPage.gotoLogin();
      await loginPage.login(user.email, user.password);
    });
  }
});













