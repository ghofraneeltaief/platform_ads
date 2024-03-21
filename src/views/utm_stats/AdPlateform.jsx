import React, { useState } from 'react';
import { Box } from '@mui/material';
import Component from './Component';
import './AdPlateform.css';
import AdPlateform_table from './component_adPlateform/AdPlateformTable';

// Composant principal de la plateforme publicitaire
function AdPlatform() {
  const [selectedVerticalId, setSelectedVerticalId] = useState('');
  const [selectedVerticals, setSelectedVerticals] = useState([]);
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);

  // Gestionnaire de sélection de vertical
  const handleVerticalSelect = (verticalId) => {
    setSelectedVerticalId(verticalId);
  };

  // Gestionnaire de sélection de nom vertical
  const handleVerticalSelectName = (verticalNames) => {
    setSelectedVerticals(verticalNames);
  };

  // Gestionnaire de sélection de date de début
  const handleDateFromSelect = (dateFrom) => {
    setSelectedDateFrom(dateFrom);
  };

  // Gestionnaire de sélection de date de fin
  const handleDateToSelect = (dateTo) => {
    setSelectedDateTo(dateTo);
  };

  return (
    <Box sx={{ width: 1 }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 12">
          <Component
            onVerticalSelect={handleVerticalSelect}
            onDateFromSelect={handleDateFromSelect}
            onDateToSelect={handleDateToSelect}
            onVerticalSelectName={handleVerticalSelectName}
          />
        </Box>
        <Box gridColumn="span 12">
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
