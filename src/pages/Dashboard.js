// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import AppWeeklySales from '../sections/dashboard/AppWeeklySales';
import AppNewUsers from '../sections/dashboard/AppNewUsers';
import AppItemOrders from '../sections/dashboard/AppItemOrders';
// import AppSiteVists from '../sections/dashboard/AppSiteVists';
// import AppWebsiteVisits from '../sections/dashboard/AppWebsiteVisits';
// import AppCurrentVisits from '../sections/dashboard/AppCurrentVisits';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Action
import { dashboardData } from "../store/actions/dashboard";

// ----------------------------------------------------------------------

const DashboardApp = () => {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state.dashboardReducer);

  useEffect(() => {
    dispatch(dashboardData());
  },[dispatch]);

    return (
      <div>
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <Typography style={{fontSize: '1.5rem', fontWeight: '700'}} variant="h4">Hi, Welcome back</Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4} >
              <AppWeeklySales data={dashboard && dashboard.event} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AppNewUsers data={dashboard && dashboard.user} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AppItemOrders data={dashboard && dashboard.eventVisitedUser} />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={12}>
              <MyChart />
            </Grid> */}
            {/* <Grid item xs={12} sm={6} md={3}>
              <AppSiteVists />
            </Grid>
   */}
            {/* <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisits />
            </Grid> */}
  
            {/* <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisits />
            </Grid> */}
  
            {/* <Grid item xs={12} md={6} lg={8}>
              <AppConversionRates />
            </Grid>
  
            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentSubject />
            </Grid>
  
            <Grid item xs={12} md={6} lg={8}>
              <AppNewsUpdate />
            </Grid>
  
            <Grid item xs={12} md={6} lg={4}>
              <AppOrderTimeline />
            </Grid>
  
            <Grid item xs={12} md={6} lg={4}>
              <AppTrafficBySite />
            </Grid>
  
            <Grid item xs={12} md={6} lg={8}>
              <AppTasks />
            </Grid> */}
          </Grid>
        </Container>
      </div>
      );
}

export default DashboardApp
