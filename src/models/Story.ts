/* eslint-disable import/prefer-default-export */
import { v5 as uuid } from 'uuid';
import * as modelUtils from './AbstractModelUtils';

const tableName = 'Story';

export async function create(
  title: string,
  description: string,
  author: string
) {
  const id = uuid(title + author, '6ade1bc8-9dff-45a0-bae3-2587ee694992');
  return modelUtils.create(id, tableName, { title, description, author, id });
}
