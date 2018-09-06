import { AccountQuery } from './account';
import { BoardQuery } from './board';

const Query = {
  Query: {
    ...AccountQuery,
    ...BoardQuery
  }
};

export { Query };
