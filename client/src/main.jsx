import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Dashboard  from './components/Dashboard/Dashboard.jsx'
import Login from './components/Authentication/Login.jsx';
import Signup from './components/Authentication/Signup.jsx';
import EventCreate from './components/Events/EventCreate.jsx';
import EventOverview from './components/Events/EventOverview.jsx';
import Invitation from './components/Invitations/Invitations.jsx';
import AboutPage from './components/Help/AboutPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <LandingPage />
      },  {
        path: '/dashboard',
        element: <Dashboard />
      }, {
        path: '/login',
        element: <Login />
      },{
        path: '/signup',
        element: <Signup />
      },{
        path: '/create-event',
        element: <EventCreate />
      },{
        path: '/event/:eventId',
        element: <EventOverview />
      },{
        path: '/invitation/:eventId',
        element: <Invitation />
      },{
        path: '/about',
        element: <AboutPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)