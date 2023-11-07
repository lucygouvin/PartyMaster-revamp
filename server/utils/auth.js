const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_TOKEN || 'Secret';
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
  signToken({ name, email, _id }) {
    const payload = { name, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
