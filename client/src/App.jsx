import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Authentication/Login.jsx';
import Signup from './components/Authentication/Signup.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import EventCreate from './components/Events/EventCreate.jsx';

// const client = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
// });

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/eventcreate" element={<EventCreate />} />
      </Routes>
    </Router>
  );
};

export default App;
