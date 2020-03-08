import * as modelUtils from './AbstractModelUtils';
import { v5 as uuid } from 'uuid';

const tableName = 'Story';

export async function create(title, description, author) {
  const id = uuid(title + author, '6ade1bc8-9dff-45a0-bae3-2587ee694992');
  return modelUtils.create(tableName, { title, description, author, id });
}
