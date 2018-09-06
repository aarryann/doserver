import { AccountMutation } from './account';
import { BoardMutation } from './board';

const Mutation = {
  Mutation: {
    ...AccountMutation,
    ...BoardMutation
  }
};

export { Mutation };
