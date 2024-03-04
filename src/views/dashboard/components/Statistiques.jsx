import React from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import { Typography, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

function Statistiques({ CanalCount, SourceCount }) {
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
                    </Grid>
                    <Grid item xs={12} lg={6} sx={{ textAlign: 'end' }}>
                      <Typography variant="h9">{CanalCount[canal]}</Typography>
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
                    <Grid item xs={12} lg={6}>
                      <Typography variant="h9">{Source}</Typography>
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
