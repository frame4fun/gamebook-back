import { v5 as uuid } from 'uuid';
import * as modelUtils from './AbstractModelUtils';

const tableName = 'Paragraph';

export async function create(title: string, number: string, text: string) {
  const id = uuid(
    number + title + text,
    'af11f7b1-e25d-416e-b282-7e2b3d9f52c6'
  );
  return modelUtils.create(id, tableName, { title, number, text, id });
}
