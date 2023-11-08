import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import LandingPage from './components/LandingPage/LandingPage';
import Header from './Header';
import Footer from './Footer';
import Login from './components/Authentication/Login.jsx';
import Signup from './components/Authentication/Signup.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import EventOverview from './components/Events/EventOverview.jsx';
import EventCreate from './components/Events/EventCreate.jsx';

// Apollo client setup
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header /> {/* Global header included */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/eventoverview" element={<EventOverview />} />
          <Route path="/eventcreate" element={<EventCreate />} />

          {/* Uncomment and add other routes here */}
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/event-create" element={<EventCreate />} /> */}
        </Routes>
        <Footer /> {/* Footer is rendered below every Route */}
      </Router>
    </ApolloProvider>
  );
};

export default App;