import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Typography,
} from '@mui/material';
import './tablelead.css';
import DashboardCard from 'src/components/shared/DashboardCard';

import FacebookIcon from '@mui/icons-material/Facebook';
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function TabPanel({ children, value, index }) {
  return <div hidden={value !== index}>{value === index && <div>{children}</div>}</div>;
}
function TableLead() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <DashboardCard >
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label="Par Canal" {...a11yProps(0)} />
            <Tab label="Par Ad Plateform" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <Table sx={{ minWidth: 650, padding: "0px" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ITEM</TableCell>
                <TableCell align="right">LEAD</TableCell>
                <TableCell align="right">CPL&nbsp;</TableCell>
                <TableCell align="right">DEPENCES&nbsp;</TableCell>
                <TableCell align="right">TX MARGE&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                 Landbot
                </TableCell>
                <TableCell align="right">120&nbsp;</TableCell>
              <TableCell align="right">120&nbsp;</TableCell>
              <TableCell align="right">120&nbsp;</TableCell>
              <TableCell align="right">120&nbsp;</TableCell>

              </TableRow>
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Table sx={{ minWidth: 650, padding: "0px" }} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell>ITEM</TableCell>
                <TableCell align="right">LEAD</TableCell>
                <TableCell align="right">CPL&nbsp;</TableCell>
                <TableCell align="right">DEPENCES&nbsp;</TableCell>
                <TableCell align="right">TX MARGE&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
              <TableCell component="th" scope="row">
             <FacebookIcon /> Facebook
              </TableCell>
              <TableCell align="right">120&nbsp;</TableCell>
              <TableCell align="right">120&nbsp;</TableCell>
              <TableCell align="right">120&nbsp;</TableCell>
              <TableCell align="right">120&nbsp;</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabPanel>
      </Box></DashboardCard>
  );
}

export default TableLead;