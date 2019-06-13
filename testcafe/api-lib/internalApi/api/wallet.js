const wallet = client => ({
  depositWallet: data => client.post('/internal/wallet/recordDeposit', data),
});
export default wallet;
