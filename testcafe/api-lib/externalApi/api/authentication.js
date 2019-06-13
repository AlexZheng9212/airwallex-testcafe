/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
const requestToken = async (client, params) => {
  const res = await client.post('/authenticate', { username: params.username, password: params.password }, { headers: { 'Content-Type': 'application/json' } });
  client.defaults.headers['x-auth-token'] = res.data.data.token;
  return res;
};
export const authentication = client => ({
  login: params => requestToken(client, params),
});
