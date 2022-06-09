import { Link as RouterLink } from 'react-router-dom';

// material
import { styled } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar } from '@mui/material';

// components
import NavSection from '../../Component/Dashboard/NavSection';
import SidebarConfig from './SidebarConfig';
import { getUser } from "../../store/services";
//Styles
import classes from "./DashboardSidebar.module.css";

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(() => ({
  flexShrink: 0,
  width: DRAWER_WIDTH,
}));

const ScrollbarStyle = styled('div')({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
  backgroundColor: '#fff',
});

const AccountStyle = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '16px 20px',
  borderRadius: '12px',
  backgroundColor: 'rgba(145, 158, 171, 0.12)'
}));

const DashboardSidebar = () => {
  const userData = getUser();
  const renderContent = (
      <ScrollbarStyle >
        <Box sx={{ px: 2.5, py: 3 }} className={classes.mainlogo} >
          {/* <Box component="img" src="static/logo.svg" sx={{ width: 40, height: 40}} /> */}
          <img src='/assets/mainlogo.png' alt="Real Estate" /> 
        </Box>
        <Box sx={{ mb: 5, mx: 2.5 }}>
          <Link underline="none" component={RouterLink} to="#">
            <AccountStyle>
              <Avatar src='/static/mock-images/avatars/avatar_default.jpg' alt="photoURL" />
              <Box sx={{ ml: 2 }}>
                <Typography  variant="subtitle2" sx={{ color: 'text.primary', fontSize: '0.875rem', fontWeight: '600'}}>
                  {userData.username}
                </Typography>
              </Box>
            </AccountStyle>
          </Link>
        </Box>
        <NavSection navConfig={SidebarConfig}/>
      </ScrollbarStyle>
  );

  return (
      <RootStyle>
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'solid'
            }
          }}
        >
        {renderContent}
        </Drawer>
      </RootStyle>
  );
}

export default DashboardSidebar
