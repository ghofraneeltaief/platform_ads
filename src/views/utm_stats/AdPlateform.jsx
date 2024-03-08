import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import Component from './Component';
import DashboardCard from '../../components/shared/DashboardCard';
import './AdPlateform.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
function TabPanel({ children, value, index }) {
  return <div hidden={value !== index}>{value === index && <div>{children}</div>}</div>;
}

function AdPlatform() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
                <Tab
                  label="Facebook"
                  sx={{ backgroundColor: '#4269F4', color: 'white', padding: '19.2px' }}
                />
                <Tab
                  label="Google"
                  sx={{ backgroundColor: '#0F9D58', color: 'white', padding: '19.2px' }}
                />
                <Tab
                  label="Snapchat"
                  sx={{ backgroundColor: '#EDD70E', color: 'white', padding: '19.2px' }}
                />
                <Tab
                  label="Tiktok"
                  sx={{ backgroundColor: '#000000', color: 'white', padding: '19.2px' }}
                />
                <Tab
                  label="Bing"
                  className="gradient-background"
                  sx={{
                    color: 'white',
                    padding: '19.2px',
                  }}
                />
                <Tab
                  label="Taboola"
                  sx={{ backgroundColor: '#154a99', color: 'white', padding: '19.2px' }}
                />
                <Tab
                  label="Outbrain"
                  sx={{ backgroundColor: '#f3a21d8a', color: 'white', padding: '19.2px' }}
                />
              </Tabs>

              <Box sx={{ flexGrow: 1 }}>
                <TabPanel value={tabValue} index={0}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ backgroundColor: '#4269F4', color: 'white' }}></TableCell>
                        <TableCell sx={{ backgroundColor: '#4269F4', color: 'white' }}>
                          NAME ACCOUNT
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#4269F4', color: 'white' }}>
                          ON/OFF
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#4269F4', color: 'white' }}>
                          ID
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#4269F4', color: 'white' }}>
                          CAMPAIGN
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#4269F4', color: 'white' }}>
                          LEAD
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#4269F4', color: 'white' }}>
                          DEPENSES
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#4269F4', color: 'white' }}>
                          CPL
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#4269F4', color: 'white' }}>
                          CTR
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#4269F4', color: 'white' }}>
                          CPM
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#4269F4', color: 'white' }}>
                          TC
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                      <TreeView
        aria-label="multi-select"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
      >
        <TreeItem nodeId="1" label="Applications">
          <TreeItem nodeId="2" label="Calendar" />
          <TreeItem nodeId="3" label="Chrome" />
          <TreeItem nodeId="4" label="Webstorm" />
        </TreeItem>
        <TreeItem nodeId="5" label="Documents">
          <TreeItem nodeId="6" label="MUI">
            <TreeItem nodeId="7" label="src">
              <TreeItem nodeId="8" label="index.js" />
              <TreeItem nodeId="9" label="tree-view.js" />
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </TreeView>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ backgroundColor: '#0F9D58', color: 'white' }}></TableCell>
                        <TableCell sx={{ backgroundColor: '#0F9D58', color: 'white' }}>
                          NAME ACCOUNT
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#0F9D58', color: 'white' }}>
                          ON/OFF
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#0F9D58', color: 'white' }}>
                          ID
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#0F9D58', color: 'white' }}>
                          CAMPAIGN
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#0F9D58', color: 'white' }}>
                          LEAD
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#0F9D58', color: 'white' }}>
                          DEPENSES
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#0F9D58', color: 'white' }}>
                          CPL
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#0F9D58', color: 'white' }}>
                          CTR
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#0F9D58', color: 'white' }}>
                          CPM
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#0F9D58', color: 'white' }}>
                          TC
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ backgroundColor: '#EDD70E', color: 'white' }}></TableCell>
                        <TableCell sx={{ backgroundColor: '#EDD70E', color: 'white' }}>
                          NAME ACCOUNT
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#EDD70E', color: 'white' }}>
                          ON/OFF
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#EDD70E', color: 'white' }}>
                          ID
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#EDD70E', color: 'white' }}>
                          CAMPAIGN
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#EDD70E', color: 'white' }}>
                          LEAD
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#EDD70E', color: 'white' }}>
                          DEPENSES
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#EDD70E', color: 'white' }}>
                          CPL
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#EDD70E', color: 'white' }}>
                          CTR
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#EDD70E', color: 'white' }}>
                          CPM
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#EDD70E', color: 'white' }}>
                          TC
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabPanel>
                <TabPanel value={tabValue} index={3}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ backgroundColor: '#000000', color: 'white' }}></TableCell>
                        <TableCell sx={{ backgroundColor: '#000000', color: 'white' }}>
                          NAME ACCOUNT
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#000000', color: 'white' }}>
                          ON/OFF
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#000000', color: 'white' }}>
                          ID
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#000000', color: 'white' }}>
                          CAMPAIGN
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#000000', color: 'white' }}>
                          LEAD
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#000000', color: 'white' }}>
                          DEPENSES
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#000000', color: 'white' }}>
                          CPL
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#000000', color: 'white' }}>
                          CTR
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#000000', color: 'white' }}>
                          CPM
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#000000', color: 'white' }}>
                          TC
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabPanel>
                <TabPanel value={tabValue} index={4}>
                  <Table>
                    <TableHead>
                      <TableRow className="gradient-background">
                        <TableCell sx={{ color: 'white' }}></TableCell>
                        <TableCell sx={{ color: 'white' }}>
                          NAME ACCOUNT
                        </TableCell>
                        <TableCell sx={{ color: 'white' }}>ON/OFF</TableCell>
                        <TableCell sx={{ color: 'white' }}>ID</TableCell>
                        <TableCell sx={{ color: 'white' }}>CAMPAIGN</TableCell>
                        <TableCell sx={{ color: 'white' }}>LEAD</TableCell>
                        <TableCell sx={{ color: 'white' }}>DEPENSES</TableCell>
                        <TableCell sx={{ color: 'white' }}>CPL</TableCell>
                        <TableCell sx={{ color: 'white' }}>CTR</TableCell>
                        <TableCell sx={{ color: 'white' }}>CPM</TableCell>
                        <TableCell sx={{ color: 'white' }}>TC</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabPanel>
                <TabPanel value={tabValue} index={5}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ backgroundColor: '#154a99', color: 'white' }}></TableCell>
                        <TableCell sx={{ backgroundColor: '#154a99', color: 'white' }}>
                          NAME ACCOUNT
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#154a99', color: 'white' }}>
                          ON/OFF
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#154a99', color: 'white' }}>
                          ID
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#154a99', color: 'white' }}>
                          CAMPAIGN
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#154a99', color: 'white' }}>
                          LEAD
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#154a99', color: 'white' }}>
                          DEPENSES
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#154a99', color: 'white' }}>
                          CPL
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#154a99', color: 'white' }}>
                          CTR
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#154a99', color: 'white' }}>
                          CPM
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#154a99', color: 'white' }}>
                          TC
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabPanel>
                <TabPanel value={tabValue} index={6}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{ backgroundColor: '#f3a21d8a', color: 'white' }}
                        ></TableCell>
                        <TableCell sx={{ backgroundColor: '#f3a21d8a', color: 'white' }}>
                          NAME ACCOUNT
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#f3a21d8a', color: 'white' }}>
                          ON/OFF
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#f3a21d8a', color: 'white' }}>
                          ID
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#f3a21d8a', color: 'white' }}>
                          CAMPAIGN
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#f3a21d8a', color: 'white' }}>
                          LEAD
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#f3a21d8a', color: 'white' }}>
                          DEPENSES
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#f3a21d8a', color: 'white' }}>
                          CPL
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#f3a21d8a', color: 'white' }}>
                          CTR
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#f3a21d8a', color: 'white' }}>
                          CPM
                        </TableCell>
                        <TableCell sx={{ backgroundColor: '#f3a21d8a', color: 'white' }}>
                          TC
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
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
