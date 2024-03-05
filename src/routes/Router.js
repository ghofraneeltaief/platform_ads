import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));

/* ****Pages***** */
const Pioche = Loadable(lazy(() => import('../views/pioche/Pioche')))
const Login = Loadable(lazy(() => import('../views/authentication/login')))
const AdPlateform = Loadable(lazy(() => import('../views/utm_stats/AdPlateform')))
const LeadCount = Loadable(lazy(() => import('../views/utm_stats/LeadCount')))

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
    path: '/AdPlatform',
    element: <FullLayout />,
    children: [
      { path: '/AdPlatform', exact: true, element: <AdPlateform /> },
      { path: '*', element: <Navigate to="/AdPlatform/404" /> },
    ],
  },
  {
    path: '/LeadCount',
    element: <FullLayout />,
    children: [
      { path: '/LeadCount', exact: true, element: <LeadCount /> },
      { path: '*', element: <Navigate to="/LeadCount/404" /> },
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
