// eslint-disable-next-line
import Tenant from '../../models/tenant.js';

export default {
  tenantByUrl: async (_, { url }, ctx) => {
    // eslint-disable-next-line
    return Tenant.getTenantByUrl(ctx.conn.knex, url);
  }
};
