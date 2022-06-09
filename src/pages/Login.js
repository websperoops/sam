import React from "react";
import {Grid, Typography, Link} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; 

// components 
import LoginForm from "../Component/Loginform";
import classes from "./Login.module.css";


const Login = () => {
  return (
    <Grid container className={classes.loginContainer}>
      <Grid className={classes.left_side_col} item xs={6}>
          <div className={classes.leftside}>
            <h3>Hi, Welcome Back</h3>
            <div>
              <img className={classes.login_image} src="/img/login_Image.jpeg" alt="Login Illustration" />  
            </div>
          </div>    
      </Grid>
      <Grid className={classes.right_side_col} item xs={6}>
        <div className={classes.rightside}>
          <h4 className={classes.signHeading}>Sign in to Realstate</h4>
          <p className={classes.subheading}>Enter your details below.</p>
          <LoginForm  />
          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 3,
              display: { sm: 'none' }
            }}
          >
            Don’t have an account?&nbsp;
            <Link variant="subtitle2" component={RouterLink} to="register" underline="hover">
              Get started
            </Link>
          </Typography> 
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
