import { postQueries } from './resources/post/post.schema';
import { userQueries } from './resources/user/user.schema';

const Query: string = `
    type Query {
        ${postQueries}
        ${userQueries}        
    }
`;

export { Query };