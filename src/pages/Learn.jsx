import { useEffect, useState } from "react";
import { getLearnTopics, getLearnDetail } from "../api";
import BottomNav from "../components/BottomNav";

export default function Learn() {
  const [topics, setTopics] = useState([]);
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    getLearnTopics().then((res) => setTopics(res.data.topics));
  }, []);

  const open = (id) => {
    setSelected(id);
    getLearnDetail(id).then((res) => setDetail(res.data));
  };

  if (selected && detail) {
    return (
      <div>
        <div className="page">
          <button
            onClick={() => { setSelected(null); setDetail(null); }}
            style={{ background: "none", color: "#2c7a3f", fontWeight: 600, marginBottom: 16, fontSize: 14 }}
          >
            ← Back
          </button>
          <h1 style={{ color: "#1a4d29", fontSize: 24, marginBottom: 4 }}>{detail.title}</h1>
          <p style={{ color: "#6b7a6b", fontSize: 14, marginBottom: 20 }}>{detail.subtitle}</p>

          {detail.sections.map((s, i) => (
            <div key={i} className="card">
              <h3 style={{ color: "#2c7a3f", fontSize: 16, marginBottom: 10 }}>{s.heading}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-line", color: "#1a2b1a" }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div>
      <div className="page">
        <div className="header">
          <h1>📖 Learn</h1>
        </div>
        <p style={{ color: "#6b7a6b", fontSize: 14, marginBottom: 20 }}>
          Everything you need to know about cattle health and FMD.
        </p>

        {topics.map((t) => (
          <div
            key={t.id}
            className="card"
            onClick={() => open(t.id)}
            style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}
          >
            <div style={{
              width: 50, height: 50, borderRadius: 12, background: "#e8f5e9",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24
            }}>
              {t.id === "fmd" ? "🦠" : t.id === "care" ? "🐄" : "🛡️"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: "#1a4d29" }}>{t.title}</div>
            </div>
            <div style={{ color: "#2c7a3f", fontSize: 20 }}>→</div>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}