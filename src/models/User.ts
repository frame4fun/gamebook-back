import { v5 as uuid } from 'uuid';
import { QueryResult } from 'neo4j-driver';
import * as modelUtils from './AbstractModelUtils';
import { User } from '../types';

const tableName = 'User';

export async function create(
  alias: string,
  email: string,
  password: string
): Promise<void> {
  const id = uuid(email, 'bca724aa-ee65-444a-a76d-74a94a57e200');
  modelUtils.create(id, tableName, { alias, email, password, id });
}

export async function findById(id: string): Promise<User | null> {
  return modelUtils.findOne<User>(tableName, { id });
}

export async function findByEmail(email: string): Promise<User | null> {
  return modelUtils.findOne<User>(tableName, { email });
}

export async function findAll(): Promise<User[]> {
  return modelUtils.findAll<User>(tableName);
}
