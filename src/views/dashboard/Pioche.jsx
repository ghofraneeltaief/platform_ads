import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import Selection from './components/Selection';
import Statistique from './components/Statistiques';
import Leads from './components/Leads';

function Pioche() {
  const [selectedVerticalId, setSelectedVerticalId] = useState(''); // Initialiser l'état avec l'ID vertical de l'URL
  const handleVerticalSelect = (verticalId) => {
    setSelectedVerticalId(verticalId); // Mettre à jour l'ID vertical lorsque sélectionné dans Selection
  };
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);

  const handleDateFromSelect = (dateFrom) => {
    setSelectedDateFrom(dateFrom);
  };
  const [selectedDateTo, setSelectedDateTo] = useState(null);

  const handleDateToSelect = (dateTo) => {
    setSelectedDateTo(dateTo);
  };
  return (
    <PageContainer title="Pioche" description="this is Pioche">
      <Box>
        <Grid container spacing={3}>
          {/* Begin:: sélection */}
          <Grid item xs={12} lg={4}>
            <Selection onVerticalSelect={handleVerticalSelect} onDateFromSelect={handleDateFromSelect} />
          </Grid>
          {/* End:: sélection */}
          {/* Begin:: statistiques */}
          <Grid item xs={12} lg={8}>
            <Statistique />
          </Grid>
          {/* End:: statistiques */}
          {/* Begin:: Leads Log */}
          <Grid item xs={12}>
            <Leads selectedVerticalId={selectedVerticalId} selectedDateFrom={selectedDateFrom} selectedDateTo={selectedDateTo} />
          </Grid>
          {/* End:: Leads Log */}
        </Grid>
      </Box>
    </PageContainer>
  );
}

export default Pioche;
