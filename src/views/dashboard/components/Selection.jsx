import React from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box'; // Importer Box de Material-UI pour ajouter de l'espace
import Divider from '@mui/material/Divider'; // Importer Divider de Material-UI pour ajouter un séparateur

function Selection() {
  const [Verticale, setVerticale] = React.useState('');

  const handleChange = (event) => {
    setVerticale(event.target.value);
  };

  return (
    <DashboardCard sx={{ padding: '0px' }} title="Sélection">
      {/* Begin:: séparateur */}
      <Box pb={4}>
        <Divider sx={{ width: '100%' }} />
      </Box>
      {/* End:: séparateur */}
      {/* Begin:: select varticales */}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Verticales</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Verticale}
          label="Verticale"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
        </Select>
      </FormControl>
      {/* Begin:: select varticales */}
      {/* Begin:: select client */}
      <Box my={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Client</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Verticale}
            label="Verticale"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* Begin:: select client */}
      {/* Begin:: select canaux */}
      <Box my={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Canaux</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Verticale}
            label="Verticale"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* Begin:: select canaux */}
    </DashboardCard>
  );
}

export default Selection;
