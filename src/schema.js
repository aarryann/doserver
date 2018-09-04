const { makeExecutableSchema, mergeSchemas } = require("graphql-tools");
const resolvers = require("./resolvers");
const typeDefs = require("./typedefs");

//let schemas = [];
//for (t of typedefs) { schemas.push(makeExecutableSchema({ typeDefs: t })); }

//const schema = mergeSchemas({ schemas: schemas, resolvers: [...resolvers] });

const schema = makeExecutableSchema({ typeDefs: [...typeDefs], resolvers });
//console.log(schema);

module.exports = { schema };
