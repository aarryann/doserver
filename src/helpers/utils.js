import jwt from 'jsonwebtoken';

function getUserFromToken(auth) {
  // eslint-disable-next-line
  console.log(auth);
  // eslint-disable-next-line
  console.log(process.env.APP_SECRET);
  if (!auth || auth.length === 0) {
    // eslint-disable-next-line
    console.log('NULL check');
    return null;
  }
  const token = auth.replace('Bearer ', '');
  const { userId } = jwt.verify(token, process.env.APP_SECRET);
  return userId;
}

function getUserId(ctx, req) {
  if (!req && ctx) {
    req = ctx.request;
  }
  const Authorization = req.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    //console.log(userId);
    return { userId, token };
  }

  throw new AuthError();
}

class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

export { getUserFromToken, getUserId, AuthError };
