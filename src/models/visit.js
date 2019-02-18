const getActiveSubjects = async (knex, tenantId) => {
  const rows = await knex('subject')
    .select('*')
    .where('tenant', tenantId);

  return rows;
};

const registerSubject = async (knex, subject) => {
  subject.pid = subject.firstName.toLowerCase().replace(/[^\w-]+/g, '-');
  subject.updatedOn = knex.fn.now();
  return knex
    .transaction(async trx => {
      const insertedSubject = await trx('subject').insert(subject, 'id');
      subject.id = insertedSubject[0];

      return subject;
    })
    .then(addedSubject => addedSubject)
    .catch(e => {
      throw new Error('Registering subject failed: ' + e.message);
    });
};

export default {
  getActiveSubjects,

  registerSubject
};
