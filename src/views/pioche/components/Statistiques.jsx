import React, { useState, useEffect } from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import { Typography, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { BASE_URL, api_version } from '../../authentication/config';

function Statistiques({ CanalCount, SourceCount }) {
  async function getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      throw new Error('No token available');
    }
  }

  const [LogoSocialNetworks, setLogoSocialNetworks] = useState({});

  useEffect(() => {
    const fetchSocialNetworks = async () => {
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
        const response = await fetch(`${BASE_URL}/${api_version}/social_networks`, requestOptions);
        const data = await response.json();

        const logos = {};
        data.forEach(item => {
          const sourceName = item.sn_name.toLowerCase();
          logos[sourceName] = item.sn_logo;
        });
        
        setLogoSocialNetworks(logos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSocialNetworks();
  }, []);

  return (
    <DashboardCard title="Statistiques">
      <Box pb={4}>
        <Divider sx={{ width: '100%' }} />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <DashboardCard backgroundColor="#3188DC" color="white" title="Canal">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Grid container>
                {Object.keys(CanalCount).map((canal, index) => (
                  <React.Fragment key={index}>
                    <Grid item xs={12} lg={6}>
                      <Typography variant="h9">{canal}</Typography>
                      <hr />
                    </Grid>
                    <Grid item xs={12} lg={6} sx={{ textAlign: 'end' }}>
                      <Typography variant="h9">{CanalCount[canal]}</Typography>
                      <hr />
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Box>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} lg={6}>
          <DashboardCard backgroundColor="#080655" color="white" title="Source d’acquisition">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Grid container>
                {Object.keys(SourceCount).map((source, index) => (
                  <React.Fragment key={index}>
                    <Grid item xs={12} lg={6} pb={2}>
                      <img src={LogoSocialNetworks[source.toLowerCase()]} width={25} />
                      <Typography pl={1} variant="h9">{source}</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6} sx={{ textAlign: 'end' }}>
                      <Typography variant="h9">{SourceCount[source]}</Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Box>
          </DashboardCard>
        </Grid>
      </Grid>
    </DashboardCard>
  );
}

export default Statistiques;
