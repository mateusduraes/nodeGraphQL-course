import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { GraphQLResolveInfo } from "graphql";

export const userResolvers = {

    Query: {
        users: (parent, { first = 10, offset = 0}, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
            return db.User
                .findAll({
                    limit: first,
                    offset: offset
                });
        },

        user: () => {

        }
    }

};