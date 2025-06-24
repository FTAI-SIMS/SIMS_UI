import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UploadCenter from './pages/UploadCenter';
import ItemMaster from './pages/ItemMaster';
import GoodsReceipt from './pages/GoodsReceipt';
import InventoryData from './pages/InventoryData';
import Alerts from './pages/Alerts';
import AdminSettings from './pages/AdminSettings';
import AIChatPage from './pages/AIChatPage';
import React from 'react';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="upload" element={<UploadCenter />} />
        <Route path="items" element={<ItemMaster />} />
        <Route path="receipt" element={<GoodsReceipt />} />
        <Route path="inventory" element={<InventoryData />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="admin" element={<AdminSettings />} />
        <Route path="ai-chat" element={<AIChatPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
} 