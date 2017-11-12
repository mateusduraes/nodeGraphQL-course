import { postMutations } from './resources/post/post.schema';
import { userMutations } from './resources/user/user.schema';

const Mutation: string = `
    type Mutation {
        ${postMutations}
        ${userMutations}
    }
`;

export { Mutation };