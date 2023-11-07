import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, } from '@apollo/client';
import { Outlet } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

import LandingPage from './components/LandingPage/LandingPage';
// import Login from './components/Authentication/Login.jsx';
// import Signup from './components/Authentication/Signup.jsx';
// import Dashboard from './components/Dashboard/Dashboard.jsx';
// import EventCreate from './components/Events/EventCreate.jsx';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  })

const App = () => {
  return (
    <ApolloProvider client={client}>
    <LandingPage />
    <Outlet />
    </ApolloProvider>
  );
};

export default App;
