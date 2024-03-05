import React, { useState, useEffect } from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import { Typography, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { BASE_URL, api_version } from '../../authentication/config';

function Statistiques({ CanalCount, SourceCount }) {
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
  const [SocialNetworks, setSocialNetworks] = useState([]);
  const formdata = new FormData();
  const fetchSocialNetworks = async () => {
    try {
      const token = await getToken();
      const responseObject = JSON.parse(token);
      const accessToken = responseObject.access_token;
      formdata.append('Hipto-Authorization', accessToken);
      const requestOptions = {
        method: 'POST',
        body: formdata,
      };
      const response = await fetch(`${BASE_URL}/${api_version}/social_networks`, requestOptions);
      const data = await response.json();
      setSocialNetworks(await data);
      console.log('data', data);
      // Define your mapping logic here
      data.forEach((item1) => {
        filteredSources.forEach((item2) => {
          const filtered = item2.Source; 
        if (item1.sn_name == filtered) {
          console.log(filtered)
          setLogoSocialNetworks(item1.sn_logo);
        }
      });
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchSocialNetworks();
  }, []);
  const [LogoSocialNetworks, setLogoSocialNetworks] = useState('');
  console.log(LogoSocialNetworks);
  const filteredSources = Object.keys(SourceCount).map((Source) => ({ Source }));
  return (
    <DashboardCard title="Statistiques">
      {/* Begin:: séparateur */}
      <Box pb={4}>
        <Divider sx={{ width: '100%' }} />
      </Box>
      {/* End:: séparateur */}
      <Grid container spacing={3}>
        {/* Begin:: card canal */}
        <Grid item xs={12} lg={6}>
          <DashboardCard backgroundColor="#3188DC" color="white" title="Canal">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Grid container>
                {Object.keys(CanalCount).map((canal, index) => (
                  <>
                    <Grid item xs={12} lg={6}>
                      <Typography variant="h9" key={index}>
                        {canal}
                      </Typography>
                      <hr />
                    </Grid>
                    <Grid item xs={12} lg={6} sx={{ textAlign: 'end' }}>
                      <Typography variant="h9">{CanalCount[canal]}</Typography>
                      <hr />
                    </Grid>
                  </>
                ))}
              </Grid>
            </Box>
          </DashboardCard>
        </Grid>
        {/* End:: card canal */}
        {/* Begin:: card source */}
        <Grid item xs={12} lg={6}>
          <DashboardCard backgroundColor="#080655" color="white" title="Source d’acquition">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Grid container>
                {Object.keys(SourceCount).map((Source) => (
                  <>
                    <Grid item xs={12} lg={6} pb={2}>
                      <img src={LogoSocialNetworks} width={25} />
                      <Typography pl={1} variant="h9">{Source}</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6} sx={{ textAlign: 'end' }}>
                      <Typography variant="h9">{SourceCount[Source]}</Typography>
                      
                    </Grid>
                  </>
                ))}
              </Grid>
            </Box>
          </DashboardCard>
        </Grid>
        {/* End:: card source */}
      </Grid>
    </DashboardCard>
  );
}

export default Statistiques;
