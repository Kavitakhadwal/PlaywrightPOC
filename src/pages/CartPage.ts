import BasePage from './BasePage';
import { Page } from '@playwright/test';

export default class CartPage extends BasePage {
  readonly cartCountSelector = '#nav-cart-count';

  constructor(page: Page) {
    super(page);
  }

  async gotoCart() {
    await this.page.click('#nav-cart');
  }

  async getCartCount() {
    const text = await this.page.textContent(this.cartCountSelector);
    return Number(text?.trim() || '0');
  }
}
