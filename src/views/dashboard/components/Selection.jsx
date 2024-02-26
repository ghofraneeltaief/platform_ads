import React, { useState, useEffect } from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { BASE_URL, api_version } from '../../authentication/config';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import './selection.css';

function Selection() {
  const [verticales, setVerticales] = useState([]);
  const [selectedVerticale, setSelectedVerticale] = useState('');
  const [sources, setSources] = useState([]);
  const [selectedSource, setSelectedSource] = useState(''); // Add this line
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/${api_version}/verticals`);
      if (!response.ok) {
        throw new Error('Failed to fetch verticals');
      }
      const data = await response.json();
      setVerticales(data);
    } catch (error) {
      console.error('Error fetching verticals:', error);
    }
  };
  useEffect(() => {
    // Fetch sources when selectedVerticale changes
    if (selectedVerticale) {
      fetchSources(selectedVerticale);
    }
  }, [selectedVerticale]);
  const fetchSources = async (selectedVerticale) => {
    try {
      const response = await fetch(
        `${BASE_URL}/${api_version}/sources?vertical=${selectedVerticale}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch sources');
      }
      const data = await response.json();
      setSources(data);
    } catch (error) {
      console.error('Error fetching sources:', error);
    }
  };
  const handleVerticaleChange = (event) => {
    setSelectedVerticale(event.target.value);
    setSelectedSource(''); // Reset selectedSource when verticale changes
  };
  const handleSourceChange = (event) => {
    // Add this function
    setSelectedSource(event.target.value);
  };

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
          <input type="date" className="form-control" style={{ width: '145px' }} />
        </Grid>
        <Grid item xs={12} lg={5}>
          <input type="date" className="form-control" style={{ width: '145px' }} />
        </Grid>
      </Grid>
      {/* End:: Période */}
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
            value={selectedSource}
            onChange={handleSourceChange}
          >
            {sources.map((source) => (
              <MenuItem key={source.id} value={source.id}>
                {source.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/* End:: select Sources */}
    </DashboardCard>
  );
}

export default Selection;
