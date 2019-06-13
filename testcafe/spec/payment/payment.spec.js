/* eslint-disable no-undef */
// import { t } from 'testcafe';
import faker from 'faker';
import { setUp } from '../../support/common/setUp';
import LoginSelector from '../../selectors/loginSelector';
import PaymentSelector from '../../selectors/paymentSelector';


let email;
let WebAppUrl;
let internalApi;
let externalApi;
const loginSelector = new LoginSelector();
const paymentSelector = new PaymentSelector();

fixture('Payment Test').before(async () => {
  const firstName = faker.name.firstName();
  email = `testcafe_${firstName}@airwallex.com`;
  ({ externalApi, internalApi, WebAppUrl } = await setUp(email));
  const Detail = await externalApi.user.account();
  await internalApi.wallet.depositWallet({
    amount: '966667',
    reference: Detail.data.shortRef,
    bankAccountId: Detail.data.settlementAccountIds.SGD,
    statementRef: '990',
  });
});
test('Basic Test', async () => {
  await loginSelector.login(email, 'Abcde1234', WebAppUrl);

  await paymentSelector.createPayment('SGD', '5123', WebAppUrl);
});
