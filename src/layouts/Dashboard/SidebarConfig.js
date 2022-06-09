import { Icon } from "@iconify/react";
// @mui
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

const getIcon = (name) => {
  return <Box component={Icon} icon={name} width={22} height={22} />;
};

const SidebarConfig = [
  {
    title: "dashboard",
    path: "/",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "Users",
    path: "/user",
    icon: getIcon("fe:users"),
  },
  {
    title: "Lists",
    path: "/event",
    icon: getIcon("bi:calendar-event-fill"),
  }
];

export default SidebarConfig;
