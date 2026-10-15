import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
  const nav = useNavigate();
  const loc = useLocation();

  const items = [
    { path: "/", icon: "📷", label: "Scan" },
    { path: "/history", icon: "📋", label: "History" },
    { path: "/learn", icon: "📖", label: "Learn" },
    { path: "/assistant", icon: "💬", label: "Ask AI" },
  ];

  return (
    <div className="bottom-nav">
      {items.map((it) => (
        <button
          key={it.path}
          className={`nav-item ${loc.pathname === it.path ? "active" : ""}`}
          onClick={() => nav(it.path)}
        >
          <span className="icon">{it.icon}</span>
          {it.label}
        </button>
      ))}
    </div>
  );
}