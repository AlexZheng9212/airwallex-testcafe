import { Selector, t } from 'testcafe';


export default class BatchPaymentSelector {
  constructor() {
    // upload valid selector
    this.dropzone = 'input[type="file"]';
    this.valid = 'button[data-test="validAndGetQuoteButton"]';
    this.totalCount = Selector('dd[data-test="totalCount"]');
    this.successCount = Selector('dd[data-test="sucessedCount"]');
    this.bookButton = 'button[data-test="validAndGetQuoteButton"]';
    this.result = Selector('div[data-test="batch_success_header"] > h1').with({ timeout: 70000 });
  }


  async createBatchPayment(url) {
    await t
      .navigateTo(`${url}payments/batch`)
      .setFilesToUpload(this.dropzone, ['../../fixtures/upload/BasicBatch.xlsx'])
      .click(this.valid)
      .expect(this.totalCount.innerText)
      .eql('8')
      .expect(this.successCount.innerText)
      .eql('8')
      .click(this.bookButton)
      .expect(this.result.innerText)
      .eql('Batch payment successfully booked');
  }
}
