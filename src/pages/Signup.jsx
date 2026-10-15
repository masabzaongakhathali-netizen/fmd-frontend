import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api";

export default function Signup({ setUser }) {
  const [form, setForm] = useState({ username: "", password: "", farm_name: "", district: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const update = (k, v) => setForm({ ...form, [k]: v });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register(form);
      const meRes = await (await import("../api")).me();
      setUser(meRes.data);
      nav("/");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #2c7a3f 0%, #1a4d29 100%)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20
    }}>
      <div className="card" style={{ maxWidth: 400, width: "100%", padding: 32 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 56 }}>🌾</div>
          <h1 style={{ fontSize: 24, color: "#1a4d29", marginTop: 8 }}>Create Account</h1>
          <p style={{ color: "#6b7a6b", marginTop: 4, fontSize: 14 }}>Join the fight against FMD</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="label">Username</label>
          <input className="input-field" value={form.username} onChange={(e) => update("username", e.target.value)} placeholder="Choose a username" required />

          <label className="label">Password</label>
          <input className="input-field" type="password" value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="At least 6 characters" required />

          <label className="label">Farm Name (optional)</label>
          <input className="input-field" value={form.farm_name} onChange={(e) => update("farm_name", e.target.value)} placeholder="e.g., Mbabane Dairy" />

          <label className="label">District (optional)</label>
          <input className="input-field" value={form.district} onChange={(e) => update("district", e.target.value)} placeholder="e.g., Hhohho" />

          {error && <div style={{ color: "#c0392b", fontSize: 14, marginBottom: 12 }}>{error}</div>}

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 20, color: "#6b7a6b", fontSize: 14 }}>
          Already have an account? <Link to="/login" style={{ color: "#2c7a3f", fontWeight: 600 }}>Login</Link>
        </p>
      </div>
    </div>
  );
}