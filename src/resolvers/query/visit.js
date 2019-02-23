import Visit from '../../models/visit.js';

export default {
  allSubjects: async (_, { studyId, siteId }, ctx) => {
    return Visit.getAllSubjects(ctx.conn.knex, studyId, siteId, 1, ctx.userId);
  }
};
