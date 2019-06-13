import faker from 'faker';
import { clientTemplate } from '../data/clientTemplate';

class SignInfo {
  constructor(email, nationality) {
    this.firstName = faker.name.firstName();
    this.lastName = faker.name.firstName();
    this.email = email;
    this.password = 'Abcde1234';
    this.userInfo = clientTemplate(this.email, this.firstName, this.lastName, nationality);
  }
}

export default SignInfo;
