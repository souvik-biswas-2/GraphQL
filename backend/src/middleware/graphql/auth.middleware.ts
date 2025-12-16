// middlware works in graphql not similar like express 

import { error } from 'console';
import { Request } from 'express';
import { GraphQLError } from 'graphql';


// authorization is not a async function
export const AuthMiddlewareGraphQL = ( req : Request) => {
    const AuthHeader = req.headers?.authorization ?? '';
    if (!AuthHeader){
        throw new GraphQLError('Authentication Header is missing');
    }
    const authToken = AuthHeader.split(' ')[1];

    if(authToken !== process.env.AUTH_TOKEN){
        throw new GraphQLError('Authentication Failed');
    }
}

// add header in apollo server sandbox 
// name - Authorization 
// value - Bearer your_auth_token