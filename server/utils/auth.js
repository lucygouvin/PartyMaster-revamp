const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_TOKEN;
const expiration = '2h';

module.exports = {
  authMiddleware({ req }) {
    let token = req.query.token || req.headers.authorization || req.body.token;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
