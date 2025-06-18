import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UploadCenter from './pages/UploadCenter';
import ItemMaster from './pages/ItemMaster';
import GoodsReceipt from './pages/GoodsReceipt';
import Alerts from './pages/Alerts';
import AdminSettings from './pages/AdminSettings';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadCenter />} />
        <Route path="/items" element={<ItemMaster />} />
        <Route path="/receipt" element={<GoodsReceipt />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/admin" element={<AdminSettings />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App; 