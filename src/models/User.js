import neo4jDriver from '../neo4jDriver';
import uuid from 'uuid/v5';

export async function create(alias, email, password) {
  const session = neo4jDriver.session();
  const id = uuid(email, 'bca724aa-ee65-444a-a76d-74a94a57e200');
  const result = await session.run(
    ' CREATE (u:User {alias: $alias, email: $email, password: $password, id: $id});',
    { alias, email, password, id }
  );
  session.close();
  return result;
}

export async function findById(id) {
  const session = neo4jDriver.session();
  const result = await session.run(' MATCH(u:User {id: $id}) return u;', {
    id,
  });
  session.close();
  return result;
}

export async function findByEmail(email) {
  const session = neo4jDriver.session();
  const result = await session.run(' MATCH(u:User {email: $email}) return u;', {
    email,
  });
  session.close();
  return result;
}
