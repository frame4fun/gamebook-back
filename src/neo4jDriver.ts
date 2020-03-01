import neo4j from 'neo4j-driver';

const neo4jDriver = neo4j.driver(
  process.env.NEO4J_URL as string,
  neo4j.auth.basic(
    process.env.NEO4J_USER as string,
    process.env.NEO4J_PASSWORD as string
  )
);

export default neo4jDriver;
