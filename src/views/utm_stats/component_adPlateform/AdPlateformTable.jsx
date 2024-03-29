import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DashboardCard from 'src/components/shared/DashboardCard';
import TextField from '@mui/material/TextField';
import Select from 'react-select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

// Importez vos logos
import facebook from '../../../assets/images/logos/facebook.png';
import google from '../../../assets/images/logos/google.png';
import snapchat from '../../../assets/images/logos/snapchat.png';
import tiktok from '../../../assets/images/logos/tiktok.jpg';
import bing from '../../../assets/images/logos/bing.png';
import taboola from '../../../assets/images/logos/taboola.png';
import outbrain from '../../../assets/images/logos/outbrain.png';
import reglages from '../../../assets/images/logos/Réglages.png';
import Table from './Tables/Table';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
function AdPlateform_table() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const platforms = [
    { icon: facebook, label: 'Facebook', value: '1' },
    { icon: google, label: 'Google', value: '2' },
    { icon: snapchat, label: 'Snapchat', value: '3' },
    { icon: tiktok, label: 'Tiktok', value: '4' },
    { icon: bing, label: 'Bing', value: '5' },
    { icon: taboola, label: 'Taboola', value: '6' },
    { icon: outbrain, label: 'Outbrain', value: '7' },
  ];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedOptions, setSelectedOptions] = React.useState(null);
   // Options pour le Select avec des cases à cocher
   const selectOptions = platforms.map((platform) => ({
    label: platform.label,
    value: platform.value,
  }));
  return (
    
    <DashboardCard sx={{ padding: '0px' }} title={`AD Platform`}>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ marginBottom: '20px' }}>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
              <Box gridColumn="span 9">
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  {platforms.map((platform) => (
                    <Tab
                      key={platform.value}
                      icon={
                        <img
                          src={platform.icon}
                          alt={platform.label}
                          style={{ width: '24px', height: '24px' }}
                        />
                      }
                      sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: '4px',
                        padding: '8px',
                        marginRight: '14px',
                      }}
                      label={platform.label}
                      value={platform.value}
                    />
                  ))}
                </TabList>
              </Box>
              <Box gridColumn="span 1">
                <Button
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: '4px',
                    padding: '8px',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                  onClick={handleOpen}
                >
                  <img
                    src={reglages}
                    alt="Réglages"
                    style={{ width: '24px', height: '24px', marginBottom: '6px' }}
                  />
                  <Typography color="secondary">Réglages</Typography>
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                      <Box display="grid" alignItems="center" gridColumn="span 4">
                        <Typography id="modal-modal-description" variant="h6" component="h2">
                          Ad plateform :{' '}
                        </Typography>
                      </Box>
                      <Box gridColumn="span 8">
                      <Select
                          className="basic-single"
                          classNamePrefix="select"
                          name="color"
                          options={selectOptions}
                          onChange={setSelectedOptions}
                          isMulti
                        />
                      </Box>
                    </Box>
                    <Box
                      display="grid"
                      paddingTop="10px"
                      gridTemplateColumns="repeat(12, 1fr)"
                      gap={2}
                    >
                      <Box display="grid" alignItems="center" gridColumn="span 4">
                        <Typography id="modal-modal-description" variant="h6" component="h2">
                          Diffusion :{' '}
                        </Typography>
                      </Box>
                      <Box gridColumn="span 8">
                        <FormControlLabel control={<Checkbox />} label="Tous" />
                        <FormControlLabel control={<Checkbox />} label="Actif" />
                        <FormControlLabel control={<Checkbox />} label="Inactif" />
                      </Box>
                    </Box>{' '}
                    <Box display="flex" justifyContent="flex-end" marginTop={5}>
                      <Button variant="contained" color="success" onClick={handleClose}>
                        Sauvegarder
                      </Button>
                    </Box>
                  </Box>
                </Modal>
              </Box>
              <Box gridColumn="span 2">
                <TextField label="Rechercher" variant="outlined" />
              </Box>
            </Box>
          </Box>
          {platforms.map((platform) => (
            <TabPanel value={platform.value}>
              <Table />
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </DashboardCard>
  );
}

export default AdPlateform_table;
