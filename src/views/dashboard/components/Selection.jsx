import React, { useState, useEffect } from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';
import { Typography, Button } from '@mui/material';
import './selection.css';
import { BASE_URL, api_version } from '../../authentication/config';

function Selection({ onVerticalSelect, onDateFromSelect, onDateToSelect }) {
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
  const [sources, setSources] = useState([]);
  const handleVerticalSelect = (event) => {
    const verticalId = event.target.value;
    setSelectedVerticalId(verticalId);
    onVerticalSelect(verticalId);
  };
  /* Begin: fetchSources */
  const fetchSources = async () => {
    if (selectedVerticalId) {
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
          `${BASE_URL}/${api_version}/sources/?vertical_id=${selectedVerticalId}`,
          requestOptions,
        );
        const data = await response.json();
        setSources(data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    fetchSources();
  }, [selectedVerticalId]);
  /* End: fetchSources */

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

  /* Begin: Style select */
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

  /*const handleRecalculate = () => {
  onDateFromSelect(selectedDateFrom);
  onDateToSelect(selectedDateTo);
  onVerticalSelect({ target: { value: selectedVerticalId } });
  };*/

  return (
    <DashboardCard sx={{ padding: '0px' }} title="Sélection">
      {/* Begin:: separator */}
      <Box pb={4}>
        <Divider sx={{ width: '100%' }} />
      </Box>
      {/* End:: separator */}
      {/* Begin:: Période */}
      <Typography variant="h6" sx={{ fontWeight: '400' }} mb={1}>
        Période
      </Typography>
      <Grid container>
        <Grid item xs={12} sx={{ marginRight: '30px', width: '500px' }} lg={5}>
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
        <Grid item xs={12} lg={5}>
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
      {/* End:: Période */}
      {/* Begin:: select verticales */}
      <FormControl fullWidth>
        <InputLabel id="verticales-label">Verticales</InputLabel>
        <Select
          labelId="verticales-label"
          id="verticales-select"
          label="Verticale"
          value={selectedVerticalId}
          onChange={handleVerticalSelect}
          MenuProps={MenuProps}
        >
          {verticals.map((get_vertical, index) => (
            <MenuItem key={index} value={get_vertical.vertical_id}>
              {get_vertical.vertical_code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* End:: select verticales */}
      {/* Begin:: select Sources */}
      <Box my={2}>
        <FormControl fullWidth>
          <InputLabel id="sources-label">Sources</InputLabel>
          <Select labelId="sources-label" id="sources-select" label="Source" MenuProps={MenuProps}>
            {sources.map((source, index) => (
              <MenuItem key={index} value={source.source_id}>
                {source.source_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/* End:: select Sources */}
      {/* Begin:: Button */}
      <Box my={2}>
        <Button variant="contained">Recalculer</Button>
      </Box>
      {/* End:: Button */}
    </DashboardCard>
  );
}

export default Selection;
