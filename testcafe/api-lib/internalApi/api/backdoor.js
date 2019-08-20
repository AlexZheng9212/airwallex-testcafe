/* eslint-disable import/prefer-default-export */

export const backdoor = client => ({
  toggleCaptcha: captcha => client.post('/backdoor/captchaEnabled', captcha, { headers: { 'Content-Type': 'application/json' } }),
  getEmailValidationCode: email => client.get('/backdoor/account/activationKey', { params: { email }, transformResponse: [data => data] }, { headers: { 'Content-Type': 'application/json' } }),
  getActivationKey: email => client.get('/backdoor/account/activationKey', {
    params: { email },
    transformResponse: [data => data], // prevent axios parsing code as int, from https://stackoverflow.com/questions/43787712/axios-how-to-deal-with-big-integers
  }),
  deleteUser: data => client.post('/internal/deleteUser', data),
});
