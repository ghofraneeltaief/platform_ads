import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, TextField  } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import '../pioche/components/selection.css';
import { BASE_URL, api_version } from '../authentication/config';

function Component({ onVerticalSelect, onVerticalSelectName, onDateFromSelect, onDateToSelect, onRecalculateClick }) {
  async function getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      throw new Error('No token available');
    }
  }

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

  const [verticals, setVerticals] = useState([]);
  const [selectedVerticals, setSelectedVerticals] = useState([]);
  const [selectedDateFrom, setSelectedDateFrom] = useState(new Date().toISOString().substr(0, 10));
  const [selectedDateTo, setSelectedDateTo] = useState(new Date().toISOString().substr(0, 10));

  const handleVerticalSelect = (event, values) => {
    const verticalIds = values.map((value) => value.vertical_id);
    const verticalNames = values.map((value) => value.vertical_code);
    setSelectedVerticals(values);
    onVerticalSelect(verticalIds);
    onVerticalSelectName(verticalNames);
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
      const verticalIds = selectedVerticals.map((vertical) => vertical.vertical_id);
      const verticalNames = selectedVerticals.map((value) => value.vertical_code);
      onVerticalSelectName(verticalNames);
      onVerticalSelect(verticalIds);
      onDateFromSelect(selectedDateFrom);
      onDateToSelect(selectedDateTo);
      if (onRecalculateClick) {
        onRecalculateClick();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Typography variant="h6" mb={1}>
            Verticales
          </Typography>
          <Autocomplete
            multiple
            id="verticals-select"
            options={verticals}
            getOptionLabel={(option) => option.vertical_code}
            value={selectedVerticals}
            onChange={handleVerticalSelect}
            renderInput={(params) => (
              <TextField {...params} label="Choisir" />
            )}
          />
        </Grid>
        <Grid item xs={3.6}>
          <Typography variant="h6" sx={{ fontWeight: '400' }}>
            Période
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <input
                type="date"
                className="form-control"
                value={selectedDateFrom}
                onChange={(e) => handleDateFromChange(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <input
                type="date"
                className="form-control"
                value={selectedDateTo}
                onChange={(e) => handleDateToChange(e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} display={'flex'} alignItems={'center'}>
          <Button variant="contained" onClick={handleRecalculate} sx={{ marginRight: '10px' }}>
            Recalculer
          </Button>
          <Button variant="contained" color="secondary">
            Exporter
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Component;
