/* eslint-disable import/prefer-default-export */
export const user = client => ({
  initClientAPI: accountId => client.post(`/internal/account/${accountId}/initClient`),
  enableClientAPI: accountId => client.post(`/internal/account/${accountId}/changeState/ENABLED`),
  disableClientAPI: accountId => client.post(`/internal/account/${accountId}/changeState/DISABLED`),
  updateClientApiSettings: (accountId, updates) => client.post(`/internal/account/${accountId}/clientApiSettings`, updates).then(
    res => new Promise((resolve) => {
      setTimeout(() => {
        resolve(res);
      }, 5000);
    }),
  ),
});
