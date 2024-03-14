import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import Component from './Component';
import DashboardCard from '../../components/shared/DashboardCard';
import './AdPlateform.css';
import PlateformFB from './Plateforms/Plateform_FB';
import PlateformGoogle from './Plateforms/Plateform_Google';
import PlateformSnapchat from './Plateforms/Plateform_Snapchat';
import PlateformTiktok from './Plateforms/Plateform_Tiktok';
import PlateformBing from './Plateforms/Plateform_Bing';
import PlateformTaboola from './Plateforms/Plateform_Taboola';
import PlateformOutbrain from './Plateforms/Plateform_Outbrain';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { BASE_URL, api_version } from '../authentication/config';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const tabLabels = [
  { label: 'Facebook', backgroundColor: '#4269F4' },
  { label: 'Google', backgroundColor: '#0F9D58' },
  { label: 'Snapchat', backgroundColor: '#EDD70E' },
  { label: 'Tiktok', backgroundColor: '#000000' },
  {
    label: 'Bing',
    sx: {
      background: 'linear-gradient(to right, #FF3A3A, #EDFC6D, #5BD54F, #2889DA)',
      color: 'white',
      padding: '19.2px',
    },
  },
  { label: 'Taboola', backgroundColor: '#154a99' },
  { label: 'Outbrain', backgroundColor: '#f3a21d8a' },
];

function TabPanel({ children, value, index }) {
  return <div hidden={value !== index}>{value === index && <div>{children}</div>}</div>;
}

function AdPlatform() {
  const [tabValue, setTabValue] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [socialNetworks, setSocialNetworks] = useState([]);
  /* Begin: getToken */
  async function getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      throw new Error('No token available');
    }
  }
  /* End: getToken */
  const formdata = new FormData();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const responseObject = JSON.parse(token);
        const accessToken = responseObject.access_token;
        formdata.append('Hipto-Authorization', accessToken);
        const requestOptions = {
          method: 'POST',
          body: formdata,
        };
        const response = await fetch(`${BASE_URL}/${api_version}/social_networks`, requestOptions);
        const data = await response.json();
        console.log(data);
        LabelCheckbox.forEach((label) => {
         if (label == null) {
         }
        })
        setSocialNetworks(data); // Assuming data is an array of social networks
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to execute only once after initial render

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleExpandToggle = () => {
    setExpanded(!expanded);
  };

  const handleChange = () => {
    setIsChecked(!isChecked);
  };
  const LabelCheckbox = ['Facebook', 'Google', 'Snapchat', 'TikTok', 'Bing', 'Taboola', 'Outbrain'];

  const handleRecalculateClick = () => {
  };

  return (
    <Box sx={{ width: 1 }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 12">
          <Component onRecalculateClick={handleRecalculateClick} />
        </Box>
        <Box gridColumn="span 12">
          <DashboardCard sx={{ padding: '0px' }}>
            <Box sx={{ marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle1" sx={{ marginRight: '10px' }}>
                Ad platform :
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {LabelCheckbox.map((label, index) => (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox />}
                    label={label}
                    sx={{ marginRight: '10px' }}
                  />
                ))}
              </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={tabValue}
                onChange={handleTabChange}
              >
                {tabLabels.map((tab, index) => (
                  <Tab
                    key={index}
                    label={tab.label}
                    sx={{
                      backgroundColor:
                        tabValue === index
                          ? tab.sx
                            ? tab.sx.background
                            : tab.backgroundColor
                          : '#DCDCDC',
                      color: tabValue === index ? (tab.sx ? tab.sx.color : 'white') : 'black',
                      padding: '19.2px',
                      ...(tabValue === index && tab.sx ? tab.sx : {}),
                    }}
                  />
                ))}
              </Tabs>
              <Box sx={{ flexGrow: 1 }}>
                <TabPanel value={tabValue} index={0}>
                  <PlateformFB />
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <PlateformGoogle />
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                  <PlateformSnapchat />
                </TabPanel>
                <TabPanel value={tabValue} index={3}>
                  <PlateformTiktok />
                </TabPanel>
                <TabPanel value={tabValue} index={4}>
                  <PlateformBing />
                </TabPanel>
                <TabPanel value={tabValue} index={5}>
                  <PlateformTaboola />
                </TabPanel>
                <TabPanel value={tabValue} index={6}>
                  <PlateformOutbrain />
                </TabPanel>
              </Box>
            </Box>
          </DashboardCard>
        </Box>
      </Box>
    </Box>
  );
}

export default AdPlatform;
