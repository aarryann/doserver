const listOwnedBoards = async(knex, userId) => {
  const rows = await knex.select({
      id: 'id', name: 'name', slug: 'slug'
    })
    .from('boards').where('user_id', userId);

  return rows;
} 

const listInvitedBoards = async(knex, userId) => {
  const rows = await knex.select({
      id: 'id', name: 'name', slug: 'slug'
    })
    .from('boards').where('user_id', userId);

  return rows;
} 