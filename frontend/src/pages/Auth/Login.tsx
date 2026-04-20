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
} from "@mui/material";
import { Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import loginImage from "../../assets/img/loginImg.jpg";
import { useLogin } from "../../api/authApi/useAuth";
import { useNavigate } from "react-router-dom";

interface LoginValues {
  email: string;
  password: string;
}

const Login = () => {
  const { t } = useTranslation();
  const { isPending, mutate } = useLogin();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = Yup.object({
    email: Yup.string().required(t("auth.emailRequired")),
    password: Yup.string()
      .min(6, t("auth.passwordMin"))
      .required(t("auth.passwordRequired")),
  });

  const formik = useFormik<LoginValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate({
        email: values.email,
        password: values.password,
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
              alt="login"
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Grid>

          {/* FORM */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ p: 5, display: "flex", flexDirection: "column" }}>
              <Box sx={{ mb: 4, textAlign: "center" }}>
                <Typography variant="h4" fontWeight={600}>
                  {t("auth.welcomeBack")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t("auth.signInContinue")}
                </Typography>
              </Box>

              <form onSubmit={formik.handleSubmit}>
                {/* USERNAME */}
                <TextField
                  fullWidth
                  name="email"
                  label={t("auth.email")}
                  placeholder={t("auth.emailPlaceholder")}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.email && Boolean(formik.errors.email)
                  }
                  helperText={formik.touched.email && formik.errors.email}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
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
                  placeholder={t("auth.passwordPlaceholder")}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  sx={{ mb: 2 }}
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

                {/* REMEMBER */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox />}
                    label={t("auth.rememberMe")}
                  />
                  <Link href="#">{t("auth.forgotPassword")}</Link>
                </Box>

                {/* LOGIN BUTTON */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={isPending ? true : false}
                  sx={{ mb: 3, py: 1.5, fontWeight: 600 }}
                >
                  {isPending ? t("auth.loggingIn") : t("auth.login")}
                </Button>

                {/* REGISTER */}
                <Typography variant="body2" sx={{ textAlign: "center" }}>
                  {t("auth.noAccount")}{" "}
                  <Link
                  sx={{
                    cursor:"pointer"
                  }}
                    onClick={() => {
                      navigate("/auth/register");
                    }}
                  >
                    {t("auth.registerNow")}
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

export default Login;
