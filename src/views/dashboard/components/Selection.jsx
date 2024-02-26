import React, { useState, useEffect } from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box'; // Import Box from Material-UI to add space
import Divider from '@mui/material/Divider'; // Import Divider from Material-UI to add a separator
import { BASE_URL, api_version } from '../../authentication/config';

function Selection() {
  const [verticales, setVerticales] = useState([]);
  const [selectedVerticale, setSelectedVerticale] = useState('');
  useEffect(() => {
    // Fetch data when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Hipto-Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIwNjBjYTE5YTU1ZDAzOTg1MWI1MjRkMmM5M2I0ZGY1MSIsInVzZXJuYW1lIjoiTml6YXIgQUxNYWhyb3VrIiwidXNlcl9pZCI6IjE1IiwidXNlcl9lbWFpbCI6Im5pemFyQGhpcHRvLmNvbSIsIkFQSV9USU1FIjoxNzA4NTk4NTQyLCJFWFBJUkVfVElNRSI6MTcwODY4NDk0Mn0.Xv1loNmCxSkA0Bht2Mmq4dzySXY-7FSdc9D_S7d_TMg');
      myHeaders.append('Cookie', 'hp_ads_session=p77s2qmkiqam7u243cn2ncvocu0i4k6o');

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(`${BASE_URL}/${api_version}/verticals`, requestOptions);
      const data = await response.json();
      setVerticales(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleVerticaleChange = (event) => {
    setSelectedVerticale(event.target.value);
  };
  return (
    <DashboardCard sx={{ padding: '0px' }} title="Sélection">
      {/* Begin:: separator */}
      <Box pb={4}>
        <Divider sx={{ width: '100%' }} />
      </Box>
      {/* End:: separator */}
      {/* Begin:: select verticales */}
      <FormControl fullWidth>
        <InputLabel id="verticales-label">Verticales</InputLabel>
        <Select
          labelId="verticales-label"
          id="verticales-select"
          value={selectedVerticale}
          onChange={handleVerticaleChange}
          label="Verticale"
        >
          {verticales.map((vertical) => (
            <MenuItem key={vertical.id} value={vertical.id}>
              {vertical.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* End:: select verticales */}
      {/* Begin:: select Sources */}
      <Box my={2}>
        <FormControl fullWidth>
          <InputLabel id="sources-label">Sources</InputLabel>
          <Select
            labelId="sources-label"
            id="sources-select"
            label="Source"
          >
            {/* Add MenuItem elements for sources here */}
          </Select>
        </FormControl>
      </Box>
      {/* End:: select Sources */}
    </DashboardCard>
  );
}

export default Selection;
