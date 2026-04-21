import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useLoadUser } from "./api/authApi/useAuth";
import { renderRoutes } from "./routes/renderRoutes";
import { userRoutes } from "./routes/UserRoutes";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import CustomLoading from "./components/custom/CustomLoading";
import "dayjs/locale/tr";
import "dayjs/locale/en";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useTranslation } from "react-i18next";
function App() {
  const { i18n } = useTranslation();
  const { mutateAsync: initializeUser } = useLoadUser();
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);
  dayjs.extend(localizedFormat);
  useEffect(() => {
    dayjs.locale(i18n.language);
  }, [i18n.language]);
  useEffect(() => {
    async function initialize() {
      try {
        if (localStorage.getItem("accessToken")) {
          await initializeUser();
        }
      } finally {
        setLoading(false);
      }
    }

    initialize();
  }, []);

  if (loading) {
    return <CustomLoading />;
  }

  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          {renderRoutes(userRoutes)}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}
    </Routes>
  );

  return null;
}

export default App;
