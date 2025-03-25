import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const ActionMenu = ({ menuLabel, menuItems, selectedStudents }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="menu-button"
        aria-controls={open ? "custom-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {menuLabel}
      </Button>
      <Menu
        id="custom-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slot={{ "aria-labelledby": "menu-button" }}
        transformOrigin={{ horizontal: 0, vertical: 0 }}
      >
        {menuItems.map((item, index) => (
          <MenuItem
          disabled = {!selectedStudents || item.disabled}
            key={index}
            onClick={() => {
              handleClose();
              item.onClick();
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ActionMenu;
