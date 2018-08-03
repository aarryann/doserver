const getBoardMembers = async(knex, boardId) => {
  const rows = await knex.from('users as u')
    .innerJoin('user_boards as ub', 'ub.userId', 'u.id')
    .where('ub.boardId', boardId)
    .select('u.*');

  return rows;
} 

const getCardMembers = async(knex, cardId) => {
  const rows = await knex.from('users as u')
    .innerJoin('user_boards as ub', 'ub.userId', 'u.id')
    .innerJoin('card_members as cm', 'cm.userBoardId', 'ub.id')
    .where('cm.cardId', cardId)
    .select('u.*');

  return rows;
} 

const getBoardDetails = async(knex, boardId) => {
  const rows = await knex.select('*')
    .from('boards').where('id', boardId);

  return rows[0];
} 

const getOwnedBoards = async(knex, userId) => {
  const rows = await knex.select('*')
    .from('boards').where('owner', userId);

  return rows;
} 

const getMemberBoards = async(knex, userId) => {
  const rows = await knex.from('boards as b')
    .innerJoin('user_boards as ub', 'ub.boardId', 'b.id')
    .where('ub.userId', userId)
    .select('b.*');

  return rows;
} 

const getOtherBoards = async(knex, userId) => {
  const subquery = knex('user_boards').where('owner', userId)
  .select('boardId');
  const rows = await knex.select('*')
    .from('boards').where('id', 'not in', subquery);

  return rows;
} 

const getListDetails = async(knex, listId) => {
  const rows = await knex.select('*')
    .from('lists').where('id', listId);
    console.log(rows[0]);

  return rows[0];
} 

const getListsForBoard = async(knex, boardId) => {
  const rows = await knex.select('*')
    .from('lists').where('boardId', boardId);

  return rows;
} 

const getCardDetails = async(knex, cardId) => {
  const rows = await knex.select('*')
    .from('cards').where('id', cardId);

  return rows[0];
} 

const getCardsForList = async(knex, listId) => {
  const rows = await knex.select('*')
    .from('cards').where('listId', listId);

  return rows;
} 

const getCommentsForCard = async(knex, cardId) => {
  const rows = await knex.select('*')
    .from('comments').where('cardId', cardId);

  return rows;
} 

const createBoard = async(knex, board) => {
  board.slug = board.name.toLowerCase().replace(/[^\w-]+/g, '-');
  board.updatedAt = knex.fn.now();
  return knex.transaction( async (trx) => {
    const insertedBoard = await trx('boards')
    .insert( board );
    board.id = insertedBoard[0];
      
    await trx('user_boards').insert({ 
        userId: board.owner, boardId: board.id, 
        updatedUserId: board.updatedUserId, updatedAt: board.updatedAt
      });
      
    return board;
  })
  .then((board) => board)
  .catch(function(e) {
    throw new Error('Board add failed: '+ error.message);
  });  
} 

const createList = async(knex, list) => {
  list.updatedAt = knex.fn.now();
  return knex.transaction( async (trx) => {
    const maxPos = await trx('lists').max('position as a')
      .where('boardId', list.boardId);
    let position = 1024;
    try {
      if(maxPos[0].a !== null){
        position += parseInt(maxPos[0].a);
      }
    } catch(e){}
    list.position = position;

    const insertedList = await trx('lists').insert( list );
    list.id = insertedList[0];

    return list;
  })
  .then((list) => list)
  .catch(function(e) {
    throw new Error('List add failed: ' + e.message);
  });  
} 

const createCard = async(knex, card) => {
  card.updatedAt = knex.fn.now();
  return knex.transaction( async (trx) => {
    const maxPos = await trx('cards').max('position as a')
      .where('listId', card.listId);

    let position = 1024;
    try {
      if(maxPos[0].a !== null){
        position += parseInt(maxPos[0].a);
      }
    } catch(e){}
    card.position = position;
    console.log(card);

    const insertedCard = await trx.into('cards').insert( card );
    card.id = insertedCard[0];

    return card;
  })
  .then((card) => card)
  .catch((e) => { throw new Error('Card add failed: ' + e.message) });  
} 

const addCardComment = async(knex, comment) => {
  comment.updatedAt = knex.fn.now();
  return knex.transaction( async (trx) => {
    const insertedComment = await trx('comments').insert( comment );
    comment.id = insertedComment[0];

    return comment;
  })
  .then((comment) => comment)
  .catch(function(e) {
    throw new Error('Comment add failed: ' + e.message);
  });  
} 

const addBoardMember = async(knex, email, boardId) => {
  userBoard.updatedAt = knex.fn.now();
  return knex.transaction( async (trx) => {
    const rows = await trx('users').select('*')
      .where('email', email);
    userBoard.userId = rows[0].id; 
    const insertedMember = await trx('user_boards').insert( userBoard ); 
    userBoard.id = insertedMember[0];
    return userBoard;
  })
  .then((member) => member)
  .catch(function(e) {
    throw new Error('Add Board member failed: ' + e.message);
  });  
} 

const addCardMember = async(knex, userId, boardId, cardId) => {
  return knex.transaction( async (trx) => {
    let rows = await trx.from('user_boards as ub')
      .where('ub.boardId', boardId).andWhere('ub.userId', userId)
      .select({ id: 'ub.id' })

    await trx.into('card_members').insert({ 
        cardId: cardId, userBoardId: rows[0].id, updatedAt: knex.fn.now()
      });

    rows = await trx('cards').select('*')
      .where('id', cardId);

    return rows;
  })
  .then((card) => card)
  .catch(function(e) {
    throw new Error('Add card member failed: ' + e.message);
  });  
} 

const removeCardMember = async(knex, userId, boardId, cardId) => {
  return knex.transaction( async (trx) => {
    const rows = await trx.from('user_boards as ub')
      .innerJoin('card_members as cm', 'cm.userBoardId', 'ub.id')
      .where('ub.boardId', boardId).andWhere('ub.userId', userId)
      .andWhere('cm.cardId', cardId)
      .select({ id: 'cm.id' })

    await trx.from('card_members')
      .where('cm.id', rows[0].id).del();

    rows = await trx('cards').select('*')
      .where('id', cardId);

    return rows;
  })
  .then((card) => card)
  .catch(function(e) {
    throw new Error('Remove card member failed: ' + e.message);
  });  
} 

module.exports = {
  getBoardDetails,
  getBoardMembers,
  getCardMembers,
  getOwnedBoards,
  getMemberBoards,
  getOtherBoards,
  getListDetails,
  getListsForBoard,
  getCardDetails,
  getCardsForList,
  getCommentsForCard,

  createBoard,
  createList,
  createCard,
  addBoardMember,
  addCardMember,
  addCardComment,
  removeCardMember,
}