import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../pioche/components/selection.css';
import { BASE_URL, api_version } from '../authentication/config';

function Component(onVerticalSelect, onDateFromSelect, onDateToSelect) {
  /* Begin: getToken */
  async function getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      throw new Error('No token available');
    }
  }
  /* End: getToken */
  /* Begin: fetchVerticals */
  const [verticals, setVerticals] = useState([]);
  const formdata = new FormData();
  const fetchVerticals = async () => {
    try {
      const token = await getToken();
      const responseObject = JSON.parse(token);
      const accessToken = responseObject.access_token;
      formdata.append('Hipto-Authorization', accessToken);
      const requestOptions = {
        method: 'POST',
        body: formdata,
      };
      const response = await fetch(`${BASE_URL}/${api_version}/verticals`, requestOptions);
      const data = await response.json();
      setVerticals(await data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchVerticals();
  }, []);
  /* End: fetchVerticals */
  const [selectedVerticalId, setSelectedVerticalId] = useState('');
  const handleVerticalSelect = (event) => {
    const verticalId = event.target.value;
    setSelectedVerticalId(verticalId);
    onVerticalSelect(verticalId);
  };
  /* Begin: Style select */
  /* Begin: selectedDateFrom */
  const [selectedDateFrom, setSelectedDateFrom] = useState(new Date().toISOString().substr(0, 10)); // Format YYYY-MM-DD

  const handleDateFromChange = (dateFrom) => {
    setSelectedDateFrom(dateFrom);
    onDateFromSelect(dateFrom); // Appel de la fonction pour envoyer la dateFrom sélectionnée
  };
  /* End: selectedDateFrom */

  /* Begin: selectedDateTo */
  const [selectedDateTo, setSelectedDateTo] = useState(new Date().toISOString().substr(0, 10)); // Format YYYY-MM-DD
  const handleDateToChange = (dateTo) => {
    setSelectedDateTo(dateTo);
    onDateToSelect(dateTo); // Appel de la fonction pour envoyer la dateFrom sélectionnée
  };
  /* End: selectedDateTo */
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
  /* End: Style select */
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          {/* Begin:: select verticales */}
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
              {verticals.map((get_vertical, index) => (
                <MenuItem key={index} value={get_vertical.vertical_id}>
                  {get_vertical.vertical_code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* End:: select verticales */}
        </Grid>
        <Grid item xs={3.6}>
          {/* Begin:: Période */}
          <Typography variant="h6" sx={{ fontWeight: '400' }} >
            Période
          </Typography>
          <Grid container >
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
          {/* End:: Période */}
        </Grid>
        <Grid item xs={4} display={'flex'} alignItems={'center'}>
          <Button variant="contained" sx={{ marginRight: '10px' }}>
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
