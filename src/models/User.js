import * as modelUtils from './AbstractModelUtils';
import uuid from 'uuid/v5';

const tableName = 'User';

export async function create(alias, email, password) {
  const id = uuid(email, 'bca724aa-ee65-444a-a76d-74a94a57e200');
  return modelUtils.create(tableName, { alias, email, password, id });
}
