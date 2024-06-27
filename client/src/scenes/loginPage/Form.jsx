import React, { useState } from "react";
import {
  Box,
  useMediaQuery,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import { Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "state/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import baseUrl from "config";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("Name is required"),
  lastName: yup.string(),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  department: yup.string().required("Department is required"),
  picture: yup.string().required("Picture is required"),
});
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Required"),
});
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  department: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};
const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const [spinner, setSpinner] = useState(false);
  console.log(open)

  const isNonMobile = useMediaQuery("(min-width:900px)");
  const register = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append("picturePath", values.picture.name);

      const savedUserResponse = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        body: formData,
      });
      const savedUser = await savedUserResponse.json();
      if (savedUser) {
        setPageType("login");
      }
    } catch (error) {
      console.error("Register error:", error);
      setOpen(true)
    } finally {
      // Set spinner to false here
      setSpinner(false);
      // Reset form
      onSubmitProps.resetForm();
    }
  };

  const login = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const loggedIn = await loggedInResponse.json();
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error:", error);
      setOpen(true)

    } finally {
      setSpinner(false);
      onSubmitProps.resetForm();
    }
  };
  const handleFormSubmit = async (values, onSubmitProps) => {
    setSpinner(true);
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };
  return (
    <Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity="error">Login error.</Alert>
      </Snackbar>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleReset,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box m={isNonMobile ? "0" : "2rem"}>
              {
                <Box my="2rem">
                  <Typography fontWeight={"500"} fontSize="2rem">
                    {isRegister
                      ? "Create new account. "
                      : "Sign into your account."}
                  </Typography>
                  <Typography
                    onClick={() => {
                      setPageType(isLogin ? "register" : "login");
                      resetForm();
                    }}
                    sx={{
                      textDecoration: "underline",
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                    color="primary.dark"
                  >
                    {isLogin
                      ? "Don't have an account? Sign Up"
                      : "Already have an account? Login"}
                  </Typography>
                </Box>
              }
              <Box
                display="grid"
                gap="20px"
                gridTemplateColumns="repeat(4, minmax(0,1fr))"
                mt="1rem"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                {isRegister && (
                  <>
                    <TextField
                      variant="outlined"
                      label="First Name"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="firstName"
                      sx={{ gridColumn: "span 2" }}
                      error={
                        Boolean(touched.firstName) && Boolean(errors.firstName)
                      }
                      helperText={touched.firstName && errors.firstName}
                    />
                    <TextField
                      variant="outlined"
                      label="Last Name"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="lastName"
                      sx={{ gridColumn: "span 2" }}
                      error={
                        Boolean(touched.lastName) && Boolean(errors.lastName)
                      }
                      helperText={touched.lastName && errors.lastName}
                    />
                    <TextField
                      variant="outlined"
                      label="Department"
                      value={values.department}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="department"
                      sx={{ gridColumn: "span 4" }}
                      error={
                        Boolean(touched.location) && Boolean(errors.location)
                      }
                      helperText={touched.location && errors.location}
                    />
                    {/* picture drop box*/}
                    <Box
                      gridColumn="span 4"
                      border={`1px solid `}
                      borderRadius="5px"
                      p="1rem"
                    >
                      <Dropzone
                        onDrop={(acceptedFiles) => {
                          setFieldValue("picture", acceptedFiles[0]);
                        }}
                        multiple={false}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <Box>
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              {!values.picture ? (
                                <>
                                  <Typography>Add picture here!</Typography>
                                </>
                              ) : (
                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                >
                                  <Typography>{values.picture.name}</Typography>
                                  <Typography>
                                    <EditOutlinedIcon />
                                  </Typography>
                                </Box>
                              )}
                            </div>
                          </Box>
                        )}
                      </Dropzone>
                    </Box>
                  </>
                )}
                <TextField
                  variant="outlined"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="email"
                  sx={{ gridColumn: "span 4" }}
                  error={
                    Boolean(touched.email) && Boolean(errors.email)
                  }
                  helperText={touched.email && errors.email}
                />
                <Box sx={{ position: "relative", gridColumn: "span 4" }}>
                  <TextField
                    variant="outlined"
                    label="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    sx={{ width: "100%" }}
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                  />
                  <Button
                    onClick={() => togglePasswordVisibility()}
                    style={{
                      position: "absolute",
                      right: "0",
                      top: "0",
                      bottom: "0",
                    }}
                  >
                    {showPassword ? (
                      <span>
                        {" "}
                        <FaEyeSlash />{" "}
                      </span>
                    ) : (
                      <FaEye />
                    )}
                  </Button>
                </Box>
              </Box>
              <Box>
                <Button
                  type="submit"
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                  }}
                  variant="contained"
                >
                  {spinner ? (
                    <CircularProgress size={20} />
                  ) : isLogin ? (
                    "Login"
                  ) : (
                    "Register"
                  )}
                </Button>
                <Button
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    ml: "1rem",
                  }}
                  variant="contained"
                  onClick={() => {
                    setFieldValue("email", "testuser@gmail.com");
                    setFieldValue("password", "testpw");
                  }}
                >
                  Use Test Credentials
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
