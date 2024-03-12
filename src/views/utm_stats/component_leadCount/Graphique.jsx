import React from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import DashboardCard from 'src/components/shared/DashboardCard';
import Grid from '@mui/material/Grid';
import { PieChart } from '@mui/x-charts/PieChart';

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
  {
    Collectés: 59,
    Livrés: 57,
    month: 'Jan',
  },
  {
    Collectés: 50,
    Livrés: 52,
    month: 'Fev',
  },
  {
    Collectés: 47,
    Livrés: 53,
    month: 'Mar',
  },
  {
    Collectés: 54,
    Livrés: 56,
    month: 'Apr',
  },
  {
    Collectés: 57,
    Livrés: 69,
    month: 'May',
  },
  {
    Collectés: 60,
    Livrés: 63,
    month: 'June',
  },
  {
    Collectés: 59,
    Livrés: 60,
    month: 'July',
  },
  {
    Collectés: 65,
    Livrés: 60,
    month: 'Aug',
  },
  {
    Collectés: 51,
    Livrés: 51,
    month: 'Sept',
  },
  {
    Collectés: 60,
    Livrés: 65,
    month: 'Oct',
  },
  {
    Collectés: 67,
    Livrés: 64,
    month: 'Nov',
  },
  {
    Collectés: 61,
    Livrés: 70,
    month: 'Dec',
  },
];

function Graphique() {
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
              <Box gridColumn="span 4">
                <Box sx={{paddingBottom:"10px"}}>
                  <Typography variant="h6">LEADS COLLECTÉS</Typography>
                </Box>
                <Typography variant="body1">123</Typography>
                <Box sx={{paddingBottom:"10px",paddingTop:"20px"}}>
                  <Typography variant="h6">CPL</Typography>
                </Box>
                <Typography variant="body1">9.80 </Typography>
                <Box sx={{paddingBottom:"10px",paddingTop:"20px"}}>
                  <Typography variant="h6">DÉPENSES</Typography>
                </Box>
                <Typography variant="body1">1 205,34 €</Typography>
              </Box>
            </Box>
          </DashboardCard>
        </Box>
        <Box gridColumn="span 4">
          <DashboardCard title="Leads J-1" backgroundColor={'#080655'} color={'white'}>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={5}>
              <Box gridColumn="span 5">Leads Collectés</Box>
              <Box gridColumn="span 6">
                <Typography variant="h7"> Leads Livrés</Typography>
              </Box>
            </Box>
          </DashboardCard>
          <Box sx={{ marginTop: '10px' }}>
            <DashboardCard title="Leads S-1" backgroundColor={'#0DBDE7'} color={'white'}>
              <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={5}>
                <Box gridColumn="span 5">Leads Collectés</Box>
                <Box gridColumn="span 6">
                  <Typography variant="h7"> Leads Livrés</Typography>
                </Box>
              </Box>
            </DashboardCard>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Graphique;
