import AccountQuery from './account';
import BoardQuery from './board';
import TenantQuery from './tenant';

export default {
  Query: {
    ...AccountQuery,
    ...BoardQuery,
    ...TenantQuery
  }
};
