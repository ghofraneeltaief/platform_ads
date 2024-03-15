import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../pioche/components/selection.css';
import { BASE_URL, api_version } from '../authentication/config';

function Component({ onVerticalSelect, onDateFromSelect, onDateToSelect, onRecalculateClick }) {
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
  const [selectedVerticalId, setSelectedVerticalId] = useState('');
  const [selectedDateFrom, setSelectedDateFrom] = useState(new Date().toISOString().substr(0, 10));
  const [selectedDateTo, setSelectedDateTo] = useState(new Date().toISOString().substr(0, 10));

  const handleVerticalSelect = (event) => {
    const verticalId = event.target.value;
    setSelectedVerticalId(verticalId);
    onVerticalSelect(verticalId);
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
      onVerticalSelect(selectedVerticalId);
      onDateFromSelect(selectedDateFrom);
      onDateToSelect(selectedDateTo);
      if (onRecalculateClick) {
        onRecalculateClick();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Typography variant="h6" sx={{ fontWeight: '400' }} mb={1}>
            Verticales
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="verticales-label">Verticales</InputLabel>
            <Select
              labelId="verticales-label"
              id="verticales-select"
              label="Verticale"
              value={selectedVerticalId}
              onChange={handleVerticalSelect}
              MenuProps={MenuProps}
              required
            >
              {verticals.map((vertical, index) => (
                <MenuItem key={index} value={vertical.vertical_id}>
                  {vertical.vertical_code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
