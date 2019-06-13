/* eslint-disable no-param-reassign */
const requestToken = async (client, id, key) => {
  try {
    const { data: res } = await client.post('/authentication/login', null, {
      headers: {
        'x-client-id': `${id}`,
        'x-api-key': `${key}`,
      },
    });
    client.defaults.headers.Authorization = `Bearer ${res.token}`;
    return res;
  } catch (error) {
    throw new Error(error);
  }
};


const authentication = client => ({
  login: (id, key) => requestToken(client, id, key),
});

export default authentication;
