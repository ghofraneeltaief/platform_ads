import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import PlateformFB from './Plateforms/Plateform_FB';
import PlateformGoogle from './Plateforms/Plateform_Google';
import PlateformSnapchat from './Plateforms/Plateform_Snapchat';
import PlateformTiktok from './Plateforms/Plateform_Tiktok';
import PlateformBing from './Plateforms/Plateform_Bing';
import PlateformTaboola from './Plateforms/Plateform_Taboola';
import PlateformOutbrain from './Plateforms/Plateform_Outbrain';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import '../AdPlateform.css';
import { BASE_URL, api_version } from '../../authentication/config';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// Composant pour chaque panneau d'onglet
function TabPanel({ children, value, index }) {
  return <div hidden={value !== index}>{value === index && <div>{children}</div>}</div>;
}

// Composant pour chaque panneau d'onglet
function TabPanelPlateform({ children, value, index }) {
  return <div hidden={value !== index}>{value === index && <div>{children}</div>}</div>;
}

function AdPlateform_table({
  selectedVerticalId,
  selectedDateFrom,
  selectedDateTo,
  selectedVerticals,
}) {
  const [tabValue, setTabValue] = useState(0);
  const [tabValue_Plateform, setTabValue_Plateform] = useState(0);
  const [selectedPlatformIds, setSelectedPlatformIds] = useState([]);
  const [socialNetworks, setSocialNetworks] = useState([]);

  // Tableau des libellés et couleurs des onglets
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

  // Gestionnaire de changement d'onglet
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleTabChange_Plateform = (event, newValue) => {
    setTabValue_Plateform(newValue);
  };
  // Gestionnaire de changement de case à cocher
  const handleChange = (event, index) => {
    const { checked } = event.target;
    const selectedPlatformId = socialNetworks.find(
      (sn) => sn.sn_name === LabelCheckbox[index],
    )?.sn_id;
    if (checked) {
      setSelectedPlatformIds((prevIds) => [...prevIds, selectedPlatformId]);
    } else {
      setSelectedPlatformIds((prevIds) => prevIds.filter((id) => id !== selectedPlatformId));
    }
  };
  // Tableau des libellés de case à cocher
  const LabelCheckbox = ['Facebook', 'Google', 'Snapchat', 'Tiktok', 'Bing', 'Taboola', 'Outbrain'];
  // Fonction pour obtenir le token
  async function getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      throw new Error('No token available');
    }
  }

  // Effet pour récupérer les données initiales
  const fetchData = async () => {
    try {
      const token = await getToken();
      const responseObject = JSON.parse(token);
      const accessToken = responseObject.access_token;
      const formdata = new FormData();
      formdata.append('Hipto-Authorization', accessToken);
      const requestOptions = {
        method: 'POST',
        body: formdata,
      };
      const response = await fetch(`${BASE_URL}/${api_version}/social_networks`, requestOptions);
      const data = await response.json();
      setSocialNetworks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="vertical tabs example">
        {selectedVerticals &&
          selectedVerticals.map((verticalNames, index) => (
            <Tab key={index} label={`${verticalNames}`} {...a11yProps(index)} />
          ))}
      </Tabs>
      {selectedVerticalId && selectedVerticalId.length > 0 ? (
        selectedVerticalId.map((verticalId, index) => (
          <TabPanel key={index} value={tabValue} index={index}>
            <DashboardCard sx={{ padding: '0px' }}>
              <Box sx={{ marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ marginRight: '10px' }}>
                  Ad platform :
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {LabelCheckbox.map((label, index) => (
                    <FormControlLabel
                      key={index}
                      control={<Checkbox onChange={(event) => handleChange(event, index)} />}
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
                  value={tabValue_Plateform}
                  onChange={handleTabChange_Plateform}
                >
                  {tabLabels.map((tab, index) => (
                    <Tab
                      key={index}
                      label={tab.label}
                      sx={{
                        backgroundColor:
                          tabValue_Plateform === index
                            ? tab.sx
                              ? tab.sx.background
                              : tab.backgroundColor
                            : '#DCDCDC',
                        color:
                          tabValue_Plateform === index
                            ? tab.sx
                              ? tab.sx.color
                              : 'white'
                            : 'black',
                        padding: '19.2px',
                        ...(tabValue_Plateform === index && tab.sx ? tab.sx : {}),
                      }}
                    />
                  ))}
                </Tabs>
                <Box sx={{ flexGrow: 1 }}>
                  <TabPanelPlateform value={tabValue_Plateform} index={0}>
                    <PlateformFB />
                  </TabPanelPlateform>
                  <TabPanelPlateform value={tabValue_Plateform} index={1}>
                    <PlateformGoogle />
                  </TabPanelPlateform>
                  <TabPanelPlateform value={tabValue_Plateform} index={2}>
                    <PlateformSnapchat />
                  </TabPanelPlateform>
                  <TabPanelPlateform value={tabValue_Plateform} index={3}>
                    <PlateformTiktok />
                  </TabPanelPlateform>
                  <TabPanelPlateform value={tabValue_Plateform} index={4}>
                    <PlateformBing />
                  </TabPanelPlateform>
                  <TabPanelPlateform value={tabValue_Plateform} index={5}>
                    <PlateformTaboola />
                  </TabPanelPlateform>
                  <TabPanelPlateform value={tabValue_Plateform} index={6}>
                    <PlateformOutbrain />
                  </TabPanelPlateform>
                </Box>
              </Box>
            </DashboardCard>
          </TabPanel>
        ))
      ) : (
        <DashboardCard sx={{ padding: '0px' }} title={`Ad Platform`}></DashboardCard>
      )}
    </>
  );
}

export default AdPlateform_table;
