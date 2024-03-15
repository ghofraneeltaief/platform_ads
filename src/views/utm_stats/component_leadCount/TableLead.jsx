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
      Swal.fire({
        icon: 'error',
        text: 'Erreur lors de la récupération des données ! ' + error.message,
        width: '30%',
        confirmButtonText: "Ok, j'ai compris!",
        confirmButtonColor: '#0095E8',
      });
      setError('Erreur lors de la récupération des données.');
    }
  }

  useEffect(() => {
    if (selectedVerticalId && selectedDateFrom && selectedDateTo) {
      fetchTableData();
    }
  }, [selectedVerticalId, selectedDateFrom, selectedDateTo]);

  const platforms = [
    { name: 'Facebook', logo: 'https://ads.hipto.com/template/assets/media/svg/brand-logos/facebook-4.svg' },
    { name: 'Google', logo: 'https://ads.hipto.com/template/assets/media/svg/brand-logos/google-icon.svg' },
    { name: 'Snapchat', logo: 'https://ads.hipto.com/template/assets/media/svg/brand-logos/20190808214526!Logo-Snapchat.png' },
    { name: 'TikTok', logo: 'https://ads.hipto.com/template/assets/media/svg/brand-logos/6057996-logo-tiktok-sur-fond-transparent-gratuit-vectoriel.jpg' },
    { name: 'Bing', logo: 'https://ads.hipto.com/template/assets/media/svg/brand-logos/microsoft-5.svg' },
    { name: 'Taboola', logo: 'https://ads.hipto.com/template/assets/media/svg/brand-logos/taboola-brands.png', style: { backgroundColor: '#000000' } },
    { name: 'Outbrain', logo: 'https://ads.hipto.com/template/assets/media/svg/brand-logos/outbrain-brands.png', style: { backgroundColor: '#000000' } },
    { name: 'Autre', logo: 'https://manager.hipto.com/grow/medias/images/no_image.jpg' },
  ];

  const renderPlatformRow = (platform) => {
    const rowData = tableData[0]; // Assuming tableData contains only one object for now
    const leadCount = rowData ? rowData[platform.name.toLowerCase()] || 0 : 0;
    const testCount = rowData ? rowData[`${platform.name.toLowerCase()}_test`] || 0 : 0;
    const expenses = rowData ? rowData[`${platform.name.toLowerCase()}_expenses`] || 0 : 0;
    const cpl = rowData ? rowData[`${platform.name.toLowerCase()}_cpl`] || 0 : 0;

    return (
      <TableRow key={platform.name}>
        <TableCell component="th" scope="row">
          <Typography>
            <img src={platform.logo} className="me-3" style={{ width: '35px', marginRight: '10px', ...(platform.style || {}) }} alt={`${platform.name} Logo`} />
            {platform.name}
          </Typography>
        </TableCell>
        <TableCell align="center">{leadCount} ({testCount})</TableCell>
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
          <Table sx={{ minWidth: 650, padding: "0px" }} aria-label="simple table">
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
              {/* Table rows for Par Canal */}
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Table sx={{ minWidth: 650, padding: "0px", textAlign: 'center' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ITEM</TableCell>
                <TableCell align="center">LEAD</TableCell>
                <TableCell align="center">CPL</TableCell>
                <TableCell align="center">DEPENCES</TableCell>
                <TableCell align="center">TX MARGE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {platforms.map(renderPlatformRow)}
            </TableBody>
          </Table>
        </TabPanel>
      </Box>
    </DashboardCard>
  );
}

export default TableLead;
