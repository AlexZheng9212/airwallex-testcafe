module.exports = {
  clientTemplate: {
    identificationType: {
      AU: 'PASSPORT',
      CN: 'CN_NATIONAL_ID',
    },
    identificationNumber: {
      AU: 'AU0000000',
      CN: 'CN0000000',
    },
    address: {
      AU: {
        countryCode: 'AU',
        addressLine1: 'Melbourne St',
        addressLine2: 'Melbourne St',
        suburb: 'Melbourne',
        state: 'VIC',
        postcode: '3000',
      },
      CN: {
        countryCode: 'CN',
        addressLine1: 'Shanghai St',
        addressLine2: 'Shanghai St',
        suburb: 'Shanghai',
        state: 'SH',
        postcode: 'SH-09090',
      },
    },

  },
};
