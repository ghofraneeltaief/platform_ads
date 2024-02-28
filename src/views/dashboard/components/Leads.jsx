import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import { BASE_URL, api_version } from '../../authentication/config';

function Leads({ selectedVerticalId,selectedDateFrom,selectedDateTo }) {

  const [tableHeaders, setTableHeaders] = useState([]);
  useEffect(() => {
    fetchTableHeaders();
  }, []);
  const fetchTableHeaders = async () => {
    try {
      const requestOptions = {
        method: 'GET',
      };
      const response = await fetch(
        `${BASE_URL}/${api_version}/pioche/headers/${selectedVerticalId}${selectedDateFrom}${selectedDateTo}`,
        requestOptions,
      );
      const data = await response.json();
      setTableHeaders(data); // Mettre à jour l'état avec les en-têtes de colonne récupérés depuis l'API
    } catch (error) {
      console.error('Erreur lors de la récupération des en-têtes de colonne :', error);
    }
  };

  return (
    <DashboardCard>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" mr={25}>
          Leads Log
        </Typography>
        <Typography
          sx={{ backgroundColor: '#67B7DC', color: 'white', padding: '10px' }}
          variant="h7"
          mr={5}
        >
          Plateform
        </Typography>
        <Typography
          sx={{ backgroundColor: '#626DD2', color: 'white', padding: '10px' }}
          variant="h7"
          mr={5}
        >
          Coordonnées
        </Typography>
        <Typography
          sx={{ backgroundColor: '#A367DC', color: 'white', padding: '10px' }}
          variant="h7"
          mr={5}
        >
          Client
        </Typography>
        <Typography
          sx={{ backgroundColor: '#DC67AB', color: 'white', padding: '10px' }}
          variant="h7"
          mr={18}
        >
          Marketing
        </Typography>
        <TextField id="outlined-basic" label="Rechercher" variant="outlined" />
      </Box>
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        {/* Begin:: table */}
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
            mt: 2,
          }}
        >
          {/* Begin:: table head */}
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#67B7DC', color: 'white' }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  IDH
                </Typography>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#67B7DC', color: 'white' }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Date
                </Typography>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#67B7DC', color: 'white' }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Id
                </Typography>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#626DD2', color: 'white' }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Nom
                </Typography>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#626DD2', color: 'white' }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Prenom
                </Typography>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#626DD2', color: 'white' }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Email
                </Typography>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#626DD2', color: 'white' }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Téléphone
                </Typography>
              </TableCell>
              {/* Générer dynamiquement les balises th en fonction des données d'en-tête */}
            {tableHeaders.map(header => (
              <TableCell sx={{ backgroundColor: '#A367DC', color: 'white' }} key={header.field}>
                <Typography variant="subtitle2" fontWeight={600}>
                {header.label}
                </Typography>
              </TableCell>
            ))}
              <TableCell sx={{ backgroundColor: '#DC67AB', color: 'white' }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Canal
                </Typography>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#DC67AB', color: 'white' }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  utm_source
                </Typography>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#DC67AB', color: 'white' }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  utm_medium
                </Typography>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#DC67AB', color: 'white' }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  utm_campaign
                </Typography>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#DC67AB', color: 'white' }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  utm_term
                </Typography>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#DC67AB', color: 'white' }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  utm_content
                </Typography>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#DC67AB', color: 'white' }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  utm_angle
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          {/* End:: table head */}
          {/* Begin:: table body */}
          <TableBody>
            <TableRow>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}></Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}
                    ></Typography>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
          {/* End:: table */}
        </Table>
        {/* End:: table */}
      </Box>
    </DashboardCard>
  );
}

export default Leads;
