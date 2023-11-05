const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const db = require('./config/connection');

app.use(express.static(path.join(__dirname, '../client/dist/')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./schemas');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// app.get( "/" , (req, res) => res.send("Is this working"))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// dup?
// db.once("open", () => {
//     app.get("/graphql", res.json("data"));

//     app.listen(PORT, () => console.log(`Application is running on ${PORT}`))
// })

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
