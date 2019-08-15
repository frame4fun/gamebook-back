import neo4jDriver from '../neo4jDriver';

import uuid from 'uuid/v5';

function requestListColumns(columns) {
  let request = ``;
  Object.entries(columns).forEach(function([key, value]) {
    request += `${key}:${value}, `;
  });
  return request;
}

// eslint-disable-next-line no-unused-vars
export async function create(uuidKey, tableName, columns) {
  const session = neo4jDriver.session();
  const id = uuid(Object.values(columns).reduce((x, y) => x + y), uuidKey);
  columns['id'] = id;
  const request = `CREATE (s:${tableName} { ${requestListColumns(columns)} });`;

  const result = await session.run(request);
  session.close();
  return result;
}

export async function find(tableName, columns) {
  const session = neo4jDriver.session();
  const request = `MATCH(s:${tableName} { ${requestListColumns(
    columns
  )} }) return s;`;
  const result = await session.run(request);
  session.close();
  return result;
}

export async function findAll(tableName) {
  const session = neo4jDriver.session();
  const result = await session.run(
    `MATCH(s:${tableName}) return COUNT(s) as count;`
  );
  session.close();
  return result;
}
