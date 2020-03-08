import * as modelUtils from './AbstractModelUtils';
import { v5 as uuid } from 'uuid';

const tableName = 'User';

export async function create(alias, email, password) {
  const id = uuid(email, 'bca724aa-ee65-444a-a76d-74a94a57e200');
  return modelUtils.create(tableName, { alias, email, password, id });
}
