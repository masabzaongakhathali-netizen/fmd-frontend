import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await login({ username, password });
      setUser(res.data);
      nav("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #2c7a3f 0%, #1a4d29 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20
    }}>
      <div className="card" style={{ maxWidth: 400, width: "100%", padding: 32 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 56 }}>🐄</div>
          <h1 style={{ fontSize: 26, color: "#1a4d29", marginTop: 8 }}>FMD Detector</h1>
          <p style={{ color: "#6b7a6b", marginTop: 4, fontSize: 14 }}>
            Early detection for healthy cattle
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="label">Username</label>
          <input
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />

          <label className="label">Password</label>
          <input
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          {error && <div style={{ color: "#c0392b", fontSize: 14, marginBottom: 12 }}>{error}</div>}

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 20, color: "#6b7a6b", fontSize: 14 }}>
          Don't have an account? <Link to="/signup" style={{ color: "#2c7a3f", fontWeight: 600 }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}