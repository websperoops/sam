import React from "react";
import {
  Card,
  Stack,
  Container,
  Typography
} from "@mui/material";

// components
import Createeventform from "../Component/Createeventform";

// Styles
import classes from "./Eventform.module.css";

const Eventform = () => {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontSize: "24px", fontWeight: "700", color: "#212b36" }}
        >
          Create Event
        </Typography>
      </Stack>
      <Card className={classes.eventscontainer}> 
        <Createeventform />
      </Card>
    </Container>
  );
};

export default Eventform;
