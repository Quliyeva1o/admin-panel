import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const ClientHeader = () => {
  return (
    <>
      <AppBar
        sx={{
          backgroundImage:
            "linear-gradient(43deg, rgba(57,108,29,1) 0%, rgba(96,198,61,1) 48%, rgba(203,243,145,1) 100%)",
        }}
        position="static"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Client Side
          </Typography>
          <Button color="inherit">
            <Link to={"/"}>Home</Link>
          </Button>
          <Button color="inherit">
            <Link to={"/countries"}>Countries</Link>
          </Button>
          <Button color="inherit">
            <Link to={"/about"}>About</Link>
          </Button>
          <Button color="inherit">
            <Link to={"/contact-us"}>Contact</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default ClientHeader;
