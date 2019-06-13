/* eslint-disable import/no-unresolved */
import faker from 'faker';
import string from './string';

export const clientTemplate = (email, firstName, lastName, nationality) => ({
  primaryContact: {
    email,
    firstName,
    lastName,
    identificationNumber: 'Id123',
    identificationType: string.clientTemplate.identificationType[nationality],
    nationality,
    pep: false,
    langKey: 'en',
  },
  beneficialOwners: {
    id: '',
    nationality,
    firstName,
    lastName,
    dateOfBirth: '1982-03-22',
    identificationType: string.clientTemplate.identificationType[nationality],
    identificationNumber: string.clientTemplate.identificationNumber[nationality],
    ownership: '56',
    pep: true,
  },
  businessDetails: {
    optInForMarketing: false,
    agreedToTerms: false,
    address: string.clientTemplate.address[nationality],
    businessName: `${faker.company.companyName()}`,
    businessNameEnglish: `${faker.company.companyName()}`,
    businessRegistrationNumber: `${faker.random.number({
      min: 50000,
      max: 100000000000,
    })}`,
    businessStructure: 'COMPANY',
    industryCategory: 'Manufacturing',
    contactNumber: faker.phone.phoneNumberFormat(2),
  },
  directorDetails: {
    id: '',
    identificationType: string.clientTemplate.identificationType[nationality],
    nationality,
    firstName,
    lastName,
    identificationNumber: string.clientTemplate.identificationNumber[nationality],
    pep: true,
    dateOfBirth: '1986-04-22',
  },
  signatoryDetails:
    {
      email,
      id: '',
      pep: false,
      primary: true,
      firstName,
      lastName,
      langKey: 'en',
      identificationType: string.clientTemplate.identificationType[nationality],
      identificationNumber: string.clientTemplate.identificationNumber[nationality],
      nationality,
    },

});


export const KYCSTATUS = {
  SUCCESS: 'SUCCESS',
};
