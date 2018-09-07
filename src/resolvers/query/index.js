import AccountQuery from './account';
import BoardQuery from './board';

export default {
  Query: {
    ...AccountQuery,
    ...BoardQuery
  }
};
