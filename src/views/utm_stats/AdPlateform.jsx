import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Component from './Component';
import './AdPlateform.css';
import AdPlateform_table from './component_adPlateform/AdPlateformTable';
import DashboardCard from 'src/components/shared/DashboardCard';

function TabPanel({ children, value, index }) {
  return <div hidden={value !== index}>{value === index && <div>{children}</div>}</div>;
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
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
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="vertical tabs example">
          {selectedVerticals.map((verticalNames, index) => (
            <Tab key={index} label={`${verticalNames}`} {...a11yProps(index)} />
          ))}
        </Tabs>
        {selectedVerticalId && selectedVerticalId.length > 0 ? (
         selectedVerticalId.map((verticalId, index) => (
          <TabPanel key={index} value={tabValue} index={index}>
          <AdPlateform_table
            selectedVerticalId={verticalId}
            selectedDateFrom={selectedDateFrom}
            selectedDateTo={selectedDateTo}
            selectedVerticals={selectedVerticals}
          />
          </TabPanel>
        ))
        ) : (
            <DashboardCard sx={{ padding: '0px' }} title={`Ad Platform`}>
            </DashboardCard>
        )}
        </Box>
      </Box>
    </Box>
  );
}

export default AdPlatform;
