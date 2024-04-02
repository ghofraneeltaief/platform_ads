import React, { useState, useEffect } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material';
import './tablelead.css';
import DashboardCard from 'src/components/shared/DashboardCard';
import { BASE_URL, api_version } from '../../authentication/config';
import Swal from 'sweetalert2';
import tiktok from '../../../assets/images/logos/tiktok.jpg';
import snapchat from '../../../assets/images/logos/snapchat.png';
import bing from '../../../assets/images/logos/bing.png';
import taboola from '../../../assets/images/logos/taboola.png';
import outbrain from '../../../assets/images/logos/outbrain.png';
import autre from '../../../assets/images/logos/autre.jpg';
import facebook from '../../../assets/images/logos/facebook.png';
import google from '../../../assets/images/logos/google.png';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel({ children, value, index }) {
  return <div hidden={value !== index}>{value === index && <div>{children}</div>}</div>;
}

function TableLead({ selectedVerticalId, selectedDateFrom, selectedDateTo, onDataUpdate }) {
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [TableDataCanal, setTableDataCanal] = useState([]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  async function fetchTableData() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token available');
      }

      const accessToken = JSON.parse(token).access_token;
      const formdata = new FormData();
      formdata.append('Hipto-Authorization', accessToken);

      const requestOptions = {
        method: 'POST',
        body: formdata,
      };

      const response = await fetch(
        `${BASE_URL}/${api_version}/report/socialNetworks?vertical_id=${selectedVerticalId}&from=${selectedDateFrom}&to=${selectedDateTo}`,
        requestOptions,
      );

      const responseData = await response.json();
      const dataArray = Array.isArray(responseData) ? responseData : [responseData];

      onDataUpdate(dataArray);
      setTableData(dataArray);
    } catch (error) {
      handleError(error);
    }
  }
  async function fetchTableDataCanal() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token available');
      }

      const accessToken = JSON.parse(token).access_token;
      const formdata = new FormData();
      formdata.append('Hipto-Authorization', accessToken);

      const requestOptions = {
        method: 'POST',
        body: formdata,
      };

      const response = await fetch(
        `${BASE_URL}/${api_version}/report/channels?vertical_id=${selectedVerticalId}&from=${selectedDateFrom}&to=${selectedDateTo}`,
        requestOptions,
      );

      const responseData = await response.json();
      const dataArray = Array.isArray(responseData) ? responseData : [responseData];

      setTableDataCanal(dataArray);
    } catch (error) {
      handleError(error);
    }
  }
  useEffect(() => {
    if (selectedVerticalId && selectedDateFrom && selectedDateTo) {
      fetchTableData();
      fetchTableDataCanal();
    }
  }, [selectedVerticalId, selectedDateFrom, selectedDateTo]);
  const handleError = (error) => {
    Swal.fire({
      icon: 'error',
      text: 'Erreur lors de la récupération des données ! ',
      width: '30%',
      confirmButtonText: "Ok, j'ai compris!",
      confirmButtonColor: '#0095E8',
    });
    setError('Erreur lors de la récupération des données.');
  };
  const platforms = [
    { name: 'Facebook', logo: facebook },
    { name: 'Google', logo: google },
    { name: 'Snapchat', logo: snapchat },
    { name: 'TikTok', logo: tiktok },
    { name: 'Bing', logo: bing },
    { name: 'Taboola', logo: taboola,},
    { name: 'Outbrain', logo: outbrain, },
    { name: 'Autre', logo: autre },
  ];

  const renderPlatformRow = (platform) => {
    const rowData = tableData[0]; // Assuming tableData contains only one object for now
    const leadCount = rowData ? rowData[platform.name.toLowerCase()] || 0 : 0;
    const testCount = rowData ? rowData[`${platform.name.toLowerCase()}_test`] || 0 : 0;
    const expenses = rowData ? rowData[`${platform.name.toLowerCase()}_expenses`] || 0 : 0;
    const cpl = rowData ? rowData[`${platform.name.toLowerCase()}_cpl`] || 0 : 0;

    return (
      <TableRow key={platform.name}>
        <TableCell component="th" scope="row" className='td_channel'>
          {' '}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={platform.logo}
              style={{ width: '35px', marginRight: '10px' }}
              alt={`${platform.name} Logo`}
            />
            <Typography>{platform.name}</Typography>
          </div>
        </TableCell>
        <TableCell align="center">
          {leadCount} ({testCount})
        </TableCell>
        <TableCell align="center">{expenses}</TableCell>
        <TableCell align="center">{cpl}</TableCell>
        <TableCell align="center">-</TableCell>
      </TableRow>
    );
  };

  return (
    <DashboardCard>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label="Par Canal" {...a11yProps(0)} />
            <Tab label="Par Ad Plateform" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <Table sx={{ minWidth: 650, padding: '0px' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ITEM</TableCell>
                <TableCell align="center">LEAD</TableCell>
                <TableCell align="center">CPL&nbsp;</TableCell>
                <TableCell align="center">DEPENCES&nbsp;</TableCell>
                <TableCell align="center">TX MARGE&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {TableDataCanal.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className='td_channel'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={row.channel_logo} style={{ width: '35px', marginRight: '10px' }} />
                      {row.channel_name}
                    </div>
                  </TableCell>

                  <TableCell align="center">
                    {row.count} ({row.leads_test})
                  </TableCell>
                  <TableCell align="center">{row.cpl}</TableCell>
                  <TableCell align="center">{row.expenses}</TableCell>
                  <TableCell align="center">-</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Table
            sx={{ minWidth: 650, padding: '0px', textAlign: 'center' }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>ITEM</TableCell>
                <TableCell align="center">LEAD</TableCell>
                <TableCell align="center">CPL</TableCell>
                <TableCell align="center">DEPENCES</TableCell>
                <TableCell align="center">TX MARGE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{platforms.map(renderPlatformRow)}</TableBody>
          </Table>
        </TabPanel>
      </Box>
    </DashboardCard>
  );
}

export default TableLead;
