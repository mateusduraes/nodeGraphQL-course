import { makeExecutableSchema } from 'graphql-tools';

const usersMock: any = [
    {
        id: 1,
        name: 'Mateus',
        email: 'mduraes1994@gmail.com'
    },
    {
        id: 2,
        name: 'petoso',
        email: 'petoso@gmail.com'
    },
];

const typeDefs = `
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        allUsers: [User!]!
    }
`;

const resolvers = {
    Query: {
        allUsers: () => []
    }
};

export default makeExecutableSchema({ typeDefs, resolvers });