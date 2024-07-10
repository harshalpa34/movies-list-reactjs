import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import HomePage from "./Pages/HomePage";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./lib/api";
import { useAuth } from "./context/AuthContext";
import WatchListPage from "./Pages/WatchListPage";
import SearchPage from "./Pages/SearchPage";
import Layout from "./routes/Layout";

function App() {
  const authCtx = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      authCtx.login(user);
    }
    setLoading(false);
  }, [authCtx.isAuthenticated]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/my-watchlist" element={<WatchListPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
