import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from "react-router-dom";
import {DialogBox} from './UploadDialog';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import GroupIcon from '@mui/icons-material/Group';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FlightTakeoffTwoToneIcon from '@mui/icons-material/FlightTakeoffTwoTone';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import PaidIcon from '@mui/icons-material/Paid';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavBar({signOut}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [dialogBoxOpen, setDialogBoxOpen] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  function handleAddPost() {
    setDialogBoxOpen(true);
  }
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to= "/profile" style={{ textDecoration: 'none', color : "#000" }} ><MenuItem onClick = {handleMenuClose}>我的主页</MenuItem></Link>
      <MenuItem onClick= {signOut}>退出账号</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          ls = "center"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Link to ="/"><MenuIcon /></Link>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block"} }}
          >
            NYLife360
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <IconButton
              size="large"
              aria-label="add a new post"
              color="inherit"
              onClick={() => {handleAddPost()}}
              >
              <MapsHomeWorkIcon />
              <Typography variant="h6" noWrap>
              &nbsp; 租房
              </Typography>
          </IconButton>
          <IconButton
              size="large"
              aria-label="add a new post"
              color="inherit"
              onClick={() => {handleAddPost()}}
              >
              <GroupIcon />
              <Typography variant="h6" noWrap>
              &nbsp; 交友
              </Typography>
          </IconButton>
          <IconButton
              size="large"
              aria-label="add a new post"
              color="inherit"
              onClick={() => {handleAddPost()}}
              >
              <LocalShippingIcon />
              <Typography variant="h6" noWrap>
              &nbsp; 搬家
              </Typography>
          </IconButton>
          <IconButton
              size="large"
              aria-label="add a new post"
              color="inherit"
              onClick={() => {handleAddPost()}}
              >
              <SchoolTwoToneIcon />
              <Typography variant="h6" noWrap>
              &nbsp; 课程
              </Typography>
          </IconButton>
          <IconButton
              size="large"
              aria-label="add a new post"
              color="inherit"
              onClick={() => {handleAddPost()}}
              >
              <PaidIcon />
              <Typography variant="h6" noWrap>
              &nbsp; 创投
              </Typography>
          </IconButton>
          <IconButton
              size="large"
              aria-label="add a new post"
              color="inherit"
              onClick={() => {handleAddPost()}}
              >
              <FlightTakeoffTwoToneIcon />
              <Typography variant="h6" noWrap>
              &nbsp; 邮寄
              </Typography>
          </IconButton>
          <IconButton
              size="large"
              aria-label="add a new post"
              color="inherit"
              onClick={() => {handleAddPost()}}
              >
              <CleaningServicesIcon />
              <Typography variant="h6" noWrap>
              &nbsp; 清洁
              </Typography>
          </IconButton>
          <IconButton
              size="large"
              aria-label="add a new post"
              color="inherit"
              onClick={() => {handleAddPost()}}
              >
              <LocalOfferIcon />
              <Typography variant="h6" noWrap>
              &nbsp; 二手
              </Typography>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="add a new post"
              color="inherit"
              onClick={() => {handleAddPost()}}
              >
              <AddCircleIcon/>
            </IconButton>
            <DialogBox 
                open = {dialogBoxOpen}
                setOpen = {setDialogBoxOpen}/>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
