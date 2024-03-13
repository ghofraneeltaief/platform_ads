//test
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
// components
import Selection from './components/Selection';
import Statistique from './components/Statistiques';
import Leads from './components/Leads';
import { BASE_URL, api_version } from '../authentication/config';
import { useNavigate } from 'react-router-dom';

function Pioche() {
  const navigate = useNavigate();
  /* Begin: getToken */
  async function getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      throw new Error('No token available');
    }
  }
  /* End: getToken */
  useEffect(() => {
    const fetchdebugToken = async () => {
      try {
        const formdebugToken = new FormData();
        const token = await getToken();
        const responseObject = JSON.parse(token);
        const accessToken = responseObject.access_token;
        formdebugToken.append('Hipto-Authorization', accessToken);
        const requestOptions = {
          method: 'POST',
          body: formdebugToken,
        };

        const response = await fetch(`${BASE_URL}/${api_version}/debug`, requestOptions);
        const debugToken = await response.json();
        const TimeExp = debugToken.data.EXPIRE_TIME;
        // Vérifier si le token est expiré
        const currentTime = Math.floor(Date.now() / 1000);
        console.log(currentTime);
        console.log(TimeExp);
        if (TimeExp < currentTime) {
          // Si le token est expiré, rediriger vers la page de connexion
          navigate('/login');
          return;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchdebugToken();
  }, []);
  /* Begin: VerticalId */
  const [selectedVerticalId, setSelectedVerticalId] = useState(''); // Initialiser l'état avec l'ID vertical de l'URL
  const handleVerticalSelect = (verticalId) => {
    setSelectedVerticalId(verticalId); // Mettre à jour l'ID vertical lorsque sélectionné dans Selection
  };
  /* End: VerticalId */
  /* Begin: Date From */
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const handleDateFromSelect = (dateFrom) => {
    setSelectedDateFrom(dateFrom);
  };
  /* End: Date From */
  /* Begin: Date To */
  const [selectedDateTo, setSelectedDateTo] = useState(null);
  const handleDateToSelect = (dateTo) => {
    setSelectedDateTo(dateTo);
  };
  /* End: Date To */
  /* Begin: Canal Count */
  const [CanalCount, setCanalCount] = useState(''); // Initialiser l'état avec l'ID vertical de l'URL
  const handleCanalCount = (CanalCount) => {
    setCanalCount(CanalCount); // Mettre à jour l'ID vertical lorsque sélectionné dans Selection
  };
  /* End: Canal Count */
  /* Begin: Source Count */
  const [SourceCount, setSourceCount] = useState('');
  const handleSourceCount = (SourceCount) => {
    setSourceCount(SourceCount);
  };
  /* End: Source Count */
  /* Begin: Fonction pour réinitialiser les données du tableau et statistiques */
  const [tableDataVide] = useState([]);

  const handleRecalculateClick = () => {
  };

  return (
    <Box sx={{ width: 1 }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 4">
          <Selection
            onVerticalSelect={handleVerticalSelect}
            onDateFromSelect={handleDateFromSelect}
            onDateToSelect={handleDateToSelect}
            onRecalculateClick={handleRecalculateClick}
          />
        </Box>
        <Box gridColumn="span 8">
          <Statistique CanalCount={CanalCount} SourceCount={SourceCount} />
        </Box>
        <Box gridColumn="span 12">
          <Leads
            selectedVerticalId={selectedVerticalId}
            selectedDateFrom={selectedDateFrom}
            selectedDateTo={selectedDateTo}
            onCanalCount={handleCanalCount}
            onSourceCount={handleSourceCount}
            tableDataVide={tableDataVide}
          />
        </Box>
      </Box>
    </Box>
  );
}
export default Pioche;