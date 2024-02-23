import React from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import { Typography, Grid } from '@mui/material';
import Box from '@mui/material/Box'; // Importer Box de Material-UI pour ajouter de l'espace
import Divider from '@mui/material/Divider'; // Importer Divider de Material-UI pour ajouter un séparateur

function Statistiques() {
  return (
    <DashboardCard title="Statistiques">
      {/* Begin:: séparateur */}
      <Box pb={4}>
        <Divider sx={{ width: '100%' }} />
      </Box>
      {/* End:: séparateur */}
      <Grid container spacing={3}>
        {/* Begin:: card canal */}
        <Grid item xs={12} lg={6}>
          <DashboardCard backgroundColor="#3188DC" color="white" title="Canal">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Grid container>
                <Grid item xs={12} lg={6}>
                  <Typography variant="h9">Facebook</Typography>
                </Grid>
                <Grid item xs={12} lg={6} sx={{ textAlign: 'end' }}>
                  <Typography variant="h9">12</Typography>
                </Grid>
              </Grid>
            </Box>
          </DashboardCard>
        </Grid>
        {/* End:: card canal */}
        {/* Begin:: card source */}
        <Grid item xs={12} lg={6}>
          <DashboardCard
            backgroundColor="#080655"
            color="white"
            title="Source d’acquition"
          ></DashboardCard>
        </Grid>
        {/* End:: card source */}
      </Grid>
    </DashboardCard>
  );
}

export default Statistiques;
