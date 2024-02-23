import React from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box'; // Importer Box de Material-UI pour ajouter de l'espace
import Divider from '@mui/material/Divider'; // Importer Divider de Material-UI pour ajouter un séparateur

function Statistiques() {
  return (
    <DashboardCard title="Statistiques">
        {/* Begin:: séparateur */}
        <Box pb={4} >
          <Divider sx={{ width: '100%' }} /> 
        </Box>
        {/* End:: séparateur */}
      <Grid container spacing={3}>
        {/* Begin:: card canal */}
        <Grid item xs={12} lg={6}>
          <DashboardCard backgroundColor= "#3188DC" color="white" title="Canal"></DashboardCard>
        </Grid>
        {/* End:: card canal */}
        {/* Begin:: card source */}
        <Grid item xs={12} lg={6}>
          <DashboardCard backgroundColor= "#080655" color="white" title="Source d’acquition"></DashboardCard>
        </Grid>
        {/* End:: card source */}
      </Grid>
    </DashboardCard>
  );
}

export default Statistiques;
