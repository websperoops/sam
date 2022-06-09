import { NavLink as RouterLink } from 'react-router-dom';
// material
import { Box, List, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styles
import classes from './NavSection.module.css';

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} 
sx={{
  justifyContent: props.open ? 'initial' : 'center',
}}/>)(
  () => ({
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: '40px',
    paddingRight: '20px',
    '&:before': {
      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: "''",
      display: 'none',
      position: 'absolute',
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
    }
  })
);

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '16px',
  minWidth: 'auto'
});


const NavItem = ({item, ...props}) => {
  const { title, path, icon } = item;
  const pathName = window.location.pathname;

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      className={`${classes.dashboarditems} ${(path === pathName) ? classes.active : ""}`}
      { ...props}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
    </ListItemStyle>
  );
}

const NavSection = ({navConfig, ...props}) => {
  // navConfig.forEach(item => console.log(item.title));
  return (
    <>
    <Box>
      <List disablePadding>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} { ...props}  />
      ))}
      </List>
    </Box>
    </>
  );
}

export default NavSection
