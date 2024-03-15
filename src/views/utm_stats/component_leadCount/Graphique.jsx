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
  height: 330,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

async function fetchData(url, token) {
  const formdata = new FormData();
  formdata.append('Hipto-Authorization', token);
  const requestOptions = {
    method: 'POST',
    body: formdata,
  };
  const response = await fetch(`${BASE_URL}/${api_version}${url}`, requestOptions);
  const responseData = await response.json();
  return Array.isArray(responseData) ? responseData : [responseData];
}

function Graphique({ selectedVerticalId, selectedDateFrom, selectedDateTo, donnees }) {
  const [error, setError] = useState(null);
  const [LeadsCollectes, setLeadsCollectes] = useState([]);
  const [LeadsLivres, setLeadsLivres] = useState([]);
  const [chartDataIncoming, setChartDataIncoming] = useState([]);
  const [chartDataOutgoing, setChartDataOutgoing] = useState([]);

  useEffect(() => {
    async function fetchDataForLeads(url, setStateFunction) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token available');
        }
        const data = await fetchData(url, JSON.parse(token).access_token);
        setStateFunction(data);
      } catch (error) {
        handleError(error);
      }
    }

    if (selectedVerticalId) {
      fetchDataForLeads(
        `/leads/incoming/compareHourlyPerformance?vertical_id=${selectedVerticalId}`,
        setLeadsCollectes,
      );
      fetchDataForLeads(
        `/leads/outgoing/compareHourlyPerformance?vertical_id=${selectedVerticalId}`,
        setLeadsLivres,
      );
    }
  }, [selectedVerticalId]);

  useEffect(() => {
    async function fetchDataForCharts(url, setStateFunction) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token available');
        }
        const data = await fetchData(url, JSON.parse(token).access_token);
        setStateFunction(data);
      } catch (error) {
        handleError(error);
      }
    }

    if (selectedVerticalId && selectedDateFrom && selectedDateTo) {
      fetchDataForCharts(
        `/leads/incoming/hours?from=${selectedDateFrom}&to=${selectedDateTo}&vertical_id=${selectedVerticalId}`,
        setChartDataIncoming,
      );
      fetchDataForCharts(
        `/leads/outgoing/hours?from=${selectedDateFrom}&to=${selectedDateTo}&vertical_id=${selectedVerticalId}`,
        setChartDataOutgoing,
      );
    }
  }, [selectedVerticalId, selectedDateFrom, selectedDateTo]);

  const handleError = (error) => {
    Swal.fire({
      icon: 'error',
      text: 'Erreur lors de la récupération des données ! ' + error.message,
      width: '30%',
      confirmButtonText: "Ok, j'ai compris!",
      confirmButtonColor: '#0095E8',
    });
    setError('Erreur lors de la récupération des données.');
  };

  const combinedChartData = chartDataIncoming.map((incomingItem) => {
    const outgoingItem = chartDataOutgoing.find(
      (outgoingItem) => outgoingItem.hour === incomingItem.hour,
    );
    return {
      hour: incomingItem.hour,
      incoming: incomingItem.count,
      outgoing: outgoingItem ? outgoingItem.count : 0,
    };
  });

  return (
    <Box sx={{ width: 1 }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 8">
          <DashboardCard title="Collecte/Livraison Jour courant">
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={7.4}>
              <Box gridColumn="span 8">
                {combinedChartData.length > 0 && (
                  <BarChart
                    dataset={combinedChartData}
                    xAxis={[{ scaleType: 'band', dataKey: 'hour' }]}
                    series={[
                      { dataKey: 'incoming', label: 'Collectés', color: '#6BEAA6' },
                      { dataKey: 'outgoing', label: 'Livrés', color: '#59A7FE' },
                    ]}
                    {...chartSetting}
                  />
                )}
              </Box>
              <Box gridColumn="span 4">
                <Box sx={{ paddingBottom: '10px' }}>
                  <Typography variant="h6">LEADS COLLECTÉS</Typography>
                </Box>
                {donnees && donnees.length > 0 ? (
                  donnees.map((row, index) => (
                    <Typography key={index} variant="body1">
                      {row.global}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body1">0</Typography>
                )}
                <Box sx={{ paddingBottom: '10px', paddingTop: '20px' }}>
                  <Typography variant="h6">CPL</Typography>
                </Box>
                {donnees && donnees.length > 0 ? (
                  donnees.map((row, index) => (
                    <Typography key={index} variant="body1">
                      {row.global_cpl}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body1">0,00 €</Typography>
                )}
                <Box sx={{ paddingBottom: '10px', paddingTop: '20px' }}>
                  <Typography variant="h6">DÉPENSES</Typography>
                </Box>
                {donnees && donnees.length > 0 ? (
                  donnees.map((row, index) => (
                    <Typography key={index} variant="body1">
                      {row.global_expenses}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body1">0,00 €</Typography>
                )}
              </Box>
            </Box>
          </DashboardCard>
        </Box>

        <Box gridColumn="span 4">
          <DashboardCard title="Leads J-1" backgroundColor={'#080655'} color={'white'}>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={5}>
              {renderLeads(LeadsCollectes, 'circle1')}
              {renderLeads(LeadsLivres, 'circle2')}
            </Box>
          </DashboardCard>
          <Box sx={{ marginTop: '10px' }}>
            <DashboardCard title="Leads S-1" backgroundColor={'#0DBDE7'} color={'white'}>
              <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={5}>
                {renderLeads(LeadsCollectes, 'circle1')}
                {renderLeads(LeadsLivres, 'circle2')}
              </Box>
            </DashboardCard>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function renderLeads(Leads, circleClass) {
  return Leads && Leads.length > 0 ? (
    Leads.map((row, index) => (
      <Box gridColumn="span 5" key={index}>
        <Typography className={circleClass}>{row.yesterday}</Typography>
        <Typography sx={{ paddingTop: '10px' }}>{row.yesterday_perc}%</Typography>
        <Typography variant="h7">
          {circleClass === 'circle1' ? 'Leads Collectés' : 'Leads Livrés'}
        </Typography>
      </Box>
    ))
  ) : (
    <Box gridColumn="span 5">
      <Typography className={circleClass}>0</Typography>
      <Typography sx={{ paddingTop: '10px' }}>0 %</Typography>
      <Typography variant="h7">
        {circleClass === 'circle1' ? 'Leads Collectés' : 'Leads Livrés'}
      </Typography>
    </Box>
  );
}

export default Graphique;
