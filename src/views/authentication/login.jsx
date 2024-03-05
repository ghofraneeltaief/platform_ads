import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import { BASE_URL, api_version } from './config';
import logo from '../../assets/images/logos/logo.png';
import logo_2 from '../../assets/images/logos/logo-2.png';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate depuis React Router
import './login.css';
import Box from '@mui/material/Box'; // Importer Box de Material-UI pour ajouter de l'espace
import Form from 'react-bootstrap/Form';

const Login = () => {
  const navigate = useNavigate(); // Utiliser useNavigate pour la navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('user_email', email);
    formdata.append('user_password', password);
    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    fetch(`${BASE_URL}/${api_version}/token`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          // Gestion des erreurs en cas d'échec de connexion
          throw new Error('Email ou Mot de passe Invalide');
        }
      })
      .then((token) => {
        // Stocker le token dans le localStorage
        localStorage.setItem('token', token);
        // Redirection vers la page suivante après une connexion réussie
        navigate('/Pioche');
      })
      .catch((error) => setError(error.message));
    /*fetch(`${BASE_URL}/${api_version}/debug`, requestOptions).then((reponse) => {
      const data = reponse.json();
      console.log("qhkfekufh",data);
    });*/
  };
  return (
    <Grid container className="centered-container">
      {/* Begin:: card canal */}
      <Grid item xs={6} className="grid-left centered-item">
        {/* begin::Logo */}
        <img alt="Logo" src={logo} className="logo-1" />
        {/* end::Logo */}
        {/* begin::Title */}
        <h1 className="titre-1">Connexion à votre compte</h1>
        {/* end::Title */}
        <p className="text-gray">Saisissez votre e-mail professionnel</p>
        <div className="separator separator-content my-14">
          <span className="text">...et bon travail</span>
        </div>
        {/* begin::Form */}
        {error && <p className="message">{error}</p>}
        <Box>
          <Form className="form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                className="form-control"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button className="button-submit" variant="contained" type="submit">
              Connexion
            </Button>
          </Form>
          {/* end::Form */}
        </Box>
      </Grid>
      <Grid item xs={6} className="grid-right centered-item">
        {/* begin::Logo */}
        <img alt="Logo" className="logo-2" src={logo_2} />
        {/* end::Logo */}
        {/* begin::Title */}
        <h1 className="titre-2">The lead generation 🧢</h1>
        {/* end::Title */}
      </Grid>
    </Grid>
  );
};

export default Login;
