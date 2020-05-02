import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import { DbTypes } from '@partituras/events';
import { queries, types } from '@partituras/schemas';
import { createRequester } from './utils/createRequester';
import { InterfaceTypeDefinitionNode } from 'graphql';

const PORT = process.env.PORT || 4000;

const typeDefs = [
  ...Object.values(types) as unknown[],
  ...Object.values(queries) as unknown[],
] as InterfaceTypeDefinitionNode[];

const requester = createRequester('MongoDB Requester');

const resolvers = {
  Query: {
    getById: (_, args) => requester.send(DbTypes.GET_BY_ID, {id: args.id}),
    getAll: (_, args) => requester.send(DbTypes.GET_ALL, {offset: args.offset, page_size: args.pageSize}),
    search: (_, args) => requester.send(DbTypes.SEARCH, {query: args.query}),
    getRandom: (_, args) => requester.send(DbTypes.GET_RANDOM, {count: args.count}),
  },
};

const schema = makeExecutableSchema({typeDefs, resolvers})

const server = new ApolloServer({schema});

server.listen({port: PORT}).then(({port}) => {
  console.log(`GraphQL server is running at ${port}`);
});

export default {};
