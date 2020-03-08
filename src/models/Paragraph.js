import * as modelUtils from './AbstractModelUtils';
import { v5 as uuid } from 'uuid';

const tableName = 'Paragraph';

export async function create(title, number, text) {
  const id = uuid(
    number + title + text,
    'af11f7b1-e25d-416e-b282-7e2b3d9f52c6'
  );
  return modelUtils.create(tableName, { title, number, text, id });
}
