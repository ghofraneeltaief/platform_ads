import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Component from './Component';
import TableLead from './component_leadCount/TableLead';
import Graphique from './component_leadCount/Graphique';
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
function LeadCount() {
  /* Begin: VerticalId */
  const [selectedVerticalId, setSelectedVerticalId] = useState(''); // Initialiser l'état avec l'ID vertical de l'URL
  const handleVerticalSelect = (verticalId) => {
    setSelectedVerticalId(verticalId); // Mettre à jour l'ID vertical lorsque sélectionné dans Selection
  };
  /* End: VerticalId */
  const [selectedVerticals, setSelectedVerticals] = useState([]);
  
  const handleVerticalSelectName = (verticalNames) => {
    setSelectedVerticals(verticalNames);
  };
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
 
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="vertical tabs example">
          {selectedVerticals.map((verticalNames, index) => (
            <Tab key={index} label={`${verticalNames}`} {...a11yProps(index)} />
          ))}
        </Tabs>
        {selectedVerticalId && selectedVerticalId.length > 0 ? (
         selectedVerticalId.map((verticalId, index) => (
          <TabPanel key={index} value={tabValue} index={index}>
            <DashboardCard sx={{ padding: '0px' }} title={`Lead Count`}>
              <Box gridColumn="span 12">
                <Graphique
                  selectedVerticalId={verticalId}
                  selectedDateFrom={selectedDateFrom}
                  selectedDateTo={selectedDateTo}
                  donnees={donneesGraphique}
                />
              </Box>
              <Box gridColumn="span 12" sx={{ paddingTop: '40px' }}>
                <TableLead
                  selectedVerticalId={verticalId}
                  selectedDateFrom={selectedDateFrom}
                  selectedDateTo={selectedDateTo}
                  onDataUpdate={handleGraphDataUpdate}
                />
              </Box>
            </DashboardCard>
          </TabPanel>
        ))
        ) : (
            <DashboardCard sx={{ padding: '0px' }} title={`Lead Count`}>
            </DashboardCard>
        )}
      </Box>
    </Box>
  </Box>
);
}
export default LeadCount;
