import { v5 as uuid } from 'uuid';
import { QueryResult } from 'neo4j-driver';
import neo4jDriver from '../neo4jDriver';

interface Columns {
  [key: string]: string;
}

function requestListColumns(columns: Columns): string {
  const request = Object.entries(columns).map(([key, value]) => {
    return `${key}:"${value}"`;
  });
  return request.join(',');
}

export async function create(
  uuidKey: string,
  tableName: string,
  columns: Columns
): Promise<QueryResult> {
  const session = neo4jDriver.session();
  const id = uuid(
    Object.values(columns).reduce((x, y) => x + y),
    uuidKey
  );
  const request = `CREATE (s:${tableName} { ${requestListColumns({
    ...columns,
    id,
  })} });`;

  const result = await session.run(request);
  session.close();
  return result;
}

export async function findOne<T>(
  tableName: string,
  columns: Columns
): Promise<T> {
  const session = neo4jDriver.session();
  const query = `MATCH(s:${tableName} { ${requestListColumns(
    columns
  )} }) return s LIMIT 1;`;
  const queryResult = await session.run(query);
  const result: T = queryResult.records.map(record => {
    return record.get('s').properties;
  })[0];
  session.close();
  return result;
}

export async function findAll<T>(
  tableName: string,
  columns?: Columns
): Promise<T[]> {
  const session = neo4jDriver.session();

  const query = `MATCH(s:${tableName}) ${
    columns ? `${requestListColumns(columns)}` : ''
  } return s;`;

  const queryResult = await session.run(query);
  const results: T[] = queryResult.records.map(record => {
    return record.get('s').properties;
  });
  session.close();
  return results;
}
