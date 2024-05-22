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
  Button,
  IconButton,
  CircularProgress,
  Checkbox,
  Menu,
  ListItem,
  ListItemText,
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import { BASE_URL, api_version } from '../../authentication/config';
import Swal from 'sweetalert2';
import FilterListIcon from '@mui/icons-material/FilterList';
import { FixedSizeList } from 'react-window';

function Leads({
  selectedVerticalId,
  selectedDateFrom,
  selectedDateTo,
  onCanalCount,
  onSourceCount,
  selectedTimeTo,
  selectedTimeFrom,
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
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [selectedFilterHeader, setSelectedFilterHeader] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [allUniqueValues, setAllUniqueValues] = useState({});
  const [searchValues, setSearchValues] = useState({});
  const [filterIconColors, setFilterIconColors] = useState({});


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
        `${BASE_URL}/${api_version}/pioche/headers?vertical_id=${selectedVerticalId}&from=${selectedDateFrom}&to=${selectedDateTo}&start_time=${selectedTimeFrom}&end_time=${selectedTimeTo}`,
        requestOptions,
      );
      const data = await response.json();
      setTableHeaders(data);
    } catch (error) {
      handleFetchError('Erreur lors de la récupération des en-têtes de colonne!');
    }
  }, [selectedVerticalId, selectedDateFrom, selectedDateTo, selectedTimeFrom, selectedTimeTo]);

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
        `${BASE_URL}/${api_version}/pioche/datas?vertical_id=${selectedVerticalId}&from=${selectedDateFrom}&to=${selectedDateTo}&start_time=${selectedTimeFrom}&end_time=${selectedTimeTo}`,
        requestOptions,
      );
      const data = await response.json();
      setTableData(data);
      const countsSource = {};
      const counts = {};
      data.forEach((item) => {
        const source = item.utm_source || 'Unorganized';
        countsSource[source] = (countsSource[source] || 0) + 1;
        counts[item.canal] = (counts[item.canal] || 0) + 1;
      });
      onSourceCount(countsSource);
      onCanalCount(counts);
    } catch (error) {
      handleFetchError('Erreur lors de la récupération des données !');
    } finally {
      setIsLoading(false); // Définir isLoading à false une fois le chargement terminé
    }
  }, [selectedVerticalId, selectedDateFrom, selectedDateTo, selectedTimeFrom, selectedTimeTo]);

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
    if (selectedVerticalId && selectedDateFrom && selectedDateTo && selectedTimeFrom && selectedTimeTo) {
      Promise.all([fetchTableHeaders(), fetchTableData()]).catch((error) =>
        handleFetchError('Erreur lors de la récupération des données !'),
      );
    }
  }, [selectedVerticalId, selectedDateFrom, selectedDateTo, selectedTimeFrom, selectedTimeTo]);

  useEffect(() => {
    if (selectedVerticalId && selectedDateFrom && selectedDateTo && selectedTimeFrom && selectedTimeTo) {
      Promise.all([fetchTableHeaders(), fetchTableData()]).catch((error) =>
        handleFetchError('Erreur lors de la récupération des données !'),
      );
    }
  }, [selectedVerticalId, selectedDateFrom, selectedDateTo, selectedTimeFrom, selectedTimeTo, fetchTableHeaders, fetchTableData]);

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
// Lorsque vous cliquez sur l'icône de filtre, mettez à jour la couleur de l'icône de cette colonne
const handleFilterIconClick = (event, header) => {
  setAnchorEl(event.currentTarget);
  setSelectedFilterHeader(header);

  // Vérifiez si des filtres sont déjà appliqués pour cette colonne
  if (!selectedFilters[header] || selectedFilters[header].length === 0) {
    // Si aucun filtre n'est appliqué, réinitialisez la couleur de l'icône à sa couleur d'origine
    setFilterIconColors((prevColors) => ({
      ...prevColors,
      [header]: '#FFFFFF', // Couleur d'icône de filtre d'origine
    }));
  } else {
    // Sinon, laissez la couleur de l'icône inchangée
    setFilterIconColors((prevColors) => ({
      ...prevColors,
      [header]: prevColors[header], // Conserver la couleur actuelle de l'icône de filtre
    }));
  }
};

