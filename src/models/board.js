const getOwnedBoards = async(knex, userId) => {
  const rows = await knex.select({
      id: 'id', name: 'name', slug: 'slug'
    })
    .from('boards').where('user_id', userId);

  return rows;
} 

const getInvitedBoards = async(knex, userId) => {
  const rows = await knex.select({
      id: 'id', name: 'name', slug: 'slug'
    })
    .from('boards').where('user_id', userId);

  return rows;
} 

const createBoard = async(knex, boardName, userId) => {
  try {
    const insertedId = await knex('boards').insert(
      { name: boardName, 
        slug: boardName.toLowerCase().replace(/[^\w-]+/g, '-'),
        user_id: userId
      });
    const rows = await knex.select({
       id: 'id', name: 'name', slug: 'slug'
      })
      .from('boards').where('id', insertedId[0]);
    return rows[0];
  } catch(e) {
    throw new Error('Board add failed');
  }
} 

module.exports = {
  getOwnedBoards,
  getInvitedBoards,
  createBoard
}