import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import Selection from './components/Selection';
import Statistique from './components/Statistiques';
import Leads from './components/Leads';


function Pioche () {
  return (
    <PageContainer title="Pioche" description="this is Pioche">
      <Box>
        <Grid container spacing={3}>
          {/* Begin:: sélection */}
          <Grid item xs={12} lg={4}>
            <Selection />
          </Grid>
          {/* End:: sélection */}
          {/* Begin:: statistiques */}
          <Grid item xs={12} lg={8}>
            <Statistique />
          </Grid>
          {/* End:: statistiques */}
          {/* Begin:: Leads Log */}
          <Grid item xs={12}>
          <Leads />
          </Grid>
          {/* End:: Leads Log */}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Pioche;
