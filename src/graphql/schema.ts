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

    type Mutation {
        createUser(name: String!, email: String!): User
    }

`;

const resolvers = {
    User: {
        id: (user) => user.id,
        name: (user) => user.name,
        email: (user) => user.email
    },

    Query: {
        allUsers: () => usersMock
    },

    Mutation: {
        createUser: (parent, args) => {
            const newUser = Object.assign({id: usersMock.length + 1}, args)
            usersMock.push(newUser);
            return newUser;
        }        
    }
};

export default makeExecutableSchema({ typeDefs, resolvers });