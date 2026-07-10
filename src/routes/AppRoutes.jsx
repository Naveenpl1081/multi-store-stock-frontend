import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../components/common/ProtectedRoute.jsx";
import { ROLES } from "../constants/roles.js";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/shop"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SHOPPER]}>
            <ShopperDashboardPage />
          </ProtectedRoute>
        }
      /> */}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;