// Lorsque vous appliquez un filtre, mettez à jour la couleur de l'icône de filtre de cette colonne
const handleCheckboxChange = (event, value) => {
  setSelectedFilters((prevFilters) => {
    const headerFilters = prevFilters[selectedFilterHeader] || [];

    if (event.target.checked) {
      // Sélectionner la valeur du filtre et mettre à jour la couleur de l'icône
      setFilterIconColors((prevColors) => ({
        ...prevColors,
        [selectedFilterHeader]: '#000000', // Nouvelle couleur lorsque le filtre est appliqué
      }));

      return {
        ...prevFilters,
        [selectedFilterHeader]: [...headerFilters, value],
      };
    } else {
      // Désélectionner la valeur du filtre et rétablir la couleur de l'icône
      const updatedFilters = headerFilters.filter((filterValue) => filterValue !== value);
      const newFilters = {
        ...prevFilters,
        [selectedFilterHeader]: updatedFilters.length > 0 ? updatedFilters : undefined,
      };

      if (updatedFilters.length === 0) {
        // Rétablir la couleur de l'icône à sa couleur d'origine lorsque le filtre est retiré
        setFilterIconColors((prevColors) => ({
          ...prevColors,
          [selectedFilterHeader]: '#FFFFFF', // Couleur d'icône de filtre d'origine
        }));
      }

      // Appliquer immédiatement le filtre
      setAppliedFilters(newFilters);
      return newFilters;
    }
  });
};
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedFilterHeader(null);
  };
  const getUniqueValues = (columnName) => {
    const uniqueValues = new Set();
    tableData.forEach((row) => {
      const value = row[columnName];
      if (
        !searchValues[columnName] ||
        (typeof value === 'string' && value.toLowerCase().includes(searchValues[columnName]?.toLowerCase())) ||
        (typeof value === 'number' && String(value).includes(searchValues[columnName]?.toLowerCase()))
      ) {
        uniqueValues.add(value);
      }
    });
    return Array.from(uniqueValues);
  };
  useEffect(() => {
    const uniqueValuesMap = {};
    tableHeaders.forEach((header) => {
      uniqueValuesMap[header] = getUniqueValues(header);
    });
    setAllUniqueValues(uniqueValuesMap);
  }, [tableHeaders, tableData]);

  const applyFilters = () => {
    handleCloseMenu();
    setAppliedFilters(selectedFilters);
    setFilterPanelOpen(false); // Fermer le panneau de filtre après application des filtres
  };
  const handleSearchChange = (event, columnName) => {
    const { value } = event.target;
    setSearchValues((prevSearchValues) => ({
      ...prevSearchValues,
      [columnName]: value,
    }));
  };
  const renderFilterMenu = (columnName) => {
    const uniqueValues = getUniqueValues(columnName);

    return (
      <>
        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
          <TextField
            id={`search-${columnName}`}
            label="Rechercher"
            variant="outlined"
            size="small"
            value={searchValues[columnName] || ''}
            onChange={(event) => handleSearchChange(event, columnName)}
          />
        </Box>
        <FixedSizeList height={200} width={220} itemSize={40} itemCount={uniqueValues.length}>
          {({ index, style }) => (
            <ListItem button style={style} key={uniqueValues[index]}>
              <Checkbox
                checked={selectedFilters[columnName]?.includes(uniqueValues[index])}
                onChange={(event) => handleCheckboxChange(event, uniqueValues[index])}
              />
              <ListItemText primary={uniqueValues[index]} />
            </ListItem>
          )}
        </FixedSizeList>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <Button
            variant="contained"
            style={{ backgroundColor: 'white', color: '#2a8947' }}
            onClick={handleCloseMenu}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: '#2a8947', color: 'white' }}
            onClick={applyFilters}
            sx={{ marginLeft: '8px' }}
          >
            OK
          </Button>
        </Box>
      </>
    );
  };

  const renderTableHeaders = () => {
    const handleFilterChange = (event, header) => {
      const { value } = event.target;
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [header]: value,
      }));
    };

    return tableHeaders.map((header) => {
      const uniqueValues = getUniqueValues(header) || [];

      return (
        <TableCell key={header} sx={{ backgroundColor: '#A367DC', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {header}
            </Typography>
            <IconButton onClick={(event) => handleFilterIconClick(event, header)}>
            <FilterListIcon style={{ color: filterIconColors[header] || '#FFFFFF' }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl && selectedFilterHeader === header)}
              onClose={handleCloseMenu}
            >
              {renderFilterMenu(header)}
            </Menu>
          </Box>
        </TableCell>
      );
    });
  };
  const renderTableBody = () => {
    const filteredData = tableData.filter((row) => {
      return Object.entries(appliedFilters).every(([header, selectedValues]) => {
        if (selectedValues && selectedValues.length > 0) {
          return selectedValues.includes(row[header]);
        }
        return true; // Inclure toutes les lignes si aucun filtre n'est sélectionné pour cette colonne
      });
    });
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
        {filteredData.length === 0 && !isLoading && (
          <TableRow>
            <TableCell colSpan={10} align="center">
              Aucune donnée correspondant aux filtres sélectionnés.
            </TableCell>
          </TableRow>
        )}
        {/* Sinon, afficher les données */}
        {!isLoading &&
          filteredData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={index}>
                <TableCell className="table_lead_td">
                  <Typography variant="subtitle2">{row.fk_data_id}</Typography>
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
                    <IconButton onClick={(event) => handleFilterIconClick(event, 'fk_data_id')}>
                      <FilterListIcon style={{ color: filterIconColors['fk_data_id'] || '#FFFFFF' }} />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl && selectedFilterHeader === 'fk_data_id')}
                      onClose={handleCloseMenu}
                    >
                      {renderFilterMenu('fk_data_id')}
                    </Menu>
                  </Box>
                </TableCell>
                <TableCell sx={{ backgroundColor: '#67B7DC', color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Date
                    </Typography>
                    <IconButton
                      onClick={(event) => handleFilterIconClick(event, 'data_created_date')}
                    >
                    <FilterListIcon style={{ color: filterIconColors['data_created_date'] || '#FFFFFF' }} />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl && selectedFilterHeader === 'data_created_date')}
                      onClose={handleCloseMenu}
                    >
                      {renderFilterMenu('data_created_date')}
                    </Menu>
                  </Box>
                </TableCell>
                <TableCell sx={{ backgroundColor: '#67B7DC', color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Id
                    </Typography>
                    <IconButton onClick={(event) => handleFilterIconClick(event, 'id')}>
                    <FilterListIcon style={{ color: filterIconColors['id'] || '#FFFFFF' }} />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl && selectedFilterHeader === 'id')}
                      onClose={handleCloseMenu}
                    >
                      {renderFilterMenu('id')}
                    </Menu>
                  </Box>
                </TableCell>
                <TableCell sx={{ backgroundColor: '#626DD2', color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Nom
                    </Typography>
                    <IconButton onClick={(event) => handleFilterIconClick(event, 'nom')}>
                    <FilterListIcon style={{ color: filterIconColors['nom'] || '#FFFFFF' }} />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl && selectedFilterHeader === 'nom')}
                      onClose={handleCloseMenu}
                    >
                      {renderFilterMenu('nom')}
                    </Menu>
                  </Box>
                </TableCell>
                <TableCell sx={{ backgroundColor: '#626DD2', color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Prénom
                    </Typography>
                    <IconButton onClick={(event) => handleFilterIconClick(event, 'prenom')}>
                    <FilterListIcon style={{ color: filterIconColors['prenom'] || '#FFFFFF' }} />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl && selectedFilterHeader === 'prenom')}
                      onClose={handleCloseMenu}
                    >
                      {renderFilterMenu('prenom')}
                    </Menu>
                  </Box>
                </TableCell>
                <TableCell sx={{ backgroundColor: '#626DD2', color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Email
                    </Typography>
                    <IconButton onClick={(event) => handleFilterIconClick(event, 'email')}>
                    <FilterListIcon style={{ color: filterIconColors['email'] || '#FFFFFF' }} />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl && selectedFilterHeader === 'email')}
                      onClose={handleCloseMenu}
                    >
                      {renderFilterMenu('email')}
                    </Menu>
                  </Box>
                </TableCell>
                <TableCell sx={{ backgroundColor: '#626DD2', color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Téléphone
                    </Typography>
                    <IconButton onClick={(event) => handleFilterIconClick(event, 'telephone')}>
                    <FilterListIcon style={{ color: filterIconColors['telephone'] || '#FFFFFF' }} />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl && selectedFilterHeader === 'telephone')}
                      onClose={handleCloseMenu}
                    >
                      {renderFilterMenu('telephone')}
                    </Menu>
                  </Box>
                </TableCell>
                {renderTableHeaders()}
                <TableCell sx={{ backgroundColor: '#DC67AB', color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Canal
                    </Typography>
                    <IconButton onClick={(event) => handleFilterIconClick(event, 'canal')}>
                    <FilterListIcon style={{ color: filterIconColors['canal'] || '#FFFFFF' }} />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl && selectedFilterHeader === 'canal')}
                      onClose={handleCloseMenu}
                    >
                      {renderFilterMenu('canal')}
                    </Menu>
                  </Box>
                </TableCell>
                <TableCell sx={{ backgroundColor: '#DC67AB', color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      utm_source
                    </Typography>
                    <IconButton onClick={(event) => handleFilterIconClick(event, 'utm_source')}>
                    <FilterListIcon style={{ color: filterIconColors['utm_source'] || '#FFFFFF' }} />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl && selectedFilterHeader === 'utm_source')}
                      onClose={handleCloseMenu}
                    >
                      {renderFilterMenu('utm_source')}
                    </Menu>
                  </Box>
                </TableCell>
                <TableCell sx={{ backgroundColor: '#DC67AB', color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      utm_medium
                    </Typography>
                    <IconButton onClick={(event) => handleFilterIconClick(event, 'utm_medium')}>
                    <FilterListIcon style={{ color: filterIconColors['utm_medium'] || '#FFFFFF' }} />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl && selectedFilterHeader === 'utm_medium')}
                      onClose={handleCloseMenu}
                    >
                      {renderFilterMenu('utm_medium')}
                    </Menu>
                  </Box>
                </TableCell>
                <TableCell sx={{ backgroundColor: '#DC67AB', color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      utm_campaign
                    </Typography>
                    <IconButton onClick={(event) => handleFilterIconClick(event, 'utm_campaign')}>
                    <FilterListIcon style={{ color: filterIconColors['utm_campaign'] || '#FFFFFF' }} />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl && selectedFilterHeader === 'utm_campaign')}
                      onClose={handleCloseMenu}
                    >
                      {renderFilterMenu('utm_campaign')}
                    </Menu>
                  </Box>
                </TableCell>
                <TableCell sx={{ backgroundColor: '#DC67AB', color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      utm_term
                    </Typography>
                    <IconButton onClick={(event) => handleFilterIconClick(event, 'utm_term')}>
                    <FilterListIcon style={{ color: filterIconColors['utm_term'] || '#FFFFFF' }} />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl && selectedFilterHeader === 'utm_term')}
                      onClose={handleCloseMenu}
                    >
                      {renderFilterMenu('utm_term')}
                    </Menu>
                  </Box>
                </TableCell>
                <TableCell sx={{ backgroundColor: '#DC67AB', color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      utm_content
                    </Typography>
                    <IconButton onClick={(event) => handleFilterIconClick(event, 'utm_content')}>
                    <FilterListIcon style={{ color: filterIconColors['utm_content'] || '#FFFFFF' }} />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl && selectedFilterHeader === 'utm_content')}
                      onClose={handleCloseMenu}
                    >
                      {renderFilterMenu('utm_content')}
                    </Menu>
                  </Box>
                </TableCell>
                <TableCell sx={{ backgroundColor: '#DC67AB', color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      utm_angle
                    </Typography>
                    <IconButton onClick={(event) => handleFilterIconClick(event, 'utm_angle')}>
                    <FilterListIcon style={{ color: filterIconColors['utm_angle'] || '#FFFFFF' }} />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl && selectedFilterHeader === 'utm_angle')}
                      onClose={handleCloseMenu}
                    >
                      {renderFilterMenu('utm_angle')}
                    </Menu>
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
        />
      )}
    </DashboardCard>
  );
}

export default Leads;