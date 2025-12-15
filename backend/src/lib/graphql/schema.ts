import merge from 'lodash.merge' // For merging schemas

// use .js extension in imports to enable ES module support 
// otherwise code will not be compliled in production
import { GlobalTypeDefs } from './global.schema.js'; 

export const typeDefs = [GlobalTypeDefs]; // add other typeDefs in this array as we create more schemas
export const resolvers = merge({ // merging multiple resolvers
    Query: {}, // should be same as globaltypeDefs (Query in GlobalTypeDefs and query here ❌)
    Mutation: {},
});