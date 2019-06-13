/* eslint-disable no-undef */
import faker from 'faker';
import { setUp } from '../../support/common/setUp';
import LoginSelector from '../../selectors/loginSelector';
import GlobalAccountSelector from '../../selectors/globalaccountSelector';


let email;
let WebAppUrl;
const loginSelector = new LoginSelector();
const globalAccountSelector = new GlobalAccountSelector();

fixture('GlobalAccount Test').before(async () => {
  const firstName = faker.name.firstName();
  email = `testcafe_${firstName}@airwallex.com`;
  ({ WebAppUrl } = await setUp(email));
});
test('Basic Test', async () => {
  await loginSelector.login(email, 'Abcde1234', WebAppUrl);

  await globalAccountSelector.createGlobalAccount(WebAppUrl);
});
