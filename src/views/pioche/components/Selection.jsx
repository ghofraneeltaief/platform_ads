import React, { useState, useEffect } from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ImLoop2 } from "react-icons/im";
import { Grid, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './selection.css';
import { BASE_URL, api_version } from '../../authentication/config';

function Selection({ onVerticalSelect, onDateFromSelect, onDateToSelect, onRecalculateClick }) {
  async function getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      throw new Error('No token available');
    }
  }

  const [verticals, setVerticals] = useState([]);
  const [selectedVertical, setSelectedVertical] = useState(null);
  const [sources, setSources] = useState([]);
  const [selectedDateFrom, setSelectedDateFrom] = useState(new Date().toISOString().substr(0, 10));
  const [selectedDateTo, setSelectedDateTo] = useState(new Date().toISOString().substr(0, 10));

  const fetchVerticals = async () => {
    try {
      const token = await getToken();
      const responseObject = JSON.parse(token);
      const accessToken = responseObject.access_token;
      const formdata = new FormData();
      formdata.append('Hipto-Authorization', accessToken);
      const requestOptions = {
        method: 'POST',
        body: formdata,
      };
      const response = await fetch(`${BASE_URL}/${api_version}/verticals`, requestOptions);
      const data = await response.json();
      setVerticals(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVerticals();
  }, []);

  const handleVerticalSelect = (event, value) => {
    setSelectedVertical(value);
    onVerticalSelect(value?.vertical_id || '');
    fetchSources(value?.vertical_id);
  };

  const fetchSources = async (verticalId) => {
    try {
      const token = await getToken();
      const responseObject = JSON.parse(token);
      const accessToken = responseObject.access_token;
      const formdata = new FormData();
      formdata.append('Hipto-Authorization', accessToken);
      const requestOptions = {
        method: 'POST',
        body: formdata,
      };
      const response = await fetch(`${BASE_URL}/${api_version}/sources/?vertical_id=${verticalId}`, requestOptions);
      const data = await response.json();
      setSources(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateFromChange = (dateFrom) => {
    setSelectedDateFrom(dateFrom);
    onDateFromSelect(dateFrom);
  };

  const handleDateToChange = (dateTo) => {
    setSelectedDateTo(dateTo);
    onDateToSelect(dateTo);
  };

  const handleRecalculate = async () => {
    try {
      onDateFromSelect(selectedDateFrom);
      onDateToSelect(selectedDateTo);
      if (onRecalculateClick) {
        onRecalculateClick();
      }
    } catch (error){
      console.error(error);
    }
  };

  return (
    <DashboardCard sx={{ padding: '0px' }} title="Sélection">
      <Box pb={4}>
        <Divider sx={{ width: '100%' }} />
      </Box>
      <Typography variant="h6" sx={{ fontWeight: '400' }} mb={1}>
        Période
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="p" sx={{ fontWeight: '400' }} mb={1}>
            De :
          </Typography>
          <input
            type="date"
            className="form-control"
            value={selectedDateFrom}
            onChange={(e) => handleDateFromChange(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="p" sx={{ fontWeight: '400' }} mb={1}>
            à :
          </Typography>
          <input
            type="date"
            className="form-control"
            value={selectedDateTo}
            onChange={(e) => handleDateToChange(e.target.value)}
          />
        </Grid>
      </Grid>
      <Autocomplete
        options={verticals}
        getOptionLabel={(option) => option.vertical_code}
        value={selectedVertical}
        onChange={handleVerticalSelect}
        renderInput={(params) => <TextField {...params} label="Verticales" />}
      />
      <Box my={2}>
        <FormControl fullWidth>
          <InputLabel id="sources-label">Sources</InputLabel>
          <Select labelId="sources-label" id="sources-select" label="Source">
            {sources.map((source, index) => (
              <MenuItem key={index} value={source.source_id}>
                {source.source_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box my={2}>
        <Button variant="contained" onClick={handleRecalculate}><ImLoop2 />   <Typography  sx={{ paddingLeft: '7px' }}>Recalculer</Typography></Button>
      </Box>
    </DashboardCard>
  );
}

export default Selection;
