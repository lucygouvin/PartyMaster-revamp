const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

<<<<<<< HEAD
const secret = process.env.SECRET_TOKEN;
const expiration = '8h';
=======
const secret = process.env.SECRET_TOKEN || 'Secret';
const expiration = '2h';
>>>>>>> 42ec1c8aa2837a8fca41757dfd2fd371c5115446

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
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
<<<<<<< HEAD
  signToken: function ({ firstName, email, _id }) {
    const payload = { firstName, email, _id };
=======
  signToken({ name, email, _id }) {
    const payload = { name, email, _id };
>>>>>>> 42ec1c8aa2837a8fca41757dfd2fd371c5115446

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};