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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Component from './Component';
import DashboardCard from '../../components/shared/DashboardCard';
import './AdPlateform.css';
import Switch from '@mui/material/Switch';
import { TreeView, TreeItem } from '@mui/lab';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
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
                        <TableCell
                          sx={{ backgroundColor: '#4269F4', color: 'white', textAlign: 'center' }}
                        ></TableCell>
                        <TableCell
                          sx={{ backgroundColor: '#4269F4', color: 'white', textAlign: 'center' }}
                        >
                          NAME ACCOUNT
                        </TableCell>
                        <TableCell
                          sx={{ backgroundColor: '#4269F4', color: 'white', textAlign: 'center' }}
                        >
                          ON/OFF
                        </TableCell>
                        <TableCell
                          sx={{ backgroundColor: '#4269F4', color: 'white', textAlign: 'center' }}
                        >
                          ID
                        </TableCell>
                        <TableCell
                          sx={{ backgroundColor: '#4269F4', color: 'white', textAlign: 'center' }}
                        >
                          CAMPAIGN
                        </TableCell>
                        <TableCell
                          sx={{ backgroundColor: '#4269F4', color: 'white', textAlign: 'center' }}
                        >
                          LEAD
                        </TableCell>
                        <TableCell
                          sx={{ backgroundColor: '#4269F4', color: 'white', textAlign: 'center' }}
                        >
                          DEPENSES
                        </TableCell>
                        <TableCell
                          sx={{ backgroundColor: '#4269F4', color: 'white', textAlign: 'center' }}
                        >
                          CPL
                        </TableCell>
                        <TableCell
                          sx={{ backgroundColor: '#4269F4', color: 'white', textAlign: 'center' }}
                        >
                          CTR
                        </TableCell>
                        <TableCell
                          sx={{ backgroundColor: '#4269F4', color: 'white', textAlign: 'center' }}
                        >
                          CPM
                        </TableCell>
                        <TableCell
                          sx={{ backgroundColor: '#4269F4', color: 'white', textAlign: 'center' }}
                        >
                          TC
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      
                      <TableRow>
                      <TableCell colSpan={11}>
                <TreeView
                  aria-label="treeview"
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                >
                  <TreeItem nodeId="1" label={<TableRow>
                          <TableCell>FIB_1</TableCell>
                          <TableCell>
                            <Switch {...label} />
                          </TableCell>
                          <TableCell>200</TableCell>
                          <TableCell>14e-FOMO3-CC-LANDBOT</TableCell>
                          <TableCell>80</TableCell>
                          <TableCell>16</TableCell>
                          <TableCell>20</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>2</TableCell>
                          <TableCell>20</TableCell>
                        </TableRow>}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>NAME ACCOUNT</TableCell>
                          <TableCell>ON/OFF</TableCell>
                          <TableCell>ID</TableCell>
                          <TableCell>Adsets</TableCell>
                          <TableCell>LEAD</TableCell>
                          <TableCell>DEPENSES</TableCell>
                          <TableCell>CPL</TableCell>
                          <TableCell>CTR</TableCell>
                          <TableCell>CPM</TableCell>
                          <TableCell>TC</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>FIB_1</TableCell>
                          <TableCell>
                            <Switch {...label} />
                          </TableCell>
                          <TableCell>200</TableCell>
                          <TableCell>14e-FOMO3-CC-LANDBOT</TableCell>
                          <TableCell>80</TableCell>
                          <TableCell>16</TableCell>
                          <TableCell>20</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>2</TableCell>
                          <TableCell>20</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TreeItem>
                </TreeView>
              </TableCell>
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
                        <TableCell sx={{ color: 'white' }}>NAME ACCOUNT</TableCell>
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