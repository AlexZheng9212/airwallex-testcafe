const user = client => ({
  getapiKey: () => client.post('/user/account/apiKey', null),
  account: () => client.get('/user/account'),
});
export default user;
