import React, { useState, useEffect } from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import Select from 'react-select';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ImLoop2 } from 'react-icons/im';
import { Grid, Typography, Button } from '@mui/material';
import './selection.css';
import { BASE_URL, api_version } from '../../authentication/config';

function Selection({ onVerticalSelect, onDateFromSelect, onDateToSelect, onRecalculateClick,onTimeFromSelect,onTimeToSelect }) {
  async function getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      throw new Error('No token available');
    }
  }

  const [verticals, setVerticals] = useState([]);
  const [sources, setSources] = useState([]);
  const [selectedDateFrom, setSelectedDateFrom] = useState(new Date().toISOString().substr(0, 10));
  const [selectedDateTo, setSelectedDateTo] = useState(new Date().toISOString().substr(0, 10));
  const [selectedTimeFrom, setSelectedTimeFrom] = useState('08:00:01');
  const [selectedTimeTo, setSelectedTimeTo] = useState('23:59:59');
  const [selectedVertical, setSelectedVertical] = useState(null); // Nouvelle variable d'état

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
      setVerticals(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVerticals();
  }, []);

  const handleVerticalSelect = (selectedOption) => {
    setSelectedVertical(selectedOption); // Mise à jour de la verticale sélectionnée
    onVerticalSelect(selectedOption.value);
  };

  /* Begin: fetchSources */
  const fetchSources = async () => {
    try {
      const token = await getToken();
      const responseObject = JSON.parse(token);
      const accessToken = responseObject.access_token;
      formdata.append('Hipto-Authorization', accessToken);
      const requestOptions = {
        method: 'POST',
        body: formdata,
      };
      const response = await fetch(
        `${BASE_URL}/${api_version}/sources/?vertical_id=${selectedVertical.value}`, // Utilisation de la verticale sélectionnée
        requestOptions,
      );
      const data = await response.json();
      setSources(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedVertical) {
      fetchSources();
    }
  }, [selectedVertical]);
  /* End: fetchSources */

  const handleDateFromChange = (dateFrom) => {
    setSelectedDateFrom(dateFrom);
    onDateFromSelect(dateFrom);
  };

  const handleDateToChange = (dateTo) => {
    setSelectedDateTo(dateTo);
    onDateToSelect(dateTo);
  };
  const handleTimeFromChange = (timeFrom) => {
    setSelectedTimeFrom(timeFrom);
    onTimeFromSelect(timeFrom);
  };
  const handleTimeToChange = (timeTo) => {
    setSelectedTimeTo(timeTo);
    onTimeToSelect(timeTo);
  };
  const handleRecalculate = async () => {
    try {
      onDateFromSelect(selectedDateFrom);
      onDateToSelect(selectedDateTo);
      onTimeFromSelect(selectedTimeFrom);
      onTimeToSelect(selectedTimeTo);
      if (onRecalculateClick) {
        onRecalculateClick();
      }
    } catch (error) {
      console.error(error);
    }
  };
  /* Begin: Style select */
  const ITEM_HEIGHT = 30;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 270,
      },
    },
  };
  /* End: Style select */
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
      <Typography variant="h6" sx={{ fontWeight: '400' }} mb={1}>
        Heure
      </Typography>
      <Grid container spacing={0.25}>
        <Grid item xs={6}>
          <Typography variant="p" sx={{ fontWeight: '400' }} mb={1}>
            De :
          </Typography>
          <input type="time" className="form-control" value={selectedTimeFrom}
            onChange={(e) => handleTimeFromChange(e.target.value)} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="p" sx={{ fontWeight: '400' }} mb={1}>
            à :
          </Typography>
          <input type="time" className="form-control" value={selectedTimeTo}
            onChange={(e) => handleTimeToChange(e.target.value)} />
        </Grid>
      </Grid>
      <Select
        name="Verticale"
        options={verticals.map((option) => ({
          value: option.vertical_id,
          label: option.vertical_code,
        }))}
        value={selectedVertical} // Utilisation de la variable d'état selectedVertical
        onChange={handleVerticalSelect}
        placeholder="Verticale"
        isSearchable={true}
        MenuProps={MenuProps}
        className="basic-single"
        classNamePrefix="select"
        menuPortalTarget={document.body}
        menuPosition={'fixed'}
      />
      <Box my={2}>
        <Select
          options={sources.map((option) => ({
            value: option.source_id,
            label: option.source_name,
          }))}
          placeholder="Source"
          isSearchable={true}
          MenuProps={MenuProps}
          menuPortalTarget={document.body}
          menuPosition={'fixed'}
        />
      </Box>
      <Box my={2}>
        <Button variant="contained" onClick={handleRecalculate}>
          <ImLoop2 /> <Typography sx={{ paddingLeft: '7px' }}>Recalculer</Typography>
        </Button>
      </Box>
    </DashboardCard>
  );
}

export default Selection;