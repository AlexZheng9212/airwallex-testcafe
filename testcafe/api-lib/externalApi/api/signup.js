/* eslint-disable import/prefer-default-export */
export const signup = client => ({
  captchaCheck: () => client.get('/v2/captchaEnabled', { headers: { 'Content-Type': 'application/json' } }),
  signUp: data => client.post('/user', data),
  activation: data => client.post('/v2/user?type=TEST', data),
  getPhoneValidationCode: data => client.post('/v2/user/verifyPhone?type=TEST', data),
  getEmailValidationCode: data => client.post('v2/user/verifyEmail?type=TEST', data),
  verifyUser: data => client.post('/user/validate', data),
  bussinessDetails: data => client.put('/draft/user/account/businessDetails', data),
  beneficialOwners: beneficialDetails => client.put('/draft/user/account/beneficialOwners', beneficialDetails),
  directorDetails: data => client.put('/draft/user/account/directorDetails', data),
  primaryContact: data => client.put('/draft/user/primaryContact', data),
  getAccount: () => client.get('/user/account'),
  confirmClient: () => client.put('/draft/user/account/confirm', null),
  settingPass: data => client.post('/v2/user/account', data),
});

// export default signup;
