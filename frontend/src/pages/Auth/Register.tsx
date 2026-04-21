import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  Grid,
  Link,
  FormHelperText,
  FormControl,
  FormGroup,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  Email,
} from "@mui/icons-material";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import loginImage from "../../assets/img/loginImg.jpg";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../api/authApi/useAuth";

interface RegisterValues {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isSuccess, isPending, mutate } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  if (isSuccess) {
    navigate("/auth/login");
  }
  const validationSchema = Yup.object({
    userName: Yup.string().required(t("auth.usernameRequired")),

    email: Yup.string()
      .email(t("auth.emailInvalid"))
      .required(t("auth.emailRequired")),

    password: Yup.string()
      .min(6, t("auth.passwordMin"))
      .required(t("auth.passwordRequired")),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("auth.passwordMatch"))
      .required(t("auth.confirmPasswordRequired")),

    acceptTerms: Yup.boolean().oneOf([true], t("auth.acceptTermsRequired")),
  });

  const formik = useFormik<RegisterValues>({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    validationSchema,
    onSubmit: (values) => {
      mutate({
        username: values.userName,
        password: values.password,
        email: values.email,
      });
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 900,
          width: "100%",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Grid container>
          {/* LEFT IMAGE */}
          <Grid
            size={{ xs: 0, md: 6 }}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Box
              component="img"
              src={loginImage}
              alt="register"
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Grid>

          {/* FORM */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ p: 5, display: "flex", flexDirection: "column" }}>
              <Box sx={{ mb: 4, textAlign: "center" }}>
                <Typography variant="h4" fontWeight={600}>
                  {t("auth.createAccount")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t("auth.registerDescription")}
                </Typography>
              </Box>

              <form onSubmit={formik.handleSubmit}>
                {/* USERNAME */}
                <TextField
                  fullWidth
                  name="userName"
                  label={t("auth.username")}
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.userName && Boolean(formik.errors.userName)
                  }
                  helperText={formik.touched.userName && formik.errors.userName}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />

                {/* EMAIL */}
                <TextField
                  fullWidth
                  name="email"
                  label={t("auth.email")}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />

                {/* PASSWORD */}
                <TextField
                  fullWidth
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label={t("auth.password")}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* CONFIRM PASSWORD */}
                <TextField
                  fullWidth
                  name="confirmPassword"
                  type="password"
                  label={t("auth.confirmPassword")}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  sx={{ mb: 2 }}
                />

                {/* TERMS */}
                <FormControl required component="fieldset" variant="standard">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="acceptTerms"
                          checked={formik.values.acceptTerms}
                          onChange={formik.handleChange}
                        />
                      }
                      label={t("auth.acceptTerms")}
                    />
                  </FormGroup>
                  {formik.touched.acceptTerms &&
                    Boolean(formik.errors.acceptTerms) && (
                      <FormHelperText>
                        {formik.errors.acceptTerms}{" "}
                      </FormHelperText>
                    )}
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ mb: 3, py: 1.5, fontWeight: 600 }}
                >
                  {t("auth.register")}
                </Button>

                {/* LOGIN */}
                <Typography variant="body2" sx={{ textAlign: "center" }}>
                  {t("auth.haveAccount")}{" "}
                  <Link
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate("/auth/login")}
                  >
                    {t("auth.login")}
                  </Link>
                </Typography>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Register;
