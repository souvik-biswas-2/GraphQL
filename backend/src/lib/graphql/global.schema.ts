import gql from 'graphql-tag';


// GraphQL Global Type Definitions
export const GlobalTypeDefs = gql`
    # Scalar Definitions (lowercase - scalar)
    scalar Date 
    scalar JSON
    # Type Definitions
    type Query {
        _empty: String
    }
    type Mutation {
        _empty: String
    }
`