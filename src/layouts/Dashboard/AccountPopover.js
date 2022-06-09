import { useRef, useState } from 'react';
import { useDispatch } from "react-redux";
// material
import { styled } from '@mui/material/styles';
import { Button, Box, Divider, Typography, Avatar, IconButton, Popover } from '@mui/material';
// ----------------------------------------------------------------------
import { getUser } from "../../store/services";
import { logout } from "../../store/actions/auth"

// const MENU_OPTIONS = [
//     {
//         label: 'Home',
//         icon: 'eva:home-fill',
//         linkTo: '/dashboard'
//     },
//     {
//         label: 'Profile',
//         icon: 'eva:person-fill',
//         linkTo: '#'
//     }
// ];

const account = {
    displayName: 'Sam balu',
    email: 'sam@minimals.cc',
    photoURL: '/static/mock-images/avatars/avatar_default.jpg'
};

const ArrowStyle = styled('span')(() => ({
    top: -7,
    zIndex: 1,
    width: 12,
    right: 20,
    height: 12,
    content: "''",
    position: 'absolute',
    borderRadius: '0 0 4px 0',
    transform: 'rotate(-135deg)',
    background: '#fff',
    borderRight: 'solid 1px rgba(145, 158, 171, 0.12)',
    borderBottom: 'solid 1px rgba(145, 158, 171, 0.12)',
}));

// ----------------------------------------------------------------------

export default function AccountPopover() {
    const dispatch = useDispatch();
    const anchorRef = useRef(null);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const logoutUser = () => {
        dispatch(logout());
    }

    const userData = getUser();

    return (
        <>
            <IconButton
                ref={anchorRef}
                onClick={handleOpen}
                sx={{
                    padding: 0,
                    width: 44,
                    height: 44,
                }}
            >
                <Avatar src={account.photoURL} alt="photoURL" />
            </IconButton>
            <Popover
                open={open}
                onClose={handleClose}
                anchorEl={anchorRef.current}
                sx={{ width: 220 }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        mt: 1.5,
                        ml: 0.5,
                        overflow: 'inherit',
                        width: 200,
                    }
                }}
            >
                <ArrowStyle />
                <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Typography variant="subtitle1" noWrap>
                        {userData.username}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        {userData.email}
                    </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />

                {/* {MENU_OPTIONS.map((option) => (
                <MenuItem
                    key={option.label}
                    to={option.linkTo}
                    component={RouterLink}
                    onClick={handleClose}
                    sx={{ typography: 'body2', py: 1, px: 2.5 }}
                >
                    
                    <Box component={Icon} icon={option.icon} sx={{ mr: 2,width: 24, height: 24}}  />

                    {option.label}
                </MenuItem>
                ))} */}

                <Box sx={{ p: 2, pt: 1.5 }}>
                    <Button fullWidth color="inherit" variant="outlined" onClick={logoutUser}>
                        Logout
                    </Button>
                </Box>
            </Popover>
        </>
    );
}