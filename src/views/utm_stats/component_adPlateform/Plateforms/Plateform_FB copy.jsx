import React, { useState } from 'react';
import {
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
import Switch from '@mui/material/Switch';

import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
function Plateform_FB() {
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
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  return (
    <>
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
                        <TableCell colSpan={15} sx={{ padding: '0px' }}>
                          <TreeView
                            aria-label="treeview"
                            defaultCollapseIcon={<RemoveCircleOutlinedIcon />}
                            defaultExpandIcon={<AddCircleOutlinedIcon />}
                          >
                            <TreeItem
                              nodeId="1"
                              label={
                                <Table>
                                  <TableRow>
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
                                </Table>
                              }
                            >
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
                                      Adsets
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
                                    <TableCell colSpan={11} sx={{ padding: '0px' }}>
                                      <TreeView
                                        aria-label="treeview"
                                        defaultCollapseIcon={<RemoveCircleOutlinedIcon />}
                                        defaultExpandIcon={<AddCircleOutlinedIcon />}
                                      >
                                        <TreeItem
                                          nodeId="1"
                                          label={
                                            <Table>
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
                                            </Table>
                                          }
                                        >
                                          <Table>
                                            <TableHead>
                                              <TableRow sx={{ backgroundColor: '#4269F4' }}>
                                                <TableCell></TableCell>
                                                <TableCell
                                                  sx={{ color: 'white', textAlign: 'center' }}
                                                >
                                                  NAME ACCOUNT
                                                </TableCell>
                                                <TableCell
                                                  sx={{ color: 'white', textAlign: 'center' }}
                                                >
                                                  ON/OFF
                                                </TableCell>
                                                <TableCell
                                                  sx={{ color: 'white', textAlign: 'center' }}
                                                >
                                                  ID
                                                </TableCell>
                                                <TableCell
                                                  sx={{ color: 'white', textAlign: 'center' }}
                                                >
                                                  AD
                                                </TableCell>
                                                <TableCell
                                                  sx={{ color: 'white', textAlign: 'center' }}
                                                >
                                                  LEAD
                                                </TableCell>
                                                <TableCell
                                                  sx={{ color: 'white', textAlign: 'center' }}
                                                >
                                                  DEPENSES
                                                </TableCell>
                                                <TableCell
                                                  sx={{ color: 'white', textAlign: 'center' }}
                                                >
                                                  CPL
                                                </TableCell>
                                                <TableCell
                                                  sx={{ color: 'white', textAlign: 'center' }}
                                                >
                                                  CTR
                                                </TableCell>
                                                <TableCell
                                                  sx={{ color: 'white', textAlign: 'center' }}
                                                >
                                                  CPM
                                                </TableCell>
                                                <TableCell
                                                  sx={{ color: 'white', textAlign: 'center' }}
                                                >
                                                  TC
                                                </TableCell>
                                              </TableRow>
                                            </TableHead>
                                            <TableBody>
                                              <TableRow>
                                                <TableCell></TableCell>
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
                            </TreeItem>
                          </TreeView>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

    </>
    
  );
}

export default Plateform_FB;
