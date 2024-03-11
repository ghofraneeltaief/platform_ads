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

function Plateform_google() {
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
    </>
    
  );
}

export default Plateform_google;
