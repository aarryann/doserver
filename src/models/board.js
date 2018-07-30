const getOwnedBoards = async(knex, userId) => {
  const rows = await knex.select({
      id: 'id', name: 'name', slug: 'slug', userId: 'user_id', 
      updatedAt: 'updated_at'
    })
    .from('boards').where('user_id', userId);

  return rows;
} 

const getInvitedBoards = async(knex, userId) => {
  const rows = await knex.select({
      id: 'id', name: 'name', slug: 'slug', userId: 'user_id', 
      updatedAt: 'updated_at'
    })
    .from('boards').where('user_id', userId);

  return rows;
} 

/*
const getOwnerDetails = async(knex, boardId) => {
  const rows = await knex.from('boards as b')
    .innerJoin('users as u', 'b.user_id', 'u.id').where('b.id', boardId)
    .select({
      id: 'u.id', firstName: 'first_name', lastName: 'last_name', email: 'email', 
      updatedAt: 'u.updated_at'
    });
  console.log(rows);
  return rows[0];
} 
*/

const createBoard = async(knex, boardName, userId) => {
  try {
    const insertedId = await knex('boards').insert(
      { name: boardName, 
        slug: boardName.toLowerCase().replace(/[^\w-]+/g, '-'),
        user_id: userId, updated_at: knex.fn.now()
      });
    const rows = await knex.select({
        id: 'id', name: 'name', slug: 'slug', userId: 'user_id', 
        updatedAt: 'updated_at'
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