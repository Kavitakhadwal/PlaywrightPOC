import { Page, Locator } from '@playwright/test';

export default class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  locator(selector: string): Locator {
    return this.page.locator(selector);
  }
}
