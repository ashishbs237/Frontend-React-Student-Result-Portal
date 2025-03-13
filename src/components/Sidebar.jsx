// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton, AppBar, Toolbar, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { logout } from "../features/auth/authSlice";
import { Home, Lock, ExitToApp, School, Dashboard, Assessment, Settings, Menu as MenuIcon } from "@mui/icons-material";
import {menuItems} from "../utils/sidebarMenuItems";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = useState(false); // State for mobile sidebar

  const handleLogout = () => {
    // dispatch(logout());
    navigate("/login");
    setMobileOpen(false); // Close drawer on logout
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <List>
      {menuItems
        .filter((item) => item.role === "all" || item.role === user?.role)
        .map((item) => (
          <ListItem button key={item.text} onClick={() => { navigate(item.path); setMobileOpen(false); }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}

      <ListItem button onClick={handleLogout}>
        <ListItemIcon><ExitToApp /></ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );

  return (
    <>
      {/* App Bar with Hamburger Icon for Mobile */}
      <AppBar position="fixed" sx={{ display: { md: "none" } }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Student Result Portal</Typography>
        </Toolbar>
      </AppBar>

      {/* Persistent Sidebar for Desktop */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ display: { xs: "none", md: "block" }, width: 240 }}
      >
        {drawerContent}
      </Drawer>

      {/* Temporary Drawer for Mobile */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer}
        sx={{ display: { md: "none" } }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
