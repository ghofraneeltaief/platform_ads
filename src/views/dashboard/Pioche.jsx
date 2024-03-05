import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import Selection from './components/Selection';
import Statistique from './components/Statistiques';
import Leads from './components/Leads';

function Pioche() {
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
  const [tableDataVide, settableDataVide] = useState([]);
  const handleRecalculateClick = () => {
    settableDataVide([]); // Réinitialisation des données du tableau à un tableau vide
    setCanalCount('');
    setSourceCount('');
  };
  /* End: Source Count */
  return (
    <PageContainer title="Pioche" description="this is Pioche">
      <Box>
        <Grid container spacing={3}>
          {/* Begin:: sélection */}
          <Grid item xs={12} lg={4}>
            <Selection
              onVerticalSelect={handleVerticalSelect}
              onDateFromSelect={handleDateFromSelect}
              onDateToSelect={handleDateToSelect}
              onRecalculateClick={handleRecalculateClick}
            />
          </Grid>
          {/* End:: sélection */}
          {/* Begin:: statistiques */}
          <Grid item xs={12} lg={8}>
            <Statistique CanalCount={CanalCount} SourceCount={SourceCount} />
          </Grid>
          {/* End:: statistiques */}
          {/* Begin:: Leads Log */}
          <Grid item xs={12}>
            <Leads
              selectedVerticalId={selectedVerticalId}
              selectedDateFrom={selectedDateFrom}
              selectedDateTo={selectedDateTo}
              onCanalCount={handleCanalCount}
              onSourceCount={handleSourceCount}
              tableDataVide={tableDataVide}
            />
          </Grid>
          {/* End:: Leads Log */}
        </Grid>
      </Box>
    </PageContainer>
  );
}

export default Pioche;
