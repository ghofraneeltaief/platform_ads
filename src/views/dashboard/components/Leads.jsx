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
  TablePagination,
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import { BASE_URL, api_version } from '../../authentication/config';

function Leads({
  selectedVerticalId,
  selectedDateFrom,
  selectedDateTo,
  onCanalCount,
  onSourceCount,
}) {
  /* Begin: fetchTableHeaders fetchTableData */
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const fetchTableHeaders = async () => {
      if (selectedVerticalId && selectedDateFrom && selectedDateTo) {
        try {
          const requestOptions = {
            method: 'GET',
          };
          const response = await fetch(
            `${BASE_URL}/${api_version}/pioche/headers?vertical_id=${selectedVerticalId}&from=${selectedDateFrom}&to=${selectedDateTo}`,
            requestOptions,
          );
          const data = await response.json();
          setTableHeaders(data);
          // Mettre à jour l'état avec les en-têtes de colonne récupérés depuis l'API
        } catch (error) {
          console.error('Erreur lors de la récupération des en-têtes de colonne :', error);
        }
      }
    };
    /* Begin: fetchTableHeaders */
    /* Begin: fetchTableData */
    const fetchTableData = async () => {
      if (selectedVerticalId && selectedDateFrom && selectedDateTo) {
        try {
          const dataResponse = await fetch(
            `${BASE_URL}/${api_version}/pioche/datas?vertical_id=${selectedVerticalId}&from=${selectedDateFrom}&to=${selectedDateTo}`,
          );
          const data = await dataResponse.json();
          setTableData(data);
          // Compter le nombre d'occurrences pour chaque valeur de Source
          const countsSource = {};
          data.forEach((item) => {
            const Source = item.utm_source;
            if (countsSource[Source]) {
              countsSource[Source] += 1;
            } else {
              countsSource[Source] = 1;
            }
          });
          onSourceCount(countsSource);
          // Compter le nombre d'occurrences pour chaque valeur de canal
          const counts = {};
          data.forEach((item) => {
            const canal = item.canal;
            if (counts[canal]) {
              counts[canal] += 1;
            } else {
              counts[canal] = 1;
            }
          });
          onCanalCount(counts);
        } catch (error) {
          console.error('Erreur lors de la récupération des données du tableau :', error);
        }
      }
    };
    /* End: fetchTableData */
    fetchTableHeaders();
    fetchTableData();
  }, [selectedVerticalId, selectedDateFrom, selectedDateTo]);
  /* End: fetchTableData fetchTableHeaders */

  /* Begin: Pagination Table */
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  /* End: Pagination Table */

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
              {tableHeaders.map((header) => (
                <TableCell sx={{ backgroundColor: '#A367DC', color: 'white' }} key={header}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {header}
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
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="subtitle2">{row.nom}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.data_created_date}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.nom}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.prenom}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.telephone}</Typography>
                  </TableCell>
                  {tableHeaders.map((header) => (
                    <TableCell key={header}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle2"></Typography>
                          <Typography
                            color="textSecondary"
                            sx={{
                              fontSize: '13px',
                            }}
                          >
                            {row[header]}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                  ))}
                  <TableCell>
                    <Typography variant="subtitle2">{row.canal}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.utm_source}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.utm_medium}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.utm_campaign}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.utm_term}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.utm_content}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.utm_angle}</Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          {/* End:: table Body*/}
        </Table>
        {/* End:: table */}
      </Box>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </DashboardCard>
  );
}

export default Leads;
