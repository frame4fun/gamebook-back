import neo4j from 'neo4j-driver';

const neo4jDriver = neo4j.driver(
  'http://localhost:7474',
  neo4j.auth.basic('neo4j', 'gamebook')
);
export default neo4jDriver;
