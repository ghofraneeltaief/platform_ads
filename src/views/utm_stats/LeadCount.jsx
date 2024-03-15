import React, {  useState } from 'react';
import { Box } from '@mui/material';
import Component from './Component';
import TableLead from './component_leadCount/TableLead';
import Graphique from './component_leadCount/Graphique';
import DashboardCard from 'src/components/shared/DashboardCard';

function LeadCount() {
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

  const [donneesGraphique, setdonneesGraphique] = useState(null);
  const handleGraphDataUpdate = (data) => {
    // Handle updated data here
    setdonneesGraphique(data);
  };

  return (
    <Box sx={{ width: 1 }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 12">
          <Component
            onVerticalSelect={handleVerticalSelect}
            onDateFromSelect={handleDateFromSelect}
            onDateToSelect={handleDateToSelect}
          />
        </Box>
        <Box gridColumn="span 12">
          <DashboardCard sx={{ padding: '0px' }} title="Lead Count">
            <Box gridColumn="span 12">
              <Graphique
                selectedVerticalId={selectedVerticalId}
                selectedDateFrom={selectedDateFrom}
                selectedDateTo={selectedDateTo}
                donnees={donneesGraphique}
              />
            </Box>
            <Box gridColumn="span 12" sx={{ paddingTop: '40px' }}>
              <TableLead
                selectedVerticalId={selectedVerticalId}
                selectedDateFrom={selectedDateFrom}
                selectedDateTo={selectedDateTo}
                onDataUpdate={handleGraphDataUpdate}
              />
            </Box>
          </DashboardCard>
        </Box>
      </Box>
    </Box>
  );
}
export default LeadCount;
