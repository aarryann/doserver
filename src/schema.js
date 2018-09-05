import { makeExecutableSchema, mergeSchemas } from "graphql-tools";
import resolvers from "./resolvers";
import * as typeDefs from "./typedefs";
//import { Account, Board } from "./typedefs";

//console.log(typeDefs);
let schemas = [];
for (let t of Object.values(typeDefs)) {
  schemas.push(makeExecutableSchema({ typeDefs: t }));
}

const schema = mergeSchemas({ schemas: schemas, resolvers: [...resolvers] });

//const schema = makeExecutableSchema({ typeDefs: [...typeDefs], resolvers });
//const schema = makeExecutableSchema({ typeDefs: Account, resolvers });
//console.log(schema);

//module.exports = { schema };
export { schema };
