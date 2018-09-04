import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolvers";
import typeDefs from "./typedefs";

//let schemas = [];
//for (t of typedefs) { schemas.push(makeExecutableSchema({ typeDefs: t })); }

//const schema = mergeSchemas({ schemas: schemas, resolvers: [...resolvers] });

const schema = makeExecutableSchema({ typeDefs: [...typeDefs], resolvers });
//console.log(schema);

//module.exports = { schema };
export { schema };
