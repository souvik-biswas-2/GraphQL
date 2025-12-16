import merge from 'lodash.merge' // For merging schemas

// use .js extension in imports to enable ES module support 
// otherwise code will not be compliled in production
import { GlobalTypeDefs } from './global.schema.js'; 
import { BookResolver, BookTypeDef } from '../../model/book.model.js';

export const typeDefs = [GlobalTypeDefs, BookTypeDef]; // add other typeDefs in this array as we create more schemas
// export const resolvers = merge({ // merging multiple resolvers
//     Query: {}, // should be same as globaltypeDefs (Query in GlobalTypeDefs and query here ❌)
//     Mutation: {},
// });



// it is called course splitting  // that why we are using specific version (lodash create conflicts)
// Course splitting in GraphQL refers to splitting a 
// large schema into multiple smaller, modular files for 
// better organization and maintainability.
// Large schemas become hard to manage. 
// Splitting separates concerns like 
// users, products, orders into individual files 
// (e.g., user.graphql, product.graphql). 
// Tools like graphql-tools merge them using mergeTypeDefs().
export const resolvers = merge ([BookResolver]);