import { Selector, t } from 'testcafe';

export default class LoginSelector {
  constructor() {
    this.loginEmail = Selector('input[name="email"]');
    this.loginPwd = Selector('input[name="password"]');
    this.loginButton = Selector('button[type="submit"]');
  }

  async login(email, pwd, url) {
    console.log(url);
    await t
      .navigateTo(url);
    console.log(email);
    await t
      .click(this.loginEmail)
      .typeText(this.loginEmail, email, { replace: true })
      .typeText(this.loginPwd, pwd)
      .click(this.loginButton)
      .wait(2000);
  }
}
