import * as React from 'react';
import { Typography, Box, TextField, TablePagination } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'; // Import de DataGrid
import DashboardCard from '../../../components/shared/DashboardCard';
import { BASE_URL, api_version } from '../../authentication/config';
import Swal from 'sweetalert2';
import './leads.css';

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

  const [tableHeaders, setTableHeaders] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [error, setError] = React.useState(null);

  const fetchTableHeaders = React.useCallback(async () => {
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

  const fetchTableData = React.useCallback(async () => {
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
    }
  }, [selectedVerticalId, selectedDateFrom, selectedDateTo, onSourceCount, onCanalCount]);

  const handleFetchError = (errorMessage) => {
    Swal.fire({
      icon: 'error',
      text: errorMessage,
      width: '30%',
      confirmButtonText: "Ok, j'ai compris!",
      confirmButtonColor: '#0095E8',
    });
    setError(errorMessage);
  };

  React.useEffect(() => {
    if (selectedVerticalId && selectedDateFrom && selectedDateTo) {
      Promise.all([fetchTableHeaders(), fetchTableData()]).catch((error) =>
        handleFetchError('Erreur lors de la récupération des données !'),
      );
    }
  }, [selectedVerticalId, selectedDateFrom, selectedDateTo]);

  React.useEffect(() => {
    setTableData(tableDataVide);
    setTableHeaders(tableDataVide);
  }, [tableDataVide]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
      {tableData.length === 0 ? (
      <Typography variant="body1"></Typography>
    ) : (
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <DataGrid
          columns={[
            {
              field: 'fk_data_id',
              headerName: 'IDH',
              width: 150,
              sortable: true,
              headerClassName: 'custom-header',
            },
            {
              field: 'data_created_date',
              headerName: 'Date',
              width: 150,
              sortable: true,
              headerClassName: 'custom-header',
            },
            {
              field: 'id',
              headerName: 'ID',
              width: 150,
              sortable: true,
              headerClassName: 'custom-header',
            },
            {
              field: 'nom',
              headerName: 'Nom',
              width: 150,
              sortable: true,
              headerClassName: 'custom-header2',
            },
            {
              field: 'prenom',
              headerName: 'Prenom',
              width: 150,
              sortable: true,
              headerClassName: 'custom-header2',
            },
            {
              field: 'email',
              headerName: 'Email',
              width: 150,
              sortable: true,
              headerClassName: 'custom-header2',
            },
            {
              field: 'telephone',
              headerName: 'Téléphone',
              width: 150,
              sortable: true,
              headerClassName: 'custom-header2',
            },
            ...tableHeaders.map((header) => ({
              field: header,
              headerName: header,
              width: 150,
              sortable: true,
              headerClassName: 'custom-header3',
            })),
            {
              field: 'canal',
              headerName: 'Canal',
              width: 150,
              sortable: true,
              headerClassName: 'custom-header4',
            },
            {
              field: 'utm_source',
              headerName: 'utm_source',
              width: 150,
              sortable: true,
              headerClassName: 'custom-header4',
            },
            {
              field: 'utm_medium',
              headerName: 'utm_medium',
              width: 150,
              sortable: true,
              headerClassName: 'custom-header4',
            },
            {
              field: 'utm_campaign',
              headerName: 'utm_campaign',
              width: 150,
              sortable: true,
              headerClassName: 'custom-header4',
            },
            {
              field: 'utm_term',
              headerName: 'utm_term',
              width: 150,
              sortable: true,
              headerClassName: 'custom-header4',
            },
            {
              field: 'utm_content',
              headerName: 'utm_content',
              width: 150,
              sortable: true,
              headerClassName: 'custom-header4',
            },
            {
              field: 'utm_angle',
              headerName: 'utm_angle',
              width: 150,
              sortable: true,
              headerClassName: 'custom-header4',
            },
          ]}
          rows={tableData}
          pageSize={rowsPerPage}
          autoHeight
          disableColumnSelector
          localeText={{
            noRowsLabel: 'Aucune données disponible.',
          }}
        />
      </Box>)}
    </DashboardCard>
  );
}

export default Leads;
