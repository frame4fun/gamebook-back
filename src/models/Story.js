import neo4jDriver from '../neo4jDriver';

import uuid from 'uuid/v5';

export async function create(title, description, author) {
  const session = neo4jDriver.session();
  const id = uuid(title + author, '6ade1bc8-9dff-45a0-bae3-2587ee694992');
  const result = await session.run(
    ' CREATE (s:Story {title: $title, description: $description, author: $author, id: $id});',
    { title: title, description: description, author: author, id: id }
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
