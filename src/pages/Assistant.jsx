import { useState, useRef, useEffect } from "react";
import { askAssistant } from "../api";
import BottomNav from "../components/BottomNav";

export default function Assistant() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "👋 Hello! I'm your cattle health assistant. Ask me anything about FMD, symptoms, care, or farm biosecurity.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const q = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", text: q }]);
    setLoading(true);
    try {
      const res = await askAssistant(q);
      setMessages((m) => [...m, { role: "bot", text: res.data.answer }]);
    } catch {
      setMessages((m) => [...m, { role: "bot", text: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const quick = [
    "My cow is drooling and has mouth sores",
    "How often should I vaccinate?",
    "Signs of Foot and Mouth Disease",
    "How do I prevent FMD?",
  ];

  return (
    <div>
      <div className="page" style={{ paddingBottom: 140 }}>
        <div className="header">
          <h1>💬 Ask the AI</h1>
        </div>

        <div style={{ marginBottom: 16 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex" }}>
              <div className={`chat-bubble ${m.role === "user" ? "chat-user" : "chat-bot"}`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="chat-bubble chat-bot">🐄 Thinking...</div>
          )}
          <div ref={bottomRef} />
        </div>

        {messages.length <= 1 && (
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 12, color: "#6b7a6b", marginBottom: 8 }}>Quick questions:</p>
            {quick.map((q) => (
              <button
                key={q}
                onClick={() => setInput(q)}
                style={{
                  background: "#fff", border: "1px solid #e0e6e0",
                  borderRadius: 20, padding: "8px 14px", fontSize: 12,
                  marginRight: 8, marginBottom: 8, color: "#1a4d29",
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{
        position: "fixed", bottom: 70, left: 0, right: 0,
        maxWidth: 500, margin: "0 auto", padding: 12, background: "#f5f7f5"
      }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            className="input-field"
            style={{ marginBottom: 0, flex: 1 }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask about cattle health..."
          />
          <button
            onClick={send}
            disabled={loading}
            style={{
              background: "#2c7a3f", color: "#fff", borderRadius: 12,
              padding: "0 20px", fontWeight: 700, fontSize: 16,
            }}
          >
            ➤
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}