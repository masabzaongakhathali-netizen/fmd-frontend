import { useState } from "react";
import axios from "axios";

const API_URL = "https://fmd-api-2026.onrender.com/api/predict/";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  };

  const analyze = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to analyze image");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🐄 FMD Detector</h1>
        <p style={styles.subtitle}>
          Upload a photo of your cow to check for Foot and Mouth Disease
        </p>

        <div style={styles.uploadBox}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            style={styles.input}
            id="file-input"
          />
          <label htmlFor="file-input" style={styles.uploadLabel}>
            📸 Choose Photo
          </label>
        </div>

        {preview && (
          <img src={preview} alt="Preview" style={styles.preview} />
        )}

        {preview && !result && (
          <button
            onClick={analyze}
            disabled={loading}
            style={loading ? styles.btnDisabled : styles.btnPrimary}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        )}

        {error && <div style={styles.error}>{error}</div>}

        {result && (
          <div
            style={
              result.result === "FMD"
                ? styles.resultDanger
                : styles.resultSuccess
            }
          >
            <h2 style={{ margin: 0 }}>
              {result.result === "FMD" ? "⚠️ FMD Detected" : "✅ Healthy"}
            </h2>
            <p style={{ margin: "8px 0" }}>
              Confidence: {(result.confidence * 100).toFixed(1)}%
            </p>
            <p style={{ margin: "8px 0" }}>{result.advice}</p>
          </div>
        )}

        {result && (
          <button onClick={reset} style={styles.btnSecondary}>
            Scan Another
          </button>
        )}

        <p style={styles.footer}>
          For early detection support only. Always consult a veterinarian.
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #2c7a3f 0%, #1a4d29 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    fontFamily: "system-ui, sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: 32,
    maxWidth: 480,
    width: "100%",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  title: { margin: 0, color: "#2c7a3f", fontSize: 28 },
  subtitle: { color: "#666", marginTop: 8, marginBottom: 24 },
  uploadBox: { marginBottom: 16 },
  input: { display: "none" },
  uploadLabel: {
    display: "inline-block",
    padding: "14px 28px",
    background: "#2c7a3f",
    color: "#fff",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 16,
  },
  preview: {
    width: "100%",
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 16,
  },
  btnPrimary: {
    width: "100%",
    padding: 14,
    background: "#2c7a3f",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
  },
  btnDisabled: {
    width: "100%",
    padding: 14,
    background: "#aaa",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 16,
    fontWeight: "bold",
    cursor: "not-allowed",
  },
  btnSecondary: {
    width: "100%",
    padding: 14,
    background: "#eee",
    color: "#333",
    border: "none",
    borderRadius: 10,
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 12,
  },
  resultSuccess: {
    background: "#e8f5e9",
    border: "2px solid #2c7a3f",
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    color: "#1a4d29",
  },
  resultDanger: {
    background: "#ffebee",
    border: "2px solid #c0392b",
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    color: "#7a1f15",
  },
  error: {
    background: "#ffebee",
    color: "#c0392b",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  footer: {
    color: "#999",
    fontSize: 12,
    marginTop: 24,
    marginBottom: 0,
  },
};

export default App;