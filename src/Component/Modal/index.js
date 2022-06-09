import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import classes from "./Modal.module.css";

const MyModal = ({ handleCancel, ...props }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md')) && (props && props.title === "Check In");
  return (
    <Dialog open={props.open} onClose={handleCancel} {...props} fullScreen={fullScreen} fullWidth maxWidth={props.popupWidth ? props.popupWidth : "lg" } >
      <Stack spacing={3} className={(props && props.title === "Check In") ? classes.topheader : ''}>
        <Stack
          direction={{ xs: "row", sm: "row" }}
          justifyContent="space-between"
          spacing={1}
        >
          <DialogTitle className={classes.dialogtitle}> 
            {props.title}
          </DialogTitle>
          {!props.actions && (
            <DialogActions>
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogActions>
          )}
        </Stack>
      </Stack>
      <DialogContent>{props.content}</DialogContent>
      {props.actions && (
        <DialogActions>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={props.handleOk} autoFocus>
            Ok
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default MyModal;
