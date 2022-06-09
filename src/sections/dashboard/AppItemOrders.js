// material
import { styled } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';
// icons
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(() => ({
  textAlign: 'center',
  padding: '40px 0px',
  color: 'rgba(0, 0, 0, 0.87)',
  backgroundColor: '#fff',
  boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 1px 1px',
  borderRadius: '16px'
}));

const IconWrapperStyle = styled('div')(() => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: '64px',
  height: '64px',
  justifyContent: 'center',
  marginBottom: '24px',
  color: '#fff',
  backgroundImage: 'linear-gradient(185deg, rgba(0, 200, 115, 0) 0%, rgb(55 114 255) 60%)'
}));

// ----------------------------------------------------------------------


export default function AppItemOrders({ data }) {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Box component={Icon} icon={'ant-design:profile-filled'} width={24} height={24} />
      </IconWrapperStyle>
      <Typography sx={{ fontWeight: '700', fontSize: '2rem' }} variant="h3">{data}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Visited User
      </Typography>
    </RootStyle>
  );
}
