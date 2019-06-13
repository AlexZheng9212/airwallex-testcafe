import faker from 'faker';

import { setUp } from '../../support/common/setUp';
import LoginSelector from '../../selectors/loginSelector';

let email;
let WebAppUrl;
const loginSelector = new LoginSelector();

fixture('Login Test').before(async () => {
  const firstName = faker.name.firstName();
  email = `testcafe${firstName}@airwallex.com`;
  ({ WebAppUrl } = await setUp(email));
});
test('Basic', async (t) => {
  await loginSelector.login(email, 'Abcde1234', WebAppUrl);
});
