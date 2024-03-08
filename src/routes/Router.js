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
// Fonction pour vérifier l'authentification de l'utilisateur
const isAuthenticated = () => {
  // Vérifie si le token est présent dans le localStorage et s'il est valide
  const token = localStorage.getItem('token');
  return token !== null && token !== undefined && token !== '';
};
const PrivateRoute = ({ element, ...rest }) => {
  // Si l'utilisateur est authentifié, affiche l'élément (component)
  // Sinon, redirige l'utilisateur vers l'interface de connexion
  return isAuthenticated() ? (
    <FullLayout>
      {element}
    </FullLayout>
  ) : (
    <Navigate to="/login" />
  );
};
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
    element: <PrivateRoute />,
    children: [
      { path: '/AdPlatform', exact: true, element: <AdPlateform /> },
      { path: '*', element: <Navigate to="/AdPlatform/404" /> },
    ],
  },
  {
    path: '/LeadCount',
    element: <PrivateRoute />,
    children: [
      { path: '/LeadCount', exact: true, element: <LeadCount /> },
      { path: '*', element: <Navigate to="/LeadCount/404" /> },
    ],
  },
  {
    path: '/Pioche',
    element: <PrivateRoute />,
    children: [
      { path: '/Pioche', exact: true, element: <Pioche /> },
      { path: '*', element: <Navigate to="/Pioche/404" /> },
    ],
  },
];
export default Router;