import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { predict, logout } from "../api";
import BottomNav from "../components/BottomNav";

export default function Scan({ user, setUser }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();
  const nav = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError("");
  };

  const analyze = async () => {
    if (!image) return;
    setLoading(true);
    setError("");
    const fd = new FormData();
    fd.append("image", image);
    try {
      const res = await predict(fd);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    nav("/login");
  };

  const reset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError("");
  };

  return (
    <div>
      <div className="page">
        <div className="header">
          <h1>👋 Hi, {user?.username}</h1>
          <button
            onClick={handleLogout}
            style={{ background: "none", color: "#c0392b", fontSize: 13, fontWeight: 600 }}
          >
            Logout
          </button>
        </div>

        <div className="card" style={{ textAlign: "center", paddingTop: 24 }}>
          <h2 style={{ fontSize: 18, color: "#1a4d29", marginBottom: 4 }}>Scan your cow</h2>
          <p style={{ color: "#6b7a6b", fontSize: 13, marginBottom: 20 }}>
            Take a clear photo of the mouth, tongue, or hooves
          </p>

          {!preview ? (
            <button
              className="btn-primary"
              onClick={() => fileRef.current.click()}
              style={{ padding: 40, fontSize: 16 }}
            >
              📸 Choose Photo
            </button>
          ) : (
            <img
              src={preview}
              alt="preview"
              style={{ width: "100%", maxHeight: 320, objectFit: "cover", borderRadius: 14 }}
            />
          )}

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImage}
            style={{ display: "none" }}
          />

          {preview && !result && (
            <button className="btn-primary" style={{ marginTop: 16 }} onClick={analyze} disabled={loading}>
              {loading ? "🔬 Analysing..." : "🔍 Analyse"}
            </button>
          )}

          {error && (
            <div style={{ color: "#c0392b", fontSize: 14, marginTop: 14 }}>{error}</div>
          )}
        </div>

        {result && (
          <>
            <div className={`result-card ${result.result === "FMD" ? "danger" : "success"}`}>
              <h2>{result.result === "FMD" ? "⚠️ FMD Detected" : "✅ Healthy"}</h2>
              <div className="confidence">Confidence: {(result.confidence * 100).toFixed(1)}%</div>
              <div className="advice">{result.advice}</div>
            </div>

            {result.heatmap && (
              <div className="card">
                <h3 style={{ fontSize: 15, color: "#1a4d29", marginBottom: 4 }}>
                  🔍 What the AI looked at
                </h3>
                <p style={{ color: "#6b7a6b", fontSize: 12, marginBottom: 12 }}>
                  Red areas are what most influenced the diagnosis. If the model focused on the mouth or hooves, it saw real signs.
                </p>
                <img
                  src={`data:image/png;base64,${result.heatmap}`}
                  alt="heatmap"
                  style={{ width: "100%", borderRadius: 12 }}
                />
              </div>
            )}

            <button className="btn-secondary" onClick={reset}>
              Scan Another Cow
            </button>
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
}