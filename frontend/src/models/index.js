// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { CompanyDocument, UserCompany, Company } = initSchema(schema);

export {
  CompanyDocument,
  UserCompany,
  Company
};