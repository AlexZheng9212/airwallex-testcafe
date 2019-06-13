/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */


const param = { grant_type: 'auth', data: { tokenType: 'password', email: 'testadmin@airwallex.com', password: 'Testing1' } };

const requestToken = async (client) => {
  const { data: res } = await client.post('/token', param);
  client.defaults.headers.Authorization = `Bearer ${res.id_token}`;
  return res;
};

export const authentication = client => ({
  login: params => requestToken(client, params),
});
