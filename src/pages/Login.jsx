// src/pages/Home.jsx
import React from "react";
import { Container, Typography, Button, Box, Grid, Paper } from "@mui/material";
import sideImage1 from "../assets/images/side-image1.svg";
import Login from "../components/Login";

const Home = () => {
  return (
    <Box
      sx={{
        // backgroundImage: "url('/assets/images/side-image1.jpg')", // Set your background image
        backgroundColor: "rebeccapurple",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 3, backdropFilter: "blur(5px)" }}>
          <Typography variant="h4" sx={{textAlign: 'center'}}>
            Welcome to Result Portal
          </Typography>
          <Grid container spacing={1} alignItems="center">
            {/* Left Section - Image */}
            <Grid item xs={12} md={6}>
              <img
                src={sideImage1}
                alt="Education"
                style={{ width: "100%", height:'450px', borderRadius: "10px" }}
              />
            </Grid>

            {/* Right Section - Login Options */}
            <Grid item xs={12} md={6} textAlign="center">
              <Box display="flex" flexDirection="column" gap={2}>
                <Login />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
