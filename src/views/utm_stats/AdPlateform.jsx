import React, { useState } from 'react';
import { Box } from '@mui/material';
import Component from './Component';
import './AdPlateform.css';
import AdPlateform_table from './component_adPlateform/AdPlateformTable';

function AdPlatform() {
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
  
  // Gestionnaire de sélection de vertical
  const [selectedVerticalId, setSelectedVerticalId] = useState('');
  const handleVerticalSelect = (verticalId) => {
    setSelectedVerticalId(verticalId);
  };

  // Gestionnaire de sélection de nom vertical
  const [selectedVerticals, setSelectedVerticals] = useState([]);
  const handleVerticalSelectName = (verticalNames) => {
    setSelectedVerticals(verticalNames);
  };

  return (
    <Box sx={{ width: 1 }}>
      <Box display="grid" gridTemplateColumns="repeat(16, 1fr)" gap={2}>
        <Box gridColumn="span 16">
          <Component
            onVerticalSelect={handleVerticalSelect}
            onDateFromSelect={handleDateFromSelect}
            onDateToSelect={handleDateToSelect}
            onVerticalSelectName={handleVerticalSelectName}
          />
        </Box>
        <Box gridColumn="span 16">
          <AdPlateform_table
            selectedVerticalId={selectedVerticalId}
            selectedDateFrom={selectedDateFrom}
            selectedDateTo={selectedDateTo}
            selectedVerticals={selectedVerticals}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default AdPlatform;
