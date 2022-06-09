import React from "react";
import Grid from '@mui/material/Grid';
import RegisterForm from "../Component/Registerform";
import classes from "./Register.module.css";


const Register = () => {
  return (
    <Grid container className={classes.loginContainer}>
      <Grid item xs={6}>
        <Grid item xs={6}>
          <div className={classes.leftside}>
            <h3>Manage the job more effectively with Minimal</h3>
            <div>
              <img src='/assets/illustration_register.png' alt="Register" />  
            </div>
          </div>    
        </Grid>
        <Grid item xs={6}>
           
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <div className={classes.rightside}>
          <h4 className={classes.signHeading}>Sign in to Minimal</h4>
          <p className={classes.subheading}>Enter your details below.</p>
          <RegisterForm  />
        </div>
      </Grid>
    </Grid>
  );
};

export default Register;
