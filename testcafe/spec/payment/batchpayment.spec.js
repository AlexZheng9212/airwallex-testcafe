/* eslint-disable no-undef */
import faker from 'faker';
import { setUp } from '../../support/common/setUp';
import LoginSelector from '../../selectors/loginSelector';
import BatchPaymentSelector from '../../selectors/batchpaymentSelector';


let email;
let WebAppUrl;
let internalApi;
let externalApi;
const loginSelector = new LoginSelector();
const batchSelector = new BatchPaymentSelector();

fixture('Batch Payment Test').before(async () => {
  const firstName = faker.name.firstName();
  email = `testcafe_${firstName}@airwallex.com`;
  ({ externalApi, internalApi, WebAppUrl } = await setUp(email));
  const Detail = await externalApi.user.account();
  await internalApi.wallet.depositWallet({
    amount: '966667',
    reference: Detail.data.shortRef,
    bankAccountId: Detail.data.settlementAccountIds.NZD,
    statementRef: '990',
  });
  await internalApi.wallet.depositWallet({
    amount: '966667',
    reference: Detail.data.shortRef,
    bankAccountId: Detail.data.settlementAccountIds.USD,
    statementRef: '990',
  });
});
test('Basic Test', async () => {
  await loginSelector.login(email, 'Abcde1234', WebAppUrl);

  await batchSelector.createBatchPayment(WebAppUrl);
});
