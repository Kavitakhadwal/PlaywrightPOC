import BasePage from './BasePage';
import { Page } from '@playwright/test';

export default class HomePage extends BasePage {
  readonly searchInputSelector = '#twotabsearchtextbox';
  readonly searchButtonSelector = 'input[type="submit"][value="Go"]';

  constructor(page: Page) {
    super(page);
  }

  async searchFor(term: string) {
    await this.page.fill(this.searchInputSelector, term);
    await this.page.press(this.searchInputSelector, 'Enter');
  }
}
