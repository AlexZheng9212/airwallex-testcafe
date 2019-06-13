import { Selector, t } from 'testcafe';
import faker from 'faker';
import { selectOption } from './utils';


export default class GlobalAccountSelector {
  constructor() {
    // ga selector
    this.newGA = 'button[data-test="new_glocal_account_button"]';
    this.accountCCY = 'global_account_create_account_form_v_2_currency';
    this.nickName = 'div[data-test="global_account_create_account_form_v_2_nick_name"] > div > div > input';
    this.create = 'button[data-test="global_account_v_2_create_button"]';
    this.bar = Selector('div[data-test="alert_hook"] > div');
    this.back = 'button[data-test="back_to_account_list_button"]';

    // link Platform
    this.newStore = 'button[data-test="stores-create-button"]';
    this.platform = 'platform_details';
    this.storeName = 'div[data-test="global_account_ecommerce_connect_form_name_of_store"] > div > div > input';
    this.storeId = 'div[data-test="global_account_ecommerce_connect_form_amazon_seller_id"] > div > div > input';
    this.authToken = 'div[data-test="global_account_ecommerce_connect_form_auth_token"] > div > div > input';
    this.linkStore = 'button[type="Submit"]';
    this.update = 'button[data-test="reauthorise_stores_link"]';
  }


  async createGlobalAccount(url) {
    await t
      .navigateTo(`${url}globalaccount/accounts`)
      .click(this.newGA);
    await selectOption(this.accountCCY, 'USD');
    await t
      .typeText(this.nickName, 'Test Mocha')
      .click(this.create)
      .expect(this.bar.innerText)
      .match(/Your new account is created/); // ', '\r\n\r\nYour new account is created');
    await this.linkPlatform();
  }

  async linkPlatform() {
    const randomId = await faker.random.alphaNumeric(13);
    await t
      .click(this.newStore);
    await selectOption(this.platform, 'Amazon');
    await t
      .typeText(this.storeName, 'Cafe Store')
      .typeText(this.storeId, randomId)
      .typeText(this.authToken, '001001110110')
      .click(this.linkStore)
      .expect(this.bar.innerText)
      .match(/New platform is linked/)
      .click(this.update)
      .typeText(this.storeName, ' update')
      .click(this.linkStore);
  }
}
