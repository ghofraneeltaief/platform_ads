import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Switch,
  Typography,
} from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import './table.css';
function Campaign({ donnees }) {
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
  const formatCpl = (value) => {
    return parseFloat(value).toFixed(2);
  };
  return (
    <Table sx={{ Padding: '0 px' }}>
      <TableHead>
        <TableRow sx={{ backgroundColor: '#D44200' }}>
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
            <TableRow  className={isDetailsOpen ? 'tableRowOpen' : ''}>
              <TableCell>
                {/* Utiliser un IconButton pour contrôler l'ouverture et la fermeture des détails */}
                <IconButton onClick={() => setIsDetailsOpen(!isDetailsOpen)}>
                  {isDetailsOpen ? <RemoveCircleOutlinedIcon style={{ color: '#ffffff' }} /> : <AddCircleOutlinedIcon style={{ color: '#D44200' }}/>}
                </IconButton>
              </TableCell>
              {/* Afficher les données de la première colonne */}
              <TableCell sx={{ textAlign: 'center' }}>1</TableCell>
              {/* Afficher les données de la deuxième colonne */}
              <TableCell sx={{ textAlign: 'center' }}>
                <Switch />
              </TableCell>
              {/* Afficher les autres colonnes de données */}
              <TableCell sx={{ textAlign: 'center' }}>2</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>3</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>4</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>5</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>6</TableCell>
              <TableCell sx={{ textAlign: 'center' }}></TableCell>
              <TableCell sx={{ textAlign: 'center' }}></TableCell>
              <TableCell sx={{ textAlign: 'center' }}>-</TableCell>
            </TableRow>
        {/* Afficher les détails si isDetailsOpen est true */}
        {isDetailsOpen && (
          <TableRow>
            <TableCell colSpan={12}>
              {/* Mettre les détails à afficher ici */}
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#168BC4' }}>
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
                  <TableRow className={isOpen ? 'tableRowOpen2' : ''}>
                    <TableCell>
                      {/* Utiliser un IconButton pour contrôler l'ouverture et la fermeture des détails */}
                      <IconButton onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <RemoveCircleOutlinedIcon style={{ color: '#ffffff' }} /> : <AddCircleOutlinedIcon style={{ color: '#168BC4' }}/>}
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
                            <TableRow sx={{ backgroundColor: '#E7A33D' }}>
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
                            <TableRow sx={{ backgroundColor: '#E7A33D29' }}>
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
  );
}
export default Campaign;
