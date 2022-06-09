// material
import { styled } from "@mui/material/styles";
import MiniDrawer from "./DashboardSidebar1";
import React from "react";

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const DashboardLayout = ({ children }) => {
  return (
    <RootStyle>
      <MiniDrawer children={children} />
      {/* <ResponsiveDrawer children={children} /> */}
      {/* <DashboardNavbar />
      <DashboardSidebar />
      <Suspense fallback={<Box sx={{ display: "flex", justifyContent: 'center',height:"100vh" }}>
                      <CircularProgress />
                    </Box>}>
        <MainStyle>{children}</MainStyle>
      </Suspense> */}
    </RootStyle>
  );
};

export default DashboardLayout;
