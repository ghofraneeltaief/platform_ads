import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));

/* ****Pages***** */
const Pioche = Loadable(lazy(() => import('../views/dashboard/Pioche')))
const Login = Loadable(lazy(() => import('../views/authentication/login')))

const Router = [
  {
    path: '/',
    children: [
      { path: '/', element: <Navigate to="/login" /> }, 
      { path: '/login', element: <Login /> }, 
      { path: '*', element: <Navigate to="/login/404" /> },
    ],
  },
  {
    path: '/Pioche',
    element: <FullLayout />,
    children: [
      { path: '/Pioche', exact: true, element: <Pioche /> },
      { path: '*', element: <Navigate to="/Pioche/404" /> },
    ],
  },
];

export default Router;
