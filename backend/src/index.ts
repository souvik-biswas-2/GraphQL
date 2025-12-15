import dotenv from 'dotenv';
import 'express-async-errors'; // no need of try catch error handling everywhere
// set a global error handler

dotenv.config();

// without dotenv import and config can't access .env variables
// console.log('Reading Envs', process.env.NODE_ENV);

// External Imports
import cors from 'cors'; // setup communication between front end and backend
import express from 'express';
import http from 'http';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServer } from '@apollo/server';
import { resolvers, typeDefs } from './lib/graphql/schema.js';

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || 'dev';
const graphqlPath = process.env.GRAPHQL_PATH || '/gql';

// console.log(graphqlPath);

const app = express();

const server = http.createServer(app);

// apollo server initialization
// typedefinion and resolver as parameter
const apolloServer = new ApolloServer( {
    typeDefs : typeDefs,
    resolvers : resolvers,
    // enabling playground in dev only
    // connecting http server with graphql server
    plugins : [ ApolloServerPluginDrainHttpServer( { httpServer : server} ) ],
    introspection : env !== "production",
} )

// while only setup express i directly write app.listen(port)
// but here i setup GraphQL that why creating a HTTP server with {Express + GraphQL}
async function startServer() {
    console.log("Server Started");
    await new Promise<void>((resolve) => 
        server.listen( { port },resolve ),
    ).then( () => {
        console.log(`Server is stated at http:localhost:${port}`);
        
    })
}

startServer();
