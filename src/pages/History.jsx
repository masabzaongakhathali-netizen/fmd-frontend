import { useEffect, useState } from "react";
import { getHistory } from "../api";
import BottomNav from "../components/BottomNav";

export default function History() {
  const [preds, setPreds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHistory()
      .then((res) => setPreds(res.data.predictions))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page">
        <div className="header">
          <h1>📋 My Herd History</h1>
        </div>

        {loading && <div className="card" style={{ textAlign: "center" }}>Loading...</div>}

        {!loading && preds.length === 0 && (
          <div className="card" style={{ textAlign: "center", padding: 32 }}>
            <div style={{ fontSize: 48 }}>🐄</div>
            <p style={{ color: "#6b7a6b", marginTop: 12 }}>No scans yet. Go to Scan tab to get started.</p>
          </div>
        )}

        {preds.map((p) => (
          <div key={p.id} className="card" style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{
              width: 60, height: 60, borderRadius: 12, flexShrink: 0,
              background: p.result === "FMD" ? "#ffebee" : "#e8f5e9",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28
            }}>
              {p.result === "FMD" ? "⚠️" : "✅"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: p.result === "FMD" ? "#c0392b" : "#1a4d29" }}>
                {p.result}
              </div>
              <div style={{ fontSize: 12, color: "#6b7a6b", marginTop: 2 }}>
                {(p.confidence * 100).toFixed(1)}% confidence
              </div>
              <div style={{ fontSize: 11, color: "#95a595", marginTop: 2 }}>{p.created_at}</div>
            </div>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}