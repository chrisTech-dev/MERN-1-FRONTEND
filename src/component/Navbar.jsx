import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Container } from "@mui/material";
import { IoMoon } from "react-icons/io5";
import { IoHome } from "react-icons/io5";

import { LuSun } from "react-icons/lu";
import { AddBox as PlusSquareIcon } from "@mui/icons-material";

const Navbar = ({ darkMode, setDarkMode }) => {
  const toggleColorMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <AppBar position="fixed" sx={{ width: "100%" }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo / Title */}
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "#FFFFFF", fontWeight: "bold" }} // Bright White Color
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Product Store <span style={{ color: "#FFFFFF" }}>🛒</span> {/* White Shopping Cart */}
            </Link>
          </Typography>

          {/* Buttons */}
          <Box display="flex" alignItems="center" gap={2}>
            {/* Create Button */}
            <Link to="/create" style={{ textDecoration: "none" }}>
              <Button variant="contained">
                <PlusSquareIcon fontSize="small" />
              </Button>
            </Link>

            {/* Dark Mode Toggle Button */}
            <IconButton onClick={toggleColorMode} color="inherit">
              {darkMode ? <IoMoon size={24} /> : <LuSun size={24} />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
