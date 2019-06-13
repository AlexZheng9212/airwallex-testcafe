import { Selector, t } from 'testcafe';
import { selectOption } from './utils';


export default class PaymentSelector {
  constructor() {
    // beneficiary selector
    this.addBeneficiary = Selector('button[data-test="select_beneficiary_button"]');
    this.personal = Selector('div[data-test="new_contact_entity_type_personal"]');
    this.firstName = Selector('input[name="firstName"]');
    this.lastName = Selector('input[name="lastName"]');
    this.phone = Selector('input[name="additionalInfo.personalMobileNumber"]');
    this.region = 'new_contact_address_country_code';
    this.street = Selector('input[name="address.streetAddress"]');
    this.city = Selector('input[name="address.city"]');
    this.method = Selector('div[data-test="new_contact_payment_methods_local"]');
    this.bankCode = Selector('input[name="bankDetails.accountRoutingValue1"]');
    this.bankName = Selector('input[name="bankDetails.bankName"]');
    this.accountNumber = Selector('input[name="bankDetails.accountNumber"]');
    this.saveChange = Selector('button[data-test="airwallex_confirm_modal_submit"]');

    // payment selector
    this.sourceCCY = 'source_currency';
    this.reference = Selector('input[name="reference"]');
    this.reason = 'payment_form_reason';
    this.confirmPayment = Selector('button[data-test="submit_payment_button"]');
    this.paymentCCY = Selector('div[data-test="payment_form_payment_amount"]> div > div > input');
    this.checkbox = Selector('input[type="checkbox"]');
    this.bookConfirm = Selector('button[data-test="airwallex_confirm_modal_submit"]');
    this.checkAmount = Selector('dd[data-test="payment_confirm_modal_beneficiary_amount"]');
  }

  async createBeneficiary() {
    await t
      .click(this.addBeneficiary)
      .click(this.personal)
      .typeText(this.firstName, 'Test')
      .typeText(this.lastName, 'Cafe');
    await selectOption(this.region, 'HK');
    await t
      .typeText(this.street, 'Street 001')
      .typeText(this.city, 'HK')
      .click(this.method)
      .typeText(this.bankCode, '016')
      .typeText(this.accountNumber, '478000164501')
      .typeText(this.bankName, 'DBS BANK (HONG KONG) LIMITED', { replace: true })
      .click(this.saveChange);
  }

  async createPayment(source, pamt, url) {
    await t
      .navigateTo(`${url}payments/new`);
    await this.createBeneficiary();
    await selectOption(this.sourceCCY, source);
    await selectOption(this.reason, 'Freight');
    await t
      .typeText(this.paymentCCY, pamt, { replace: true })
      .typeText(this.reference, 'testcafe')
      .click(this.confirmPayment)
      .expect(this.checkAmount.innerText)
      .eql('5,123.00')
      .click(this.checkbox)
      .click(this.bookConfirm);
  }
}
