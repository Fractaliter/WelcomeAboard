// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { UserCompany, Company } = initSchema(schema);

export {
  UserCompany,
  Company
};