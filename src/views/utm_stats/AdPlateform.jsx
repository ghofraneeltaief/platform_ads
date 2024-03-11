import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  TableCell,
} from '@mui/material';
import Component from './Component';
import DashboardCard from '../../components/shared/DashboardCard';
import './AdPlateform.css';
import  Plateform_FB from './Plateforms/Plateform_FB';
import  Plateform_Google from './Plateforms/Plateform_Google';
import  Plateform_Snapchat from './Plateforms/Plateform_Snapchat';
import  Plateform_Tiktok from './Plateforms/Plateform_Tiktok';
import  Plateform_Bing from './Plateforms/Plateform_Bing';
import  Plateform_Taboola from './Plateforms/Plateform_Taboola';
import  Plateform_Outbrain from './Plateforms/Plateform_Outbrain';

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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleExpandToggle = () => {
    setExpanded(!expanded);
  };
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };
  
  return (
    <Box sx={{ width: 1 }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 12">
          <Component />
        </Box>
        <Box gridColumn="span 12">
          <DashboardCard sx={{ padding: '0px' }} title="Ad platform">
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
                  <Plateform_FB/>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                <Plateform_Google/>
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                <Plateform_Snapchat/>
                </TabPanel>
                <TabPanel value={tabValue} index={3}>
                <Plateform_Tiktok/>
                </TabPanel>
                <TabPanel value={tabValue} index={4}>
                <Plateform_Bing/>
                </TabPanel>
                <TabPanel value={tabValue} index={5}>
                <Plateform_Taboola/>
                </TabPanel>
                <TabPanel value={tabValue} index={6}>
                <Plateform_Outbrain/>
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
