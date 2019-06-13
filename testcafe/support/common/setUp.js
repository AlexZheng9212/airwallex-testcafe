/* eslint-disable import/prefer-default-export */
/* eslint-disable no-use-before-define */

import SignInfo from './classes/setup';
import api from '../../api-lib';
import { loggingHelping } from '../config/logger';
import tsconfig from '../../testconfigs/env.json';
import { sleep } from './utils';
import cnInboundSettings from '../../fixtures/defaultConfig.json';


let internalApi;
let externalApi;
let airwallexApi;
let WebAppUrl;

export const setUp = async (email, nationality = 'CN') => {
  const { env } = tsconfig;
  console.log(env);
  const endpoint = tsconfig.endpoints[env];
  console.log(endpoint);
  // global.webAppUrl = endpoint.webAppUrl;
  internalApi = await api.createInternalApi();
  await internalApi.init(endpoint.internalApiUrl);
  externalApi = await api.createExternalApi();
  await externalApi.init(endpoint.externalApiUrl);
  airwallexApi = await api.createAirwallexApi();
  await airwallexApi.init(endpoint.clientApiUrl);
  WebAppUrl = endpoint.webAppUrl;
  await setInterceptor([airwallexApi, externalApi, internalApi]);


  await internalApi.authentication.login({ url: '/token', username: endpoint.opEmail, password: endpoint.opPassword });
  await internalApi.backdoor.toggleCaptcha('false');
  const accountId = await registerAndKyc(email, nationality);
  endpoint.accountId = accountId;
  await internalApi.user.initClientAPI(accountId);
  await internalApi.user.enableClientAPI(accountId);
  await internalApi.user.updateClientApiSettings(accountId, cnInboundSettings);
  const { data: apikeyRes } = await externalApi.user.getapiKey();
  endpoint.clientId = apikeyRes.clientId;
  endpoint.apiKey = apikeyRes.apiKey;
  await airwallexApi.authentication.login(endpoint.clientId, endpoint.apiKey);
  return {
    externalApi, internalApi, airwallexApi, WebAppUrl,
  };
};

const registerAndKyc = async (Email, nationality) => {
  console.log(Email);
  const si = new SignInfo(Email, nationality);
  // await safeDeleteUser(Email, internalApi);
  await externalApi.signup.signUp({
    captcha: {
      token: '',
      scene: '',
      sessionId: '',
    },
    data: {
      email: Email,
      password: 'Abcde1234',
      referral: 'Dan',
    },
  });
  const { data: activationKey } = await internalApi.backdoor.getActivationKey(Email);
  await externalApi.signup.verifyUser({
    email: Email,
    activationKey,
  });
  sleep(3000);
  await internalApi.signup.changePassword({ email: Email, password: 'Abcde1234' });
  await externalApi.authentication.login({ username: Email, password: 'Abcde1234' });
  await externalApi.signup.bussinessDetails(si.userInfo.businessDetails);
  await externalApi.signup.beneficialOwners(si.userInfo.beneficialOwners);
  await externalApi.signup.directorDetails(si.userInfo.directorDetails);
  await externalApi.signup.primaryContact(si.userInfo.primaryContact);
  await externalApi.signup.confirmClient();
  const { data: res } = await externalApi.signup.getAccount();
  await internalApi.signup.changeKYCStatus(res.id, KYC_STATUS.SUCCESS);
  return res.id;
};


// export const safeDeleteUser = async (email, instance) => {
//   await instance.signUp.deleteUser({ email });
// };

const setInterceptor = async (clientList) => {
  clientList.forEach(
    (client) => {
      client.interceptors.request.use(loggingHelping.reqInterceptor);
      client.interceptors.response.use(loggingHelping.resInterceptor,
        loggingHelping.errInterceptor);
    },
  );
};

const KYC_STATUS = {
  SUCCESS: 'SUCCESS',
};
