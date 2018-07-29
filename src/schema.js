const { makeExecutableSchema, mergeSchemas } = require('graphql-tools');
const resolvers = require('./resolvers');
const typedefs = require('./typedefs');

let schemas = [];
for (t of typedefs) {
  schemas.push(makeExecutableSchema({ typeDefs: t }));
}

const schema = mergeSchemas({
  schemas: schemas,
  resolvers: [...resolvers]
});

module.exports = { schema };