import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Switch,
} from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';

function Plateform_FB({ selectedVerticalId, selectedDateFrom, selectedDateTo }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDetailsToggle = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

  const handleDetailsExpandToggle = () => {
    setIsOpen(!isOpen);
  };

  const renderTableCells = (cells) => {
    return cells.map((cell, index) => (
      <TableCell key={index} sx={{ color: 'white', textAlign: 'center' }}>
        {cell}
      </TableCell>
    ));
  };

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
          <TableRow className={isDetailsOpen ? 'tableRowOpen' : ''}>
            <TableCell sx={{ padding: '0px' }}>
              {/* Utiliser un IconButton pour contrôler l'ouverture et la fermeture des détails */}
              <IconButton onClick={() => setIsDetailsOpen(!isDetailsOpen)}>
                {isDetailsOpen ? <RemoveCircleOutlinedIcon /> : <AddCircleOutlinedIcon />}
              </IconButton>
            </TableCell>
            {/* Afficher les données de la première colonne */}
            <TableCell sx={{ textAlign: 'center' }}>FIB_1</TableCell>
            {/* Afficher les données de la deuxième colonne */}
            <TableCell sx={{ textAlign: 'center' }}>
              <Switch />
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
                      {renderTableCells([
                        '',
                        'NAME ACCOUNT',
                        'ON/OFF',
                        'ID',
                        'ADSET',
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
                    <TableRow className={isOpen ? 'tableRowOpen' : ''}>
                      <TableCell>
                        {/* Utiliser un IconButton pour contrôler l'ouverture et la fermeture des détails */}
                        <IconButton onClick={() => setIsOpen(!isOpen)}>
                          {isOpen ? <RemoveCircleOutlinedIcon /> : <AddCircleOutlinedIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>FIB_1</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Switch />
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>200</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>14e-FOMO3-CC-LANDBOT</TableCell>
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
                                {renderTableCells([
                                  '',
                                  'NAME ACCOUNT',
                                  'ON/OFF',
                                  'ID',
                                  'AD',
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
                                <TableCell sx={{ textAlign: 'center' }}>FIB_1</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                  <Switch />
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
    </>
  );
}

export default Plateform_FB;
