import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { me } from "./api";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Scan from "./pages/Scan";
import History from "./pages/History";
import Learn from "./pages/Learn";
import Assistant from "./pages/Assistant";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    me()
      .then((res) => {
        if (res.data.authenticated) setUser(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        minHeight: "100vh", background: "#f5f7f5", fontSize: 18, color: "#2c7a3f"
      }}>
        🐄 Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup setUser={setUser} />} />
        <Route path="/" element={user ? <Scan user={user} setUser={setUser} /> : <Navigate to="/login" />} />
        <Route path="/history" element={user ? <History user={user} setUser={setUser} /> : <Navigate to="/login" />} />
        <Route path="/learn" element={user ? <Learn user={user} setUser={setUser} /> : <Navigate to="/login" />} />
        <Route path="/assistant" element={user ? <Assistant user={user} setUser={setUser} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;