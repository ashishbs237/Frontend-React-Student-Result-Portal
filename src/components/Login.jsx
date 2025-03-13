// src/pages/Login.jsx
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useLoginUserMutation } from "../api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { setUser } from "../features/authSlice";
import useApiErrorHandler from "../hooks/useErrorHandler";

const Login = () => {
  const [number, setNumber] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { isLoading, error, isSuccess, data }] =
    useLoginUserMutation();

  if (error) useApiErrorHandler(error);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data.user));
      console.log(data)
      navigate(data.user.role === "admin" ? "/admin" : "/student");
    }
  }, [data, isSuccess]);

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const { values, handleChange, errors, handleSubmit, touched } = useFormik({
    initialValues: {
      email: "ashish.ansuya@gmail.com",
      password: "123456",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login to Your Account
        </Typography>
        {/* <Form onSubmit={handleSubmit}> */}
        <TextField
          label="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />
        <Button
          onClick={() => handleSubmit()}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: 20 }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="primary" /> : "Login"}
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
