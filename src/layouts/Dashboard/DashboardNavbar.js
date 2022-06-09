// material
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar } from '@mui/material';
//
import AccountPopover from './AccountPopover';

const DashboardNavbar = () => {
  const DRAWER_WIDTH = 280;
  const APPBAR_DESKTOP = 92;

  const RootStyle = styled(AppBar)(({ theme }) => ({
      boxShadow: 'none',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
      backgroundColor: '#fff',
      borderBottom:"1px solid rgba(0, 0, 0, 0.12)",
      [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
      }
    }));

  const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
      [theme.breakpoints.up('lg')]: {
        minHeight: APPBAR_DESKTOP,
        padding: theme.spacing(0, 5)
      }
    }));
    

   return (
     <RootStyle>
        <ToolbarStyle>
        <Box sx={{ flexGrow: 1}} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
            <AccountPopover/>
       </Stack>
        </ToolbarStyle>
     </RootStyle>
   );
}

export default DashboardNavbar
