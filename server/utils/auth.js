const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET_TOKEN;
const expiration = '8h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

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
  signToken({ name, email, _id, event }) {
    const payload = { name, email, _id, event };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
