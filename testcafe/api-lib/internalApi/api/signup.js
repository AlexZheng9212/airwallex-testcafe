/* eslint-disable import/prefer-default-export */
export const signup = client => ({
  changePassword: data => client.post('/internal/changePassword', data),
  changeKYCStatus: (accountId, status) => client.get('/internal/compliance/changeKyc', {
    params: {
      accountId,
      status,
      note: status,
    },
  }),
  deleteUser: email => client.post('/internal/deleteUser', email),
});
