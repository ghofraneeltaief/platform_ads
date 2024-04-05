import React, { useState, useEffect, useCallback } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
  CircularProgress,
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import { BASE_URL, api_version } from '../../authentication/config';
import Swal from 'sweetalert2';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Select, MenuItem } from '@mui/material';

function Leads({
  selectedVerticalId,
  selectedDateFrom,
  selectedDateTo,
  onCanalCount,
  onSourceCount,
  tableDataVide,
}) {
  const getToken = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      throw new Error('No token available');
    }
  };

  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedFilter, setSelectedFilter] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [selectedFilterHeader, setSelectedFilterHeader] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchTableHeaders = useCallback(async () => {
    try {
      const token = await getToken();
      const accessToken = JSON.parse(token).access_token;
      const formdata = new FormData();
      formdata.append('Hipto-Authorization', accessToken);
      const requestOptions = {
        method: 'POST',
        body: formdata,
      };
      const response = await fetch(
        `${BASE_URL}/${api_version}/pioche/headers?vertical_id=${selectedVerticalId}&from=${selectedDateFrom}&to=${selectedDateTo}`,
        requestOptions,
      );
      const data = await response.json();
      setTableHeaders(data);
    } catch (error) {
      handleFetchError('Erreur lors de la récupération des en-têtes de colonne!');
    }
  }, [selectedVerticalId, selectedDateFrom, selectedDateTo]);

  const fetchTableData = useCallback(async () => {
    setIsLoading(true); // Définir isLoading à true au début du chargement
    try {
      const token = await getToken();
      const accessToken = JSON.parse(token).access_token;
      const formdata = new FormData();
      formdata.append('Hipto-Authorization', accessToken);
      const requestOptions = {
        method: 'POST',
        body: formdata,
      };
      const response = await fetch(
        `${BASE_URL}/${api_version}/pioche/datas?vertical_id=${selectedVerticalId}&from=${selectedDateFrom}&to=${selectedDateTo}`,
        requestOptions,
      );
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      handleFetchError('Erreur lors de la récupération des données !');
    } finally {
      setIsLoading(false); // Définir isLoading à false une fois le chargement terminé
    }
  }, [selectedVerticalId, selectedDateFrom, selectedDateTo]);

  const handleFetchError = (errorMessage) => {
    Swal.fire({
      icon: 'error',
      text: errorMessage,
      width: '30%',
      confirmButtonText: "Ok, j'ai compris!",
      confirmButtonColor: '#0095E8',
    });
  };

  useEffect(() => {
    if (selectedVerticalId && selectedDateFrom && selectedDateTo) {
      Promise.all([fetchTableHeaders(), fetchTableData()]).catch((error) =>
        handleFetchError('Erreur lors de la récupération des données !'),
      );
    }
  }, [selectedVerticalId, selectedDateFrom, selectedDateTo]);

  useEffect(() => {
    if (selectedVerticalId && selectedDateFrom && selectedDateTo) {
      Promise.all([fetchTableHeaders(), fetchTableData()]).catch((error) =>
        handleFetchError('Erreur lors de la récupération des données !'),
      );
    }
  }, [selectedVerticalId, selectedDateFrom, selectedDateTo, fetchTableHeaders, fetchTableData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterPanelOpen && !event.target.closest('.filter-dialog-container')) {
        setFilterPanelOpen(false); // Masquer le panneau de filtre si le clic est en dehors
        setSelectedFilterHeader(null); // Réinitialiser le header du filtre ouvert
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [filterPanelOpen]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  const renderTableHeaders = () => {
    return tableHeaders.map((header) => (
      <TableCell key={header} sx={{ backgroundColor: '#A367DC', color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {header}
          </Typography>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Box>
      </TableCell>
    ));
  };
  const renderTableBody = () => {
    return (
      <>
        {isLoading && (
          <TableRow>
            <TableCell colSpan={10} align="center">
              <CircularProgress />
            </TableCell>
          </TableRow>
        )}
        {/* Si tableData est vide, afficher un message */}
        {tableData.length === 0 && !isLoading && (
          <TableRow>
            <TableCell colSpan={10} align="center">
              Aucune information n'est disponible.
            </TableCell>
          </TableRow>
        )}
        {/* Sinon, afficher les données */}
        {!isLoading &&
          tableData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={index}>
                <TableCell className="table_lead_td">
                  <Typography variant="subtitle2">{row.nom}</Typography>
                </TableCell>
                <TableCell className="table_lead_td">
                  <Typography variant="subtitle2">{row.data_created_date}</Typography>
                </TableCell>
                <TableCell className="table_lead_td">
                  <Typography variant="subtitle2">{row.id}</Typography>
                </TableCell>
                <TableCell className="table_lead_td">
                  <Typography variant="subtitle2">{row.nom}</Typography>
                </TableCell>
                <TableCell className="table_lead_td">
                  <Typography variant="subtitle2">{row.prenom}</Typography>
                </TableCell>
                <TableCell className="table_lead_td">
                  <Typography variant="subtitle2">{row.email}</Typography>
                </TableCell>
                <TableCell className="table_lead_td">
                  <Typography variant="subtitle2">{row.telephone}</Typography>
                </TableCell>
                {tableHeaders.map((header) => (
                  <TableCell key={header} className="table_lead_td">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle2"></Typography>
                        <Typography color="textSecondary" sx={{ fontSize: '13px' }}>
                          {row[header]}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                ))}
                <TableCell className="table_lead_td">
                  <Typography variant="subtitle2">{row.canal}</Typography>
                </TableCell>
                <TableCell className="table_lead_td">
                  <Typography variant="subtitle2">{row.utm_source}</Typography>
                </TableCell>
                <TableCell className="table_lead_td">
                  <Typography variant="subtitle2">{row.utm_medium}</Typography>
                </TableCell>
                <TableCell className="table_lead_td">
                  <Typography variant="subtitle2">{row.utm_campaign}</Typography>
                </TableCell>
                <TableCell className="table_lead_td">
                  <Typography variant="subtitle2">{row.utm_term}</Typography>
                </TableCell>
                <TableCell className="table_lead_td">
                  <Typography variant="subtitle2">{row.utm_content}</Typography>
                </TableCell>
                <TableCell className="table_lead_td">
                  <Typography variant="subtitle2">{row.utm_angle}</Typography>
                </TableCell>
              </TableRow>
            ))}
      </>
    );
  };
  return (
    <DashboardCard>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" mr={15}>
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
      {tableData && tableData.length > 0 && (
        <Table aria-label="simple table" sx={{ whiteSpace: 'nowrap', mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#67B7DC', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    IDH
                  </Typography>
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#67B7DC', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Date
                  </Typography>
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#67B7DC', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Id
                  </Typography>
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#626DD2', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Nom
                  </Typography>
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#626DD2', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Prénom
                  </Typography>
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#626DD2', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Email
                  </Typography>
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#626DD2', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Téléphone
                  </Typography>
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </Box>
              </TableCell>
              {renderTableHeaders()}
              <TableCell sx={{ backgroundColor: '#DC67AB', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Canal
                  </Typography>
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#DC67AB', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    utm_source
                  </Typography>
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#DC67AB', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    utm_medium
                  </Typography>
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#DC67AB', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    utm_campaign
                  </Typography>
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#DC67AB', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    utm_term
                  </Typography>
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#DC67AB', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    utm_content
                  </Typography>
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#DC67AB', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    utm_angle
                  </Typography>
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      )}
      </Box>
      {tableData && tableData.length > 0 && (
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> )}
    </DashboardCard>
  );
}

export default Leads;
