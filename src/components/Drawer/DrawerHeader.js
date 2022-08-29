import { styled } from "@mui/material/styles";

const DrawerHead = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
  //   position: "fixed"
}));

const DrawerHeader = ({ children }) => {
  return <DrawerHead>{children}</DrawerHead>;
};

export default DrawerHeader;
