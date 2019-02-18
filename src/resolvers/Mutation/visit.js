import Visit from '../../models/visit.js';

export default {
  // subjectData = firstName, middleInitial, lastName, gender, dob, isDobApprox
  // eslint-disable-next-line
  registerSubject: async (_parent, subjectData, ctx, _info) => {
    const subject = Visit.registerSubject(ctx.conn.knex, {
      updatedBy: ctx.userId,
      tenantId: ctx.tenantId,
      ...subjectData
    });
    ctx.conn.pubsub.publish('subjectRegistered', {
      subjectRegistered: subject
    }); // trigger a change to all subscriptions to a new board
    return subject;
  }
};
