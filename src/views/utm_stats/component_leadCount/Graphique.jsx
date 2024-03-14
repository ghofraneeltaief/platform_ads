import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import DashboardCard from 'src/components/shared/DashboardCard';
import { BASE_URL, api_version } from '../../authentication/config';
import Swal from 'sweetalert2';
import './graphique.css';

const chartSetting = {
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

const dataset = [
  { Collectés: 59, Livrés: 57, month: 'Jan' },
  { Collectés: 50, Livrés: 52, month: 'Fev' },
  { Collectés: 47, Livrés: 53, month: 'Mar' },
  { Collectés: 54, Livrés: 56, month: 'Apr' },
  { Collectés: 57, Livrés: 69, month: 'May' },
  { Collectés: 60, Livrés: 63, month: 'June' },
  { Collectés: 59, Livrés: 60, month: 'July' },
  { Collectés: 65, Livrés: 60, month: 'Aug' },
  { Collectés: 51, Livrés: 51, month: 'Sept' },
  { Collectés: 60, Livrés: 65, month: 'Oct' },
  { Collectés: 67, Livrés: 64, month: 'Nov' },
  { Collectés: 61, Livrés: 70, month: 'Dec' },
];

function Graphique({ selectedVerticalId, donnees }) {
  const [error, setError] = useState(null);
  const [LeadsCollectes, setLeadsCollectes] = useState([]);
  const [LeadsLivres, setLeadsLivres] = useState([]);

  async function getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      throw new Error('No token available');
    }
  }

  const fetchData = async (url, setStateFunction) => {
    if (selectedVerticalId) {
      try {
        const token = await getToken();
        const responseObject = JSON.parse(token);
        const accessToken = responseObject.access_token;
        const formdata = new FormData();
        formdata.append('Hipto-Authorization', accessToken);
        const requestOptions = {
          method: 'POST',
          body: formdata,
        };
        const response = await fetch(`${BASE_URL}/${api_version}${url}`, requestOptions);
        const responseData = await response.json();
        const dataArray = Array.isArray(responseData) ? responseData : [responseData];
        setStateFunction(dataArray);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: 'Erreur lors de la récupération des données ! ' + error.message,
          width: '30%',
          confirmButtonText: "Ok, j'ai compris!",
          confirmButtonColor: '#0095E8',
        });
        setError('Erreur lors de la récupération des données.');
      }
    }
  };

  useEffect(() => {
    fetchData(`/leads/incoming/compareHourlyPerformance?vertical_id=${selectedVerticalId}`, setLeadsCollectes);
    fetchData(`/leads/outgoing/compareHourlyPerformance?vertical_id=${selectedVerticalId}`, setLeadsLivres);
  }, [selectedVerticalId]);

  return (
    <Box sx={{ width: 1 }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 8">
          <DashboardCard title="Collecte/Livraison Jour courant">
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={7.4}>
              <Box gridColumn="span 8">
                <BarChart
                  dataset={dataset}
                  xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                  series={[
                    { dataKey: 'Collectés', label: 'Collectés', color: '#59A7FE' },
                    { dataKey: 'Livrés', label: 'Livrés', color: '#6BEAA6' },
                  ]}
                  {...chartSetting}
                />
              </Box>
              
                <Box gridColumn="span 4" >
                  <Box sx={{ paddingBottom: '10px' }}>
                    <Typography variant="h6">LEADS COLLECTÉS</Typography>
                  </Box>
                  {donnees && donnees.map((row, index) => (
                  <Typography key={index} variant="body1">{row.global}</Typography>
                  ))}
                  <Box sx={{ paddingBottom: '10px', paddingTop: '20px' }}>
                    <Typography variant="h6">CPL</Typography>
                  </Box>
                  {donnees && donnees.map((row, index) => (
                  <Typography key={index} variant="body1">{row.global_cpl}</Typography>
                  ))}
                  <Box sx={{ paddingBottom: '10px', paddingTop: '20px' }}>
                    <Typography variant="h6">DÉPENSES</Typography>
                  </Box>
                  {donnees && donnees.map((row, index) => (
                  <Typography key={index} variant="body1">{row.global_expenses}</Typography>
                  ))}
                </Box>
              
            </Box>
          </DashboardCard>
        </Box>

        <Box gridColumn="span 4">
          <DashboardCard title="Leads J-1" backgroundColor={'#080655'} color={'white'}>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={5}>
              {LeadsCollectes.map((row, index) => (
                <Box gridColumn="span 5" key={index}>
                  <Typography className="circle1">{row.yesterday}</Typography>
                  <Typography>{row.yesterday_perc}%</Typography>
                  <Typography variant="h7">Leads Collectés</Typography>
                </Box>
              ))}
              {LeadsLivres.map((row, index) => (
                <Box gridColumn="span 6" key={index}>
                  <Typography className="circle2">{row.yesterday}</Typography>
                  <Typography>{row.yesterday_perc}%</Typography>
                  <Typography variant="h7"> Leads Livrés</Typography>
                </Box>
              ))}
            </Box>
          </DashboardCard>
          <Box sx={{ marginTop: '10px' }}>
            <DashboardCard title="Leads S-1" backgroundColor={'#0DBDE7'} color={'white'}>
              <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={5}>
                {LeadsCollectes.map((row, index) => (
                  <Box gridColumn="span 5" key={index}>
                    <Typography className="circle1">{row.yesterweek}</Typography>
                    <Typography>{row.yesterweek_perc}%</Typography>
                    <Typography variant="h7">Leads Collectés</Typography>
                  </Box>
                ))}
                {LeadsLivres.map((row, index) => (
                  <Box gridColumn="span 6" key={index}>
                    <Typography className="circle2">{row.yesterweek}</Typography>
                    <Typography>{row.yesterweek_perc}%</Typography>
                    <Typography variant="h7"> Leads Livrés</Typography>
                  </Box>
                ))}
              </Box>
            </DashboardCard>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Graphique;
