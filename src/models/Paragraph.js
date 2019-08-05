import neo4jDriver from '../neo4jDriver';

import uuid from 'uuid/v5';

// eslint-disable-next-line no-unused-vars
export async function create(previousId, title, number, text, choices) {
  const session = neo4jDriver.session();
  const id = uuid(
    number + title + previousId,
    'af11f7b1-e25d-416e-b282-7e2b3d9f52c6'
  );
  const result = await session.run(
    'CREATE (s:Story {title: $title, description: $description, author: $author, id: $id});',
    { title: title, description: text, author: 'toto', id: id }
  );
  session.close();
  return result;
}

export async function findById(id) {
  const session = neo4jDriver.session();
  const result = await session.run('MATCH(s:Story {id: $id}) return s;', {
    id,
  });
  session.close();
  return result;
}

export async function findAll() {
  const session = neo4jDriver.session();
  const result = await session.run('MATCH(s:Story) return COUNT(s) as count;');
  session.close();
  return result;
}
