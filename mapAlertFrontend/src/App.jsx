import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Principal from './pages/all/Principal';
import Register from './pages/all/Register';
import Login from './pages/all/Login';
import ProfileSettings from './pages/all/ProfileSettings';
import AdminDashboard from './pages/all/AdminDashboard';
import { useAuth } from './hooks/useAuth';

function ProtectedRoute({ children, adminOnly }) {
  const { isLoggedIn, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "sans-serif" }}>
        Cargando...
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user?.role !== "ADMIN" && user?.role !== "SUPER_ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
