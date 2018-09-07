import AccountMutation from './account';
import BoardMutation from './board';

export default {
  Mutation: {
    ...AccountMutation,
    ...BoardMutation
  }
};
