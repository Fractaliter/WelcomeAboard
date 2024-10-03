// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Ticket, CompanyDocument, UserCompany, Company } = initSchema(schema);

export {
  Ticket,
  CompanyDocument,
  UserCompany,
  Company
};