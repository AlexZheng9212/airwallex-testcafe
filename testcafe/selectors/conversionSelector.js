import { Selector, t } from 'testcafe';
import { selectOption } from './utils';

export default class ConversionSelector {
  constructor() {
    this.sell = 'conversion_sell_currency';
    this.buy = 'conversion_buy_currency';
    this.confirm = Selector('button[data-test="conversion_confirm_button"]');
    this.checkbox = Selector('input[type="checkbox"]');
    this.confirmSubmit = Selector('button[data-test="airwallex_confirm_modal_submit"]');
    this.editSellAmount = 'div[data-test="conversion_sell_edit"]';
    this.editBuyAmount = 'div[data-test="conversion_buy_edit"]';
    this.sellAmount = 'input[id="sellAmount"]';
    this.catBuyAmount = 'div[data-test="conversion_form_buy-quote-amount"]';
    this.h2 = Selector('h2');
  }

  async createConversion(buy, sell, url) {
    await t
      .navigateTo(`${url}conversions/new`);
    await selectOption(this.sell, sell);
    await selectOption(this.buy, buy);
    await t
      .click(this.editSellAmount)
      .typeText(this.sellAmount, '5000', { replace: true })
      .wait(1000)
      .click(this.confirm)
      .click(this.checkbox)
      .click(this.confirmSubmit)
      .expect(this.h2.innerText)
      .eql('Conversion booking complete');
  }
}
