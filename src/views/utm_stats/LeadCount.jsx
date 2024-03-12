import React from 'react';
import {
  Box,
} from '@mui/material';
import Component from './Component';
import TableLead from './component_leadCount/TableLead';
import Graphique from './component_leadCount/Graphique';
import DashboardCard from 'src/components/shared/DashboardCard';
function LeadCount() {
  return (
    <Box sx={{ width: 1 }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 12">
          <Component />
        </Box>
        <Box gridColumn="span 12">
          <DashboardCard sx={{ padding: '0px' }} title="Lead Count">
            <Box gridColumn="span 12">
              <Graphique />
            </Box>
            <Box gridColumn="span 12" sx={{ paddingTop: '40px' }}>
              <TableLead />
            </Box>
          </DashboardCard>
        </Box>
      </Box>
    </Box>
  );
}
export default LeadCount;