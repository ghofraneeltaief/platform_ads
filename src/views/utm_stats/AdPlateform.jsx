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
} from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import Component from './Component';
import DashboardCard from '../../components/shared/DashboardCard';
import './AdPlateform.css';
import Switch from '@mui/material/Switch';

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
  function renderTableCells(cells) {
    return cells.map((cell, index) => (
      <TableCell key={index} sx={{ color: 'white', textAlign: 'center' }}>
        {cell}
      </TableCell>
    ));
  }
  // Définir un état local pour gérer l'état de l'affichage des détails
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
                      ...(tabValue === index && tab.sx ? tab.sx : {}), // Appliquer les styles supplémentaires si l'onglet est sélectionné
                    }}
                  />
                ))}
              </Tabs>
              <Box sx={{ flexGrow: 1 }}>
                <TabPanel value={tabValue} index={0}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#4269F4' }}>
                        {renderTableCells([
                          '',
                          'NAME ACCOUNT',
                          'ON/OFF',
                          'ID',
                          'CAMPAIGN',
                          'LEAD',
                          'DEPENSES',
                          'CPL',
                          'CTR',
                          'CPM',
                          'TC',
                        ])}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ padding: '0px' }}>
                          {/* Utiliser un IconButton pour contrôler l'ouverture et la fermeture des détails */}
                          <IconButton onClick={() => setIsDetailsOpen(!isDetailsOpen)}>
                            {isDetailsOpen ? (
                              <RemoveCircleOutlinedIcon />
                            ) : (
                              <AddCircleOutlinedIcon />
                            )}
                          </IconButton>
                        </TableCell>
                        {/* Afficher les données de la première colonne */}
                        <TableCell sx={{ textAlign: 'center' }}>FIB_1</TableCell>
                        {/* Afficher les données de la deuxième colonne */}
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Switch {...label} />
                        </TableCell>
                        {/* Afficher les autres colonnes de données */}
                        <TableCell sx={{ textAlign: 'center' }}>200</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>14e-FOMO3-CC-LANDBOT</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>80</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>16</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>20</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>1</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>2</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>20</TableCell>
                      </TableRow>
                      {/* Afficher les détails si isDetailsOpen est true */}
                      {isDetailsOpen && (
                        <TableRow>
                          <TableCell colSpan={12}>
                            {/* Mettre les détails à afficher ici */}
                            <Table>
                              <TableHead>
                                <TableRow sx={{ backgroundColor: '#4269F4' }}>
                                  <TableCell></TableCell>
                                  <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                                    NAME ACCOUNT
                                  </TableCell>
                                  <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                                    ON/OFF
                                  </TableCell>
                                  <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                                    ID
                                  </TableCell>
                                  <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                                    Adset
                                  </TableCell>
                                  <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                                    LEAD
                                  </TableCell>
                                  <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                                    DEPENSES
                                  </TableCell>
                                  <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                                    CPL
                                  </TableCell>
                                  <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                                    CTR
                                  </TableCell>
                                  <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                                    CPM
                                  </TableCell>
                                  <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                                    TC
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow>
                                  <TableCell>
                                    {/* Utiliser un IconButton pour contrôler l'ouverture et la fermeture des détails */}
                                    <IconButton onClick={() => setIsOpen(!isOpen)}>
                                      {isOpen ? (
                                        <RemoveCircleOutlinedIcon />
                                      ) : (
                                        <AddCircleOutlinedIcon />
                                      )}
                                    </IconButton>
                                  </TableCell>
                                  <TableCell sx={{ textAlign: 'center' }}>FIB_1</TableCell>
                                  <TableCell sx={{ textAlign: 'center' }}>
                                    <Switch {...label} />
                                  </TableCell>
                                  <TableCell sx={{ textAlign: 'center' }}>200</TableCell>
                                  <TableCell sx={{ textAlign: 'center' }}>
                                    14e-FOMO3-CC-LANDBOT
                                  </TableCell>
                                  <TableCell sx={{ textAlign: 'center' }}>80</TableCell>
                                  <TableCell sx={{ textAlign: 'center' }}>16</TableCell>
                                  <TableCell sx={{ textAlign: 'center' }}>20</TableCell>
                                  <TableCell sx={{ textAlign: 'center' }}>1</TableCell>
                                  <TableCell sx={{ textAlign: 'center' }}>2</TableCell>
                                  <TableCell sx={{ textAlign: 'center' }}>20</TableCell>
                                </TableRow>
                                {isOpen && (
                                  <TableRow>
                                    <TableCell colSpan={12}>
                                      {/* Mettre les détails à afficher ici */}
                                      <Table>
                                        <TableHead>
                                          <TableRow sx={{ backgroundColor: '#4269F4' }}>
                                            <TableCell></TableCell>
                                            <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                                              NAME ACCOUNT
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                                              ON/OFF
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                                              ID
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                                              Ad
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                                              LEAD
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                                              DEPENSES
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                                              CPL
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                                              CTR
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                                              CPM
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                                              TC
                                            </TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                              FIB_1
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                              <Switch {...label} />
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>200</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                              14e-FOMO3-CC-LANDBOT
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>80</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>16</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>20</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>1</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>2</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>20</TableCell>
                                          </TableRow>
                                        </TableBody>
                                      </Table>
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#0F9D58' }}>
                        {renderTableCells([
                          '',
                          'NAME ACCOUNT',
                          'ON/OFF',
                          'ID',
                          'CAMPAIGN',
                          'LEAD',
                          'DEPENSES',
                          'CPL',
                          'CTR',
                          'CPM',
                          'TC',
                        ])}
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
                      <TableRow sx={{ backgroundColor: '#EDD70E' }}>
                        {renderTableCells([
                          '',
                          'NAME ACCOUNT',
                          'ON/OFF',
                          'ID',
                          'CAMPAIGN',
                          'LEAD',
                          'DEPENSES',
                          'CPL',
                          'CTR',
                          'CPM',
                          'TC',
                        ])}
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
                      <TableRow sx={{ backgroundColor: '#000000' }}>
                        {renderTableCells([
                          '',
                          'NAME ACCOUNT',
                          'ON/OFF',
                          'ID',
                          'CAMPAIGN',
                          'LEAD',
                          'DEPENSES',
                          'CPL',
                          'CTR',
                          'CPM',
                          'TC',
                        ])}
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
                        {renderTableCells([
                          '',
                          'NAME ACCOUNT',
                          'ON/OFF',
                          'ID',
                          'CAMPAIGN',
                          'LEAD',
                          'DEPENSES',
                          'CPL',
                          'CTR',
                          'CPM',
                          'TC',
                        ])}
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
                      <TableRow sx={{ backgroundColor: '#154a99' }}>
                        {renderTableCells([
                          '',
                          'NAME ACCOUNT',
                          'ON/OFF',
                          'ID',
                          'CAMPAIGN',
                          'LEAD',
                          'DEPENSES',
                          'CPL',
                          'CTR',
                          'CPM',
                          'TC',
                        ])}
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
                      <TableRow sx={{ backgroundColor: '#f3a21d8a' }}>
                        {renderTableCells([
                          '',
                          'NAME ACCOUNT',
                          'ON/OFF',
                          'ID',
                          'CAMPAIGN',
                          'LEAD',
                          'DEPENSES',
                          'CPL',
                          'CTR',
                          'CPM',
                          'TC',
                        ])}
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
