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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  async function getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      throw new Error('No token available');
    }
  }

  const [tableData, setTableData] = useState([]);
  const formdata = new FormData();
  useEffect(() => {
    const fetchTableData = async () => {
      if (selectedVerticalId && selectedDateFrom && selectedDateTo) {
        try {
          const token = await getToken();
          const responseObject = JSON.parse(token);
          const accessToken = responseObject.access_token;
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
            // Check if the response data is an array, if not convert it into an array
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
    };

    fetchTableData();
  }, [selectedVerticalId, selectedDateFrom, selectedDateTo]);
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
              <TableRow>
                <TableCell component="th" scope="row">
                  Landbot
                </TableCell>
                <TableCell align="center">120&nbsp;</TableCell>
                <TableCell align="center">120&nbsp;</TableCell>
                <TableCell align="center">120&nbsp;</TableCell>
                <TableCell align="center">120&nbsp;</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Table sx={{ minWidth: 650, padding: "0px", textAlign:'center' }} aria-label="simple table">
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
            {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                  <Typography> Facebook </Typography>
                  </TableCell>
                  <TableCell align="center">{row.facebook}({row.facebook_test})</TableCell>
                  <TableCell align="center">{row.facebook_expenses}</TableCell>
                  <TableCell align="center">{row.facebook_cpl}</TableCell>
                  <TableCell align="center">-</TableCell>
                </TableRow>
              ))}
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                  <Typography> Google </Typography>
                  </TableCell>
                  <TableCell align="center">{row.google}({row.google_test})</TableCell>
                  <TableCell align="center">{row.google_expenses}</TableCell>
                  <TableCell align="center">{row.google_cpl}</TableCell>
                  <TableCell align="center">-</TableCell>
                </TableRow>
              ))}
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                  <Typography> Snapchat </Typography>
                  </TableCell>
                  <TableCell align="center">{row.snapchat}({row.snapchat_test})</TableCell>
                  <TableCell align="center">{row.snapchat_expenses}</TableCell>
                  <TableCell align="center">{row.snapchat_cpl}</TableCell>
                  <TableCell align="center">-</TableCell>
                </TableRow>
              ))}
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                  <Typography> Tiktok </Typography>
                  </TableCell>
                  <TableCell align="center">{row.tiktok}({row.tiktok_test})</TableCell>
                  <TableCell align="center">{row.tiktok_expenses}</TableCell>
                  <TableCell align="center">{row.tiktok_cpl}</TableCell>
                  <TableCell align="center">-</TableCell>
                </TableRow>
              ))}
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                  <Typography> Bing </Typography>
                  </TableCell>
                  <TableCell align="center">{row.bing}({row.bing_test})</TableCell>
                  <TableCell align="center">{row.bing_expenses}</TableCell>
                  <TableCell align="center">{row.bing_cpl}</TableCell>
                  <TableCell align="center">-</TableCell>
                </TableRow>
              ))}
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                  <Typography> Taboola </Typography>
                  </TableCell>
                  <TableCell align="center">{row.taboola}({row.taboola_test})</TableCell>
                  <TableCell align="center">{row.taboola_expenses}</TableCell>
                  <TableCell align="center">{row.taboola_cpl}</TableCell>
                  <TableCell align="center">-</TableCell>
                </TableRow>
              ))}
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                  <Typography> Outbrain </Typography>
                  </TableCell>
                  <TableCell align="center">{row.outbrain}({row.outbrain_test})</TableCell>
                  <TableCell align="center">{row.outbrain_expenses}</TableCell>
                  <TableCell align="center">{row.outbrain_cpl}</TableCell>
                  <TableCell align="center">-</TableCell>
                </TableRow>
              ))}
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                  <Typography> Autre </Typography>
                  </TableCell>
                  <TableCell align="center">{row.others}({row.others_test})</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabPanel>
      </Box>
    </DashboardCard>
  );
}

export default TableLead;